import os
import re
import hashlib
import json
import unicodedata
import requests
from datetime import datetime, timezone
from bs4 import BeautifulSoup
from tqdm import tqdm

# Load .env locally if python-dotenv is installed (optional)
try:
    from dotenv import load_dotenv
    load_dotenv()
except Exception:
    pass

# --- CONFIGURATION (use environment variables; do NOT commit tokens) ---
# Set these in your shell or a local .env (see .env.example)
PROJECT_ID = os.getenv("SANITY_PROJECT_ID", "")
DATASET = os.getenv("SANITY_DATASET", "production")
TOKEN = os.getenv("SANITY_AUTH_TOKEN", "")
API_VERSION = os.getenv("SANITY_API_VERSION", "v2021-06-07")

if not PROJECT_ID or not TOKEN:
    raise RuntimeError("SANITY_PROJECT_ID and SANITY_AUTH_TOKEN are required in the environment. Do not commit tokens; rotate compromised tokens immediately.")

HEADERS = {"Authorization": f"Bearer {TOKEN}"}
BASE_URL = f"https://{PROJECT_ID}.api.sanity.io/{API_VERSION}"

#--- FONCTIONS DE TRAITEMENT ---

def slugify(text):
    """Génère un slug compatible avec Astro"""
    text = text.lower().strip()
    return re.sub(r'\W+', '-', text).strip('-')

def normalize_text(value):
    if value is None:
        return ""
    value = str(value).strip().lower()
    value = unicodedata.normalize("NFD", value)
    return "".join(c for c in value if unicodedata.category(c) != "Mn")

def parse_minutes(text):
    if not text:
        return 0
    t = normalize_text(text).replace(",", ".")

    # Patterns avec heures/minutes explicites
    hours = 0.0
    minutes = 0.0
    match_hm = re.search(r'(\d+)\s*h\s*(\d{1,2})', t)
    if match_hm:
        hours = float(match_hm.group(1))
        minutes = float(match_hm.group(2))
        return int(round(hours * 60 + minutes))

    match_h = re.search(r'(\d+(?:\.\d+)?)\s*h', t)
    if match_h:
        hours = float(match_h.group(1))

    match_m = re.search(r'(\d+(?:\.\d+)?)\s*(?:min|mn|minutes?)', t)
    if match_m:
        minutes = float(match_m.group(1))

    if hours or minutes:
        return int(round(hours * 60 + minutes))

    # Fallback: prendre la valeur max dans un intervalle (ex: "10 à 15")
    nums = re.findall(r'\d+(?:\.\d+)?', t)
    if not nums:
        return 0
    values = [float(n) for n in nums]
    return int(round(max(values)))

def parse_servings(text):
    if not text:
        return None
    t = normalize_text(text)
    nums = re.findall(r'\d+(?:\.\d+)?', t)
    if not nums:
        return None
    values = [float(n) for n in nums]
    return int(round(max(values)))

def parse_tags_metadata(soup):
    """Retourne (category, tags, diet, season, equipment)."""
    cat_tag = soup.find(class_='categories')
    if not cat_tag:
        return "plat", [], [], [], []
    raw = cat_tag.get_text(strip=True)
    if not raw:
        return "plat", [], [], [], []
    tags = [t.strip() for t in raw.split(',') if t.strip()]
    normalized_tags = [normalize_text(t) for t in tags]

    def tag_matches(tag, key):
        if len(key) <= 3:
            return re.search(rf'\\b{re.escape(key)}\\b', tag) is not None
        return key in tag

    def any_tag(keys):
        return any(any(tag_matches(tag, k) for k in keys) for tag in normalized_tags)

    if any_tag(['dessert', 'gateau', 'gâteau', 'tarte', 'sucre', 'biscuit', 'cookie']):
        category = "dessert"
    elif any_tag(['boisson', 'cocktail', 'jus', 'smoothie', 'infusion', 'the']):
        category = "boisson"
    elif any_tag(['entree', 'entrée', 'apero', 'apéro', 'amuse', 'starter', 'salade', 'petit dej', 'petit dejeuner']):
        category = "entree"
    elif any_tag(['accompagnement', 'legumes et accompagnement', 'légumes et accompagnement', 'garniture', 'sauce', 'dip', 'tartinade', 'side']):
        category = "accompagnement"
    elif any_tag(['plat', 'plats principaux', 'plat principal', 'plats']):
        category = "plat"
    else:
        category = "plat"

    diet_map = {
        'vegetarien': 'vegetarien',
        'vegetarien(ne)': 'vegetarien',
        'vegetalien': 'vegan',
        'vegan': 'vegan',
        'vg': 'vegetarien',
        'pescetarien': 'pescetarien',
        'sans gluten': 'sans-gluten',
        'sans-gluten': 'sans-gluten',
        'sans lactose': 'sans-lactose',
        'sans lait': 'sans-lactose',
        'sans sucre': 'sans-sucre',
        'ig bas': 'ig-bas',
    }
    diet = []
    for tag, norm in zip(tags, normalized_tags):
        for key, value in diet_map.items():
            if key in norm:
                diet.append(value)
                break

    season = []
    for norm in normalized_tags:
        if 'printemps' in norm:
            season.append('printemps')
        elif 'ete' in norm or 'été' in norm:
            season.append('ete')
        elif 'automne' in norm:
            season.append('automne')
        elif 'hiver' in norm:
            season.append('hiver')

    equipment = []
    for norm in normalized_tags:
        if 'thermomix' in norm:
            equipment.append('Thermomix')

    # Dédoublonner tout en conservant l'ordre
    def uniq(values):
        seen = set()
        out = []
        for v in values:
            if v and v not in seen:
                seen.add(v)
                out.append(v)
        return out

    return category, uniq(tags), uniq(diet), uniq(season), uniq(equipment)

def parse_rating(soup):
    rating_tag = soup.find(class_='rating')
    if not rating_tag:
        return None
    if rating_tag.has_attr('value'):
        try:
            return max(0, min(5, float(rating_tag['value'])))
        except Exception:
            pass
    stars = rating_tag.get_text().count('★')
    if stars:
        return max(0, min(5, float(stars)))
    return None

def parse_source(soup):
    source_tag = soup.find(class_='source')
    if not source_tag:
        return None
    if source_tag.name == 'a' and source_tag.get('href'):
        return source_tag.get('href').strip()
    return source_tag.get_text(strip=True)

def parse_notes(soup):
    notes_box = soup.find(class_='notes')
    if not notes_box:
        return []
    paragraphs = [p.get_text(" ", strip=True) for p in notes_box.find_all('p')]
    if paragraphs:
        return [p for p in paragraphs if p]
    text = notes_box.get_text(separator="\n", strip=True)
    return [line for line in text.splitlines() if line.strip()]

def parse_ingredient_line(text):
    raw = text.strip()
    if not raw:
        return None
    fraction_map = {
        "½": "1/2",
        "¼": "1/4",
        "¾": "3/4",
    }
    unit_list = {
        "g", "gr", "gramme", "grammes", "kg",
        "ml", "cl", "l", "dl",
        "c", "cs", "c.s", "càs", "cas", "cuillere", "cuillères", "cuillère",
        "cc", "c.c", "cac", "càc",
        "tbsp", "tsp",
        "cup", "cups",
        "pincee", "pincée",
        "tranche", "tranches",
    }

    tokens = raw.split()
    quantity = ""
    unit = ""
    name = raw

    if tokens:
        qty_token = fraction_map.get(tokens[0], tokens[0])
        if re.match(r'^\d+([./]\d+)?$', qty_token) or re.match(r'^\d+\.\d+$', qty_token) or re.match(r'^\d+-\d+$', qty_token):
            quantity = qty_token
            if len(tokens) > 1:
                unit_token = normalize_text(tokens[1]).strip(".")
                if unit_token in unit_list:
                    unit = tokens[1]
                    name = " ".join(tokens[2:]).strip()
                else:
                    name = " ".join(tokens[1:]).strip()
            else:
                name = ""

    if not name:
        name = raw

    return {
        "name": name,
        "quantity": quantity,
        "unit": unit,
    }

def upload_image(img_path):
    """Télécharge l'image vers Sanity Assets"""
    if not os.path.exists(img_path): return None
    try:
        url = f"{BASE_URL}/assets/images/{DATASET}"
        with open(img_path, "rb") as f:
            res = requests.post(url, headers={"Authorization": f"Bearer {TOKEN}"}, data=f.read(), timeout=60)
            if res.status_code != 200:
                return None
            return res.json().get('document', {}).get('_id')
    except Exception:
        return None

def parse_recipe_to_sanity(html_path, img_dir):
    """Transforme le HTML en document Sanity éditable"""
    with open(html_path, 'rb') as f:
        soup = BeautifulSoup(f, 'lxml')

    title = soup.find(class_='fn').get_text(strip=True) if soup.find(class_='fn') else os.path.basename(html_path)
    category, tags, diet, season, equipment = parse_tags_metadata(soup)
    rating = parse_rating(soup)
    source = parse_source(soup)
    notes = parse_notes(soup)
    
    # ID DETERMINISTE : Empêche les doublons même si on relance le script
    file_id = hashlib.md5(os.path.basename(html_path).encode()).hexdigest()[:16]
    doc_id = f"recipe-{file_id}"

    # IMAGE : Liaison avec featuredImage attendue par EnhancedRecipeCard
    img_tag = soup.find('img', class_='photo')
    image_obj = None
    if img_tag and img_tag.get('src'):
        img_name = os.path.basename(img_tag['src'])
        asset_id = upload_image(os.path.join(img_dir, img_name))
        if asset_id:
            image_obj = {"_type": "image", "asset": {"_ref": asset_id, "_type": "reference"}}

    # INGRÉDIENTS : Structure requise pour ShoppingList.astro
    ingredients = []
    current_group = ""
    for i, li in enumerate(soup.find_all('li', class_='ingredient')):
        text = li.get_text(strip=True)
        # Gestion des groupes (ex: "Sauce")
        if 'section' in li.get('class', []):
            current_group = text.replace(':', '').strip()
            continue
        parsed = parse_ingredient_line(text)
        if not parsed:
            continue
        ingredients.append({
            "_key": f"ing-{i}-{hashlib.md5(text.encode()).hexdigest()[:6]}", # _key requis pour l'édition
            "name": parsed["name"],
            "quantity": parsed.get("quantity") or "",
            "unit": parsed.get("unit") or "",
            "group": current_group
        })

    # INSTRUCTIONS : Format Portable Text requis pour Sanity Studio et [slug].astro
    instructions = []
    instr_box = soup.find(class_='instructions')
    if instr_box:
        steps = [s.strip() for s in instr_box.get_text(separator="\n").split('\n') if s.strip()]
        for i, step_text in enumerate(steps):
            instructions.append({
                "_key": f"block-{i}",
                "_type": "block",
                "style": "normal",
                "children": [{"_key": f"span-{i}", "_type": "span", "text": step_text}]
            })

    tips = notes[:]
    if source:
        tips.append(f"Source: {source}")

    # DOCUMENT FINAL : Mappe les champs exacts utilisés dans vos composants
    return {
        "_type": "recipe",
        "_id": doc_id,
        "title": title,
        "slug": {"_type": "slug", "current": slugify(title)},
        "category": category,
        "tags": tags,
        "diet": diet,
        "season": season,
        "equipment": equipment,
        "rating": rating,
        "prepTime": parse_minutes(soup.find(class_='prepTime').get_text()) if soup.find(class_='prepTime') else 0,
        "cookTime": parse_minutes(soup.find(class_='cookTime').get_text()) if soup.find(class_='cookTime') else 0,
        "servings": parse_servings(soup.find(class_='yield').get_text()) if soup.find(class_='yield') else 4,
        "ingredients": ingredients,
        "instructions": instructions,
        "tips": tips,
        "featuredImage": image_obj, # Liaison image Sanity
        "publishedAt": datetime.now(timezone.utc).isoformat(),
        "isPremium": False
    }

def run_import():
    HTML_FOLDER = "./recettes"
    IMAGE_FOLDER = "./images"
    
    files = [f for f in os.listdir(HTML_FOLDER) if f.endswith(".html")]
    print(f"🚀 Importation/Mise à jour de {len(files)} recettes...")

    for filename in tqdm(files):
        path = os.path.join(HTML_FOLDER, filename)
        try:
            doc = parse_recipe_to_sanity(path, IMAGE_FOLDER)
            # createOrReplace : met à jour si l'ID existe, crée sinon
            payload = {"mutations": [{"createOrReplace": doc}]}
            res = requests.post(f"{BASE_URL}/data/mutate/{DATASET}", headers=HEADERS, data=json.dumps(payload))
            if res.status_code != 200:
                print(f"Erreur API sur {filename}: {res.text}")
        except Exception as e:
            print(f"Erreur locale sur {filename}: {e}")

if __name__ == "__main__":
    run_import()
