import { CompanyAgendaCalendarInput } from '../src/components/CompanyAgendaCalendarInput'

export const companyAgenda = {
  name: 'companyAgenda',
  title: 'Agenda entreprises',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titre de l\'agenda',
      type: 'string',
      initialValue: 'Agenda des créneaux entreprises'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      initialValue:
        'Listez les créneaux disponibles pour les sociétés et actualisez les statuts directement depuis le studio.'
    },
    {
      name: 'calendarTitle',
      title: 'Titre du calendrier',
      type: 'string',
      initialValue: 'Disponibilités entreprises'
    },
    {
      name: 'startMonth',
      title: 'Mois de départ affiché',
      type: 'date',
      initialValue: '2026-02-01',
      description: 'Choisissez le mois qui apparaîtra en premier dans le calendrier.'
    },
    {
      name: 'monthsToShow',
      title: 'Nombre de mois visibles',
      type: 'number',
      initialValue: 2,
      description: 'Définissez combien de mois consécutifs doivent être affichés.'
    },
    {
      name: 'slots',
      title: 'Créneaux disponibles',
      type: 'array',
      components: {
        input: CompanyAgendaCalendarInput
      },
      of: [
        {
          type: 'object',
          name: 'slot',
          title: 'Créneau',
          fields: [
            {
              name: 'date',
              title: 'Date',
              type: 'date'
            },
            {
              name: 'startTime',
              title: 'Heure de début',
              type: 'string'
            },
            {
              name: 'endTime',
              title: 'Heure de fin',
              type: 'string'
            },
            {
              name: 'title',
              title: 'Titre du créneau',
              type: 'string'
            },
            {
              name: 'status',
              title: 'Statut',
              type: 'string',
              options: {
                list: [
                  { title: 'Disponible', value: 'Disponible' },
                  { title: 'Réservé', value: 'Réservé' },
                  { title: 'Sur demande', value: 'Sur demande' }
                ]
              }
            },
            {
              name: 'notes',
              title: 'Notes',
              type: 'text'
            }
          ]
        }
      ],
      description: 'Ajoutez autant de créneaux que nécessaire pour montrer vos disponibilités, puis ajustez les statuts et les heures.'
    }
  ]
}
