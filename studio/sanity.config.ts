// studio/sanity.config.ts
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'gastronomade-studio',
  title: 'Gastronomade - Studio d\'administration',

  projectId: 'gjz41m8i',
  dataset: 'production',

  plugins: [deskTool()],

  schema: {
    types: schemaTypes,
  },

  // Configuration pour éviter les problèmes de permissions
  auth: {
    redirectOnSingle: false,
    providers: []
  }
})