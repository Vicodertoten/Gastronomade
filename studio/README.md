# Sanity Studio - Gastronomade

Studio d'administration pour gérer le contenu du site Gastronomade.

## Installation

1. Créer un projet Sanity :
   ```bash
   cd studio
   npm install
   npx sanity init
   ```

2. Configurer les variables d'environnement :
   Créer un fichier `.env.local` avec :
   ```
   SANITY_PROJECT_ID=votre-project-id
   SANITY_DATASET=production
   ```

## Démarrage

```bash
cd studio
npm run dev
```

Le studio sera accessible sur `http://localhost:3333`

## Schémas disponibles

### 🏠 Restaurant Éphémère
- **Titre de la soirée** : Nom de l'événement
- **Prochaines dates** : Sélection des dates (jeudis soir)
- **Prix par personne** : 50€ par défaut
- **Description du menu** : Détails du menu unique
- **Complet ?** : Statut des réservations
- **Minimum de personnes** : 4 par défaut
- **Acompte** : 25€ par personne

### 🤖 Thermomix
- **Texte du mois** : Contenu mis à jour régulièrement
- **Lien vidéo** : URL YouTube/Vimeo
- **Image de couverture** : Photo principale
- **Recettes de démonstration** : Liste avec vidéos

### 📍 Locations (La Zboum)
- **Type** : Société ou Privé
- **Prix HTVA** : 400€ par défaut
- **Points forts** : Liste des avantages
- **Capacité maximale** : Nombre de personnes
- **Image** : Photo de l'espace

### 👩‍🍳 Recettes
- **Informations de base** : Titre, catégorie, description
- **Temps et difficulté** : Préparation, cuisson, niveau
- **Ingrédients** : Liste avec quantités
- **Instructions** : Étapes détaillées
- **Tags** : Pour la recherche (végétarien, rapide, etc.)
- **Premium** : Contenu réservé (ebook)

## Utilisation pour Muriel

1. **Connexion** : Se connecter au studio avec ses identifiants
2. **Remplir les formulaires** : Cases simples à remplir
3. **Publier** : Bouton "Publier" pour mettre à jour le site
4. **Voir les changements** : Automatiquement visibles sur le site

## Sécurité

- Interface simplifiée : impossible de casser le design
- Validation automatique : champs obligatoires et formats
- Prévisualisation : voir avant publication
- Historique : possibilité de revenir en arrière

## Intégration avec Astro

Les données sont automatiquement récupérées par le site Astro via l'API Sanity.