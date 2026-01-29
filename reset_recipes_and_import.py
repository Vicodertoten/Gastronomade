import json
import os
import subprocess
import sys
from typing import List

import requests

# --- CONFIGURATION ---
PROJECT_ID = "gjz41m8i"
DATASET = "production"
TOKEN = "skcJz0WGRUbi7a6MSloep6Onb9lk4AnM73aGjuG3TRAOBHM9mVVCvP68QZ5sZVfnNYY1TT9ZYJveyMygI76BvTe71jkHMyx7ISzTSyaOzYJjDKzofIeLekLm8Up0YJehJDbGDp6vYIzZpY3zxp2vT6feQQiCBxqUAriGykXVqYwYfhCRd16R"
API_VERSION = "v2021-06-07"

BASE_URL = f"https://{PROJECT_ID}.api.sanity.io/{API_VERSION}"
HEADERS = {"Authorization": f"Bearer {TOKEN}"}


def fetch_recipe_ids() -> List[str]:
    query = '*[_type == "recipe"]{_id}'
    res = requests.get(
        f"{BASE_URL}/data/query/{DATASET}",
        headers=HEADERS,
        params={"query": query},
        timeout=30,
    )
    res.raise_for_status()
    return [doc["_id"] for doc in res.json().get("result", [])]


def delete_recipes(ids: List[str]) -> None:
    if not ids:
        print("Aucune recette à supprimer.")
        return
    chunk_size = 100
    for i in range(0, len(ids), chunk_size):
        chunk = ids[i : i + chunk_size]
        payload = {"mutations": [{"delete": {"id": doc_id}} for doc_id in chunk]}
        res = requests.post(
            f"{BASE_URL}/data/mutate/{DATASET}",
            headers=HEADERS,
            data=json.dumps(payload),
            timeout=30,
        )
        res.raise_for_status()
    print(f"Supprimé {len(ids)} recettes.")


def run_import_script() -> None:
    script_path = os.path.join(os.path.dirname(__file__), "import os.py")
    if not os.path.exists(script_path):
        raise FileNotFoundError(f"Script introuvable: {script_path}")
    subprocess.check_call([sys.executable, script_path])


def main() -> None:
    ids = fetch_recipe_ids()
    delete_recipes(ids)
    run_import_script()


if __name__ == "__main__":
    main()
