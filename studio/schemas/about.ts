// studio/schemas/about.ts
export const about = {
  name: 'about',
  title: 'À propos — Cours & coaching',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titre de la page',
      type: 'string',
      initialValue: 'Cours & Coaching - Muriel Cruysmans'
    },
    {
      name: 'heroTitle',
      title: 'Titre principal',
      type: 'string',
      initialValue: 'Cours & coaching personnalisés',
      description: 'Titre du hero.'
    },
    {
      name: 'heroSubtitle',
      title: 'Sous-titre principal',
      type: 'text',
      initialValue: 'Une cuisine saine, vivante et joyeuse, pour apprendre à cuisiner simplement et mieux manger au quotidien.',
      description: '2 phrases max.'
    },
    {
      name: 'aboutTitle',
      title: 'Titre section Muriel',
      type: 'string',
      initialValue: 'Muriel, cuisine & transmission'
    },
    {
      name: 'bio',
      title: 'Texte bio',
      type: 'text',
      initialValue: 'Passionnée de cuisine santé et de bien‑être, Muriel Cruysmans transmet une approche simple, sensible et généreuse de l’alimentation. Elle aime cuisiner en quantité, partager et donner envie de mieux manger, sans rigidité.',
      description: 'Paragraphe principal de la section Muriel.'
    },
    {
      name: 'photo',
      title: 'Photo de Muriel',
      type: 'image',
      options: {
        hotspot: true
      },
      description: 'Photo principale de Muriel Cruysmans pour la section À propos'
    },
    {
      name: 'achievements',
      title: 'Réalisations',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: [
        'Diplômée restaurateur-traiteur (mai 2024)',
        'Auteur d\'un livre de recettes',
        'Spécialiste en cuisine santé et bien-être'
      ]
    },
    {
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'title',
            title: 'Titre du service',
            type: 'string'
          },
          {
            name: 'description',
            title: 'Description',
            type: 'text'
          },
          {
            name: 'price',
            title: 'Prix',
            type: 'string'
          },
          {
            name: 'features',
            title: 'Caractéristiques',
            type: 'array',
            of: [{ type: 'string' }]
          }
        ]
      }],
      initialValue: [
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
      ]
    },
    {
      name: 'contactTitle',
      title: 'Vision (page About) — Titre',
      type: 'string',
      initialValue: 'Ma vision de la cuisine'
    },
    {
      name: 'contactText',
      title: 'Vision (page About) — Texte',
      type: 'text',
      initialValue: 'Je crois à une cuisine simple, locale et profondément humaine — une cuisine qui nourrit le corps, apaise l’esprit et crée du lien.',
      description: 'Court paragraphe de vision.'
    }
  ]
}
