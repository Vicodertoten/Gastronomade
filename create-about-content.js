#!/usr/bin/env node

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'gjz41m8i',
  dataset: 'production',
  useCdn: false
});

async function createAboutContent() {
  console.log('🍳 Création du contenu About...\n');

  const aboutData = {
    _type: 'about',
    title: 'Cours & Coaching - Gastronomade',
    heroTitle: 'Cours & Coaching',
    heroSubtitle: 'Apprenez l\'art de la cuisine santé avec Muriel Cruysmans',
    aboutTitle: 'À propos de Muriel',
    bio: 'Passionnée de cuisine santé et de bien-être, Muriel Cruysmans est une chef cuisinière diplômée qui met son expertise au service de votre alimentation.',
    achievements: [
      'Diplômée restaurateur-traiteur (mai 2024)',
      'Auteur d\'un livre de recettes',
      'Spécialiste en cuisine santé et bien-être'
    ],
    services: [
      {
        title: 'Cours de cuisine individuels',
        description: 'Apprenez les bases de la cuisine santé dans un cadre personnalisé',
        price: '80€/personne',
        features: [
          'Cours de 2h30 en petit groupe',
          'Ingrédients bio et locaux fournis',
          'Support de cours offert',
          'Diplôme de participation'
        ]
      },
      {
        title: 'Ateliers thématiques',
        description: 'Découvrez des thèmes spécifiques comme la cuisine végétarienne, les desserts healthy, etc.',
        price: '65€/personne',
        features: [
          'Ateliers de 2h en petit groupe',
          'Thèmes variés et saisonniers',
          'Recettes exclusives',
          'Goûter offert'
        ]
      },
      {
        title: 'Coaching personnalisé',
        description: 'Accompagnement sur mesure pour vos objectifs nutritionnels',
        price: 'Sur devis',
        features: [
          'Bilan nutritionnel initial',
          'Plan alimentaire personnalisé',
          'Suivi hebdomadaire',
          'Ajustements selon vos progrès'
        ]
      }
    ],
    contactTitle: 'Contactez Muriel',
    contactText: 'Prête à commencer votre voyage culinaire ? Contactez Muriel pour réserver votre cours ou atelier.'
  };

  try {
    const result = await client.create(aboutData);
    console.log('✅ Contenu About créé avec succès!');
    console.log('   ID:', result._id);
  } catch (error) {
    console.log('❌ Erreur lors de la création:', error.message);
  }
}

createAboutContent();