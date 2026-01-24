#!/usr/bin/env node

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'gjz41m8i',
  dataset: 'production',
  useCdn: false
});

async function checkContent() {
  console.log('🔍 Vérification du contenu Sanity...\n');

  try {
    const restaurant = await client.fetch('*[_type == "restaurant"]');
    const locations = await client.fetch('*[_type == "location"]');

    console.log('📊 État du contenu:');
    console.log(`🏠 Restaurant: ${restaurant.length} document(s)`);
    console.log(`📍 Locations: ${locations.length} document(s)`);

    if (restaurant.length > 0) {
      console.log('\n📝 Restaurant trouvé:');
      console.log(`   Titre: ${restaurant[0].title}`);
      console.log(`   Prix: ${restaurant[0].price}€`);
      console.log(`   Dates: ${restaurant[0].dates?.length || 0} date(s)`);
      console.log(`   Complet: ${restaurant[0].isFull ? 'Oui' : 'Non'}`);
    }

    if (locations.length > 0) {
      console.log('\n📍 Locations trouvées:');
      locations.forEach((loc, i) => {
        console.log(`   ${i + 1}. ${loc.title} (${loc.type}) - ${loc.price}`);
      });
    }

    if (restaurant.length === 0 && locations.length === 0) {
      console.log('\n⚠️  Aucun contenu trouvé!');
      console.log('   Créez du contenu dans Sanity Studio: http://localhost:3333');
    }

  } catch (error) {
    console.log('❌ Erreur de connexion Sanity:', error.message);
    console.log('   Vérifiez que Sanity Studio fonctionne: http://localhost:3333');
  }
}

checkContent();