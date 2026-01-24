// Script pour créer des recettes test avec différents tags
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'gjz41m8i',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01'
})

// Recettes avec différents tags pour tester les filtres
const recipes = [
  {
    _id: 'test-recipe-2',
    _type: 'recipe',
    title: 'Soupe de légumes d\'automne',
    slug: { _type: 'slug', current: 'soupe-legumes-automne' },
    category: 'entree',
    description: 'Une soupe réconfortante aux saveurs d\'automne, parfaite pour les journées fraîches.',
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    difficulty: 'facile',
    ingredients: [
      { name: 'Carottes', quantity: '4', unit: 'pièces' },
      { name: 'Pommes de terre', quantity: '3', unit: 'pièces' },
      { name: 'Poireaux', quantity: '2', unit: 'pièces' },
      { name: 'Bouillon de légumes', quantity: '1', unit: 'litre' }
    ],
    instructions: [
      { _type: 'block', children: [{ _type: 'span', text: 'Éplucher et couper les légumes.' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Faire revenir les légumes dans une casserole.' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Ajouter le bouillon et cuire 30 minutes.' }] }
    ],
    tags: ['végétarien', 'thermomix', 'saison', 'automne'],
    isPremium: false,
    publishedAt: new Date().toISOString()
  },
  {
    _id: 'test-recipe-3',
    _type: 'recipe',
    title: 'Salade de quinoa aux légumes grillés',
    slug: { _type: 'slug', current: 'salade-quinoa-legumes' },
    category: 'plat',
    description: 'Un plat complet et équilibré, riche en protéines végétales.',
    prepTime: 20,
    cookTime: 15,
    servings: 4,
    difficulty: 'moyen',
    ingredients: [
      { name: 'Quinoa', quantity: '200', unit: 'g' },
      { name: 'Courgettes', quantity: '2', unit: 'pièces' },
      { name: 'Poivrons', quantity: '2', unit: 'pièces' },
      { name: 'Feta', quantity: '150', unit: 'g' }
    ],
    instructions: [
      { _type: 'block', children: [{ _type: 'span', text: 'Cuire le quinoa selon les instructions.' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Griller les légumes au four.' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Mélanger tous les ingrédients.' }] }
    ],
    tags: ['végétarien', 'rapide', 'saison', 'été'],
    isPremium: false,
    publishedAt: new Date().toISOString()
  },
  {
    _id: 'test-recipe-4',
    _type: 'recipe',
    title: 'Tarte aux pommes maison',
    slug: { _type: 'slug', current: 'tarte-pommes-maison' },
    category: 'dessert',
    description: 'Une tarte aux pommes traditionnelle, parfaite pour le goûter.',
    prepTime: 30,
    cookTime: 45,
    servings: 6,
    difficulty: 'moyen',
    ingredients: [
      { name: 'Pâte brisée', quantity: '1', unit: 'pièce' },
      { name: 'Pommes', quantity: '6', unit: 'pièces' },
      { name: 'Sucre', quantity: '100', unit: 'g' },
      { name: 'Cannelle', quantity: '1', unit: 'cuillère à café' }
    ],
    instructions: [
      { _type: 'block', children: [{ _type: 'span', text: 'Étaler la pâte dans un moule.' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Éplucher et couper les pommes.' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Disposer les pommes sur la pâte et saupoudrer de sucre.' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Cuire au four 45 minutes.' }] }
    ],
    tags: ['végétarien', 'traditionnel', 'saison', 'automne'],
    isPremium: false,
    publishedAt: new Date().toISOString()
  }
]

async function createTestRecipes() {
  for (const recipe of recipes) {
    try {
      await client.create(recipe)
      console.log('✅ Recette créée:', recipe.title)
    } catch (error) {
      console.log('❌ Erreur pour', recipe.title, ':', error.message)
    }
  }
}

createTestRecipes()