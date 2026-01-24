// Script pour créer une recette test
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'gjz41m8i',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01'
})

const testRecipe = {
  _id: 'test-recipe-1',
  _type: 'recipe',
  title: 'Salade d\'été aux herbes fraîches',
  slug: { _type: 'slug', current: 'salade-ete-aux-herbes' },
  category: 'entree',
  description: 'Une salade fraîche et légère, parfaite pour les journées ensoleillées d\'été. Préparée avec des herbes du jardin et des légumes de saison.',
  prepTime: 15,
  cookTime: 0,
  servings: 4,
  difficulty: 'facile',
  ingredients: [
    { name: 'Tomates cerises', quantity: '250', unit: 'g' },
    { name: 'Concombre', quantity: '1', unit: 'pièce' },
    { name: 'Feta', quantity: '150', unit: 'g' },
    { name: 'Herbes fraîches (basilic, persil, menthe)', quantity: '1', unit: 'botte' },
    { name: 'Huile d\'olive', quantity: '3', unit: 'cuillères à soupe' },
    { name: 'Vinaigre balsamique', quantity: '1', unit: 'cuillère à soupe' }
  ],
  instructions: [
    { _type: 'block', children: [{ _type: 'span', text: 'Laver et couper les légumes en morceaux.' }] },
    { _type: 'block', children: [{ _type: 'span', text: 'Hacher finement les herbes fraîches.' }] },
    { _type: 'block', children: [{ _type: 'span', text: 'Préparer la vinaigrette avec l\'huile d\'olive et le vinaigre.' }] },
    { _type: 'block', children: [{ _type: 'span', text: 'Mélanger tous les ingrédients et servir frais.' }] }
  ],
  tags: ['végétarien', 'rapide', 'saison', 'été'],
  isPremium: false,
  publishedAt: new Date().toISOString()
}

try {
  const result = await client.create(testRecipe)
  console.log('✅ Recette test créée:', result._id)
} catch (error) {
  console.error('❌ Erreur:', error.message)
}