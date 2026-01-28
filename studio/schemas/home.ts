// studio/schemas/home.ts
export const home = {
  name: 'home',
  title: 'Page d\'accueil',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titre de la page',
      type: 'string',
      initialValue: 'Gastronomade - Manger Vrai | Muriel Cruysmans'
    },
    {
      name: 'heroTitle',
      title: 'Titre principal',
      type: 'string',
      initialValue: 'Gastronomade'
    },
    {
      name: 'heroSubtitle',
      title: 'Sous-titre principal',
      type: 'text',
      initialValue: 'Découvrez l\'art de manger vrai avec Muriel Cruysmans à Wavre'
    },
    {
      name: 'heroDescription',
      title: 'Description sous le sous-titre',
      type: 'text',
      initialValue: 'Un espace chaleureux et inspirant pour vos événements, cours de cuisine et moments gourmands'
    },
    {
      name: 'heroBackgroundImage',
      title: 'Image de fond du hero',
      type: 'image',
      options: { hotspot: true },
      description: 'Texte net sur les côtés et transparent au centre pour la première section.'
    },
    {
      name: 'locationSectionTitle',
      title: 'Titre section location',
      type: 'string',
      initialValue: 'Location de l\'Espace "La Zboum"'
    },
    {
      name: 'locationSectionDescription',
      title: 'Description section location',
      type: 'text',
      initialValue: 'Un cadre inspirant pour vos réunions d\'entreprise, événements privés et soirées gourmandes'
    },
    {
      name: 'restaurantSectionTitle',
      title: 'Titre section restaurant',
      type: 'string',
      initialValue: 'Prochaines soirées Gastronomade'
    },
    {
      name: 'restaurantSectionDescription',
      title: 'Description section restaurant',
      type: 'text',
      initialValue: 'Découvrez notre carte saisonnière et nos événements culinaires'
    },
    {
      name: 'ctaTitle',
      title: 'Titre section appel à l\'action',
      type: 'string',
      initialValue: 'Prêt à vivre une expérience gastronomique unique ?'
    },
    {
      name: 'ctaDescription',
      title: 'Description section appel à l\'action',
      type: 'text',
      initialValue: 'Contactez Muriel pour réserver votre espace ou découvrir ses services'
    },
    {
      name: 'ctaPrimaryButton',
      title: 'Texte bouton principal',
      type: 'string',
      initialValue: 'Me contacter'
    },
    {
      name: 'ctaSecondaryButton',
      title: 'Texte bouton secondaire',
      type: 'string',
      initialValue: 'En savoir plus'
    }
  ]
}
