// schemas/thermomix.ts
export const thermomix = {
  name: 'thermomix',
  title: 'Espace Thermomix',
  type: 'document',
  fields: [
    {
      name: 'monthlyText',
      title: 'Texte du mois',
      type: 'text',
      description: 'Contenu mis à jour mensuellement pour la page Thermomix'
    },
    {
      name: 'videoUrl',
      title: 'Lien Vidéo (YouTube/Vimeo)',
      type: 'url',
      description: 'URL de la vidéo de démonstration'
    },
    {
      name: 'featuredImage',
      title: 'Image de couverture',
      type: 'image',
      options: {
        hotspot: true
      },
      description: 'Image principale pour la section Thermomix'
    },
    {
      name: 'demoRecipes',
      title: 'Recettes de démonstration',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Titre de la recette', type: 'string' },
          { name: 'description', title: 'Description courte', type: 'text' },
          { name: 'videoUrl', title: 'Vidéo de la recette', type: 'url' }
        ]
      }],
      description: 'Liste des recettes avec vidéos pour la grille'
    },
    {
      name: 'instagramUrl',
      title: 'Lien Instagram',
      type: 'url',
      description: 'URL du compte Instagram'
    }
  ]
}