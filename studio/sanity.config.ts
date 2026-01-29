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
            // Pages
            S.listItem()
              .title('Pages')
              .child(
                S.list()
                  .title('Pages du site')
                  .items([
                    S.listItem().title('Accueil — Gastronomade').child(S.document().schemaType('home').documentId('home')),
                    S.listItem().title('À propos — Cours & coaching').child(S.document().schemaType('about').documentId('about')),
                    S.listItem().title('Thermomix').child(S.document().schemaType('thermomix').documentId('thermomix')),
                    S.listItem().title('Contact').child(S.document().schemaType('contact').documentId('contact')),
                  ])
              ),

            // Offres & lieu
            S.listItem()
              .title('Offres & lieu')
              .child(
                S.list()
                  .title('Offres & lieu')
                  .items([
                    S.listItem().title('Privatisation du lieu').child(S.documentTypeList('location').title('Offres de privatisation')),
                    S.listItem().title('Restaurant éphémère').child(S.documentTypeList('restaurant').title('Soirées & menus')),
                    S.listItem()
                      .title('Agenda entreprises')
                      .child(S.document().schemaType('companyAgenda').documentId('companyAgenda')),
                  ])
              ),

            // Recettes
            S.listItem()
              .title('Recettes')
              .child(S.documentTypeList('recipe').title('Toutes les recettes')),

            // Boutique
            S.listItem()
              .title('Boutique')
              .child(S.documentTypeList('pack').title('Packs')),

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
