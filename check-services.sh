#!/bin/bash

echo "🧪 Vérification des services - Gastronomade"
echo "=========================================="
echo ""

# Vérifier Sanity Studio
echo "🔍 Vérification Sanity Studio..."
STUDIO_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3333 2>/dev/null)
if [ "$STUDIO_STATUS" = "200" ]; then
    echo "✅ Sanity Studio : http://localhost:3333 (OK)"
else
    echo "❌ Sanity Studio : Non accessible (Code: $STUDIO_STATUS)"
    echo "   Lancez : npm run studio"
fi

# Vérifier Site Astro
echo ""
echo "🔍 Vérification Site Astro..."
SITE_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:4322 2>/dev/null)
if [ "$SITE_STATUS" = "200" ]; then
    echo "✅ Site Astro : http://localhost:4322 (OK)"
else
    echo "❌ Site Astro : Non accessible (Code: $SITE_STATUS)"
    echo "   Lancez : npm run dev"
fi

echo ""
echo "🎯 Prochaines étapes :"
echo "1. Ouvrir http://localhost:3333 (Sanity Studio)"
echo "2. Créer du contenu de test (voir TEST_GUIDE.md)"
echo "3. Vérifier http://localhost:4322/index-cms"
echo ""
echo "📚 Documentation : TEST_GUIDE.md"