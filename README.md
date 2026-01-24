# Gastronomade - Manger Vrai

Site web pour Muriel Cruysmans - Gastronomade / Manger Vrai à Wavre

## Structure du projet

```
/src
  /components    # Composants réutilisables (PricingCard.astro)
  /layouts       # Layout principal (MainLayout.astro)
  /pages         # Pages du site
    - index.astro      # Page d'accueil
    - thermomix.astro  # Page Thermomix
    - about.astro      # Cours & Coaching
    - recettes.astro   # Recettes
    - contact.astro    # Contact
  /styles        # Styles globaux (global.css)
  /types         # Types TypeScript (recipe.ts)
/public          # Images et assets statiques
```

## Stack technique

- **Framework**: Astro v5
- **Styling**: Tailwind CSS v4
- **Langage**: TypeScript
- **CMS futur**: Prêt pour Sanity

## Design System

### Palette de couleurs
- Beige crème: `--color-beige-creme`
- Vert forêt doux: `--color-vert-foret-doux`
- Bois clair: `--color-bois-clair`
- Naturel: `--color-naturel`

### Typographie
- Titres: Crimson Text (serif)
- Corps: Inter (sans-serif)

## Pages principales

### Accueil (index.astro)
- Section Gastronomade avec 3 priorités
- Location "La Zboum" 400€ HTVA
- Restaurant les jeudis soir (50€/pers)

### Thermomix (thermomix.astro)
- Présentation avec grille vidéo/texte
- Démos et recettes

### Cours & Coaching (about.astro)
- Bio de Muriel Cruysmans
- Services: Balade (125€), Conférence (250€), Ateliers (65€)

### Recettes (recettes.astro)
- Interface Recipe TypeScript préparée
- Grille de recettes (CMS-ready)

### Contact (contact.astro)
- Coordonnées complètes
- Formulaire prêt pour intégration

## Démarrage

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Déploiement

Prêt pour déploiement statique (Vercel, Netlify, etc.)

## Prochaines étapes

1. Connexion à Sanity CMS
2. Intégration des images
3. Formulaire de contact fonctionnel
4. Newsletter
5. Blog/Recettes dynamiques
