// studio/sanity.config.ts
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { schemaTypes } from './schemas'
import { NewsletterTool } from './src/components/NewsletterTool'

export default defineConfig({
  name: 'gastronomade-studio',
  title: 'Gastronomade - Studio d\'administration',

  projectId: 'gjz41m8i',
  dataset: 'production',

  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Administration')
          .items([
            // Contenu principal
            S.listItem()
              .title('Contenu du site')
              .child(
                S.list()
                  .title('Contenu du site')
                  .items([
                    S.listItem().title('Accueil').child(S.document().schemaType('home').documentId('home')),
                    S.listItem().title('À propos').child(S.document().schemaType('about').documentId('about')),
                    S.listItem().title('Thermomix').child(S.document().schemaType('thermomix').documentId('thermomix')),
                    S.listItem().title('Contact').child(S.document().schemaType('contact').documentId('contact')),
                  ])
              ),

            // Recettes
            S.listItem()
              .title('Recettes')
              .child(S.documentTypeList('recipe').title('Toutes les recettes')),

            // Locations
            S.listItem()
              .title('Locations')
              .child(S.documentTypeList('location').title('Toutes les locations')),

            // Restaurant
            S.listItem()
              .title('Restaurant')
              .child(S.documentTypeList('restaurant').title('Événements restaurant')),

            // Newsletter Tool
            S.listItem()
              .title('Newsletter')
              .icon(() => '📧')
              .child(S.component(NewsletterTool).title('Gestion des abonnés')),
          ]),
    })
  ],

  schema: {
    types: schemaTypes,
  },

  // Configuration pour éviter les problèmes de permissions
  auth: {
    redirectOnSingle: false,
    providers: []
  }
})