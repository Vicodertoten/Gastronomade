// studio/schemas/about.ts
export const about = {
  name: 'about',
  title: 'À propos',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titre de la page',
      type: 'string',
      initialValue: 'Cours & Coaching'
    },
    {
      name: 'heroTitle',
      title: 'Titre principal',
      type: 'string',
      initialValue: 'Cours & Coaching'
    },
    {
      name: 'heroSubtitle',
      title: 'Sous-titre principal',
      type: 'text',
      initialValue: 'Apprenez l\'art de la cuisine santé avec Muriel Cruysmans'
    },
    {
      name: 'aboutTitle',
      title: 'Titre section À propos',
      type: 'string',
      initialValue: 'À propos de Muriel'
    },
    {
      name: 'bio',
      title: 'Biographie',
      type: 'text',
      initialValue: 'Passionnée de cuisine santé et de bien-être, Muriel Cruysmans est une chef cuisinière diplômée qui met son expertise au service de votre alimentation.'
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
      title: 'Titre section contact',
      type: 'string',
      initialValue: 'Contactez Muriel'
    },
    {
      name: 'contactText',
      title: 'Texte de contact',
      type: 'text',
      initialValue: 'Prête à commencer votre voyage culinaire ? Contactez Muriel pour réserver votre cours ou atelier.'
    }
  ]
}