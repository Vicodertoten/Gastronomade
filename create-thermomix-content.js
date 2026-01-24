#!/usr/bin/env node

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'gjz41m8i',
  dataset: 'production',
  useCdn: false
});

async function createThermomixContent() {
  console.log('🍳 Création du contenu Thermomix...\n');

  const thermomixData = {
    _type: 'thermomix',
    monthlyText: 'Découvrez comment le Thermomix révolutionne votre cuisine quotidienne. Préparez des repas sains et savoureux en un temps record grâce à cette technologie innovante.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    demoRecipes: [
      {
        title: 'Soupe de légumes d\'hiver',
        description: 'Une soupe crémeuse et réconfortante parfaite pour les froides journées d\'hiver',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      }
    ]
  };

  try {
    const result = await client.create(thermomixData);
    console.log('✅ Contenu Thermomix créé avec succès!');
    console.log('   ID:', result._id);
  } catch (error) {
    console.log('❌ Erreur lors de la création:', error.message);
  }
}

createThermomixContent();