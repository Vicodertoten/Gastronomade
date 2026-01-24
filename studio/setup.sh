#!/bin/bash

echo "🚀 Configuration de Sanity Studio pour Gastronomade"
echo ""

# Vérifier si les variables d'environnement sont configurées
if [ -z "$SANITY_PROJECT_ID" ]; then
    echo "❌ Veuillez configurer votre SANITY_PROJECT_ID dans .env.local"
    echo ""
    echo "Étapes à suivre :"
    echo "1. Allez sur https://sanity.io/manage"
    echo "2. Créez un nouveau projet"
    echo "3. Copiez le Project ID"
    echo "4. Remplissez .env.local"
    exit 1
fi

echo "✅ Configuration Sanity détectée"
echo "📦 Installation des dépendances..."

npm install

echo ""
echo "🎯 Sanity Studio est prêt !"
echo ""
echo "Pour démarrer :"
echo "  npm run dev"
echo ""
echo "Studio accessible sur : http://localhost:3333"
echo ""
echo "Variables configurées :"
echo "  Project ID: $SANITY_PROJECT_ID"
echo "  Dataset: ${SANITY_DATASET:-production}"