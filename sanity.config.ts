import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from '@/sanity/schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  name: 'default',
  title: 'Mariano Portfolio Admin',

  projectId,
  dataset,

  basePath: '/studio',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Administración')
          .items([
            S.listItem()
              .title('Perfil de Usuario')
              .id('profile')
              .child(
                S.document()
                  .schemaType('profile')
                  .documentId('profile')
                  .title('Perfil de Usuario')
              ),
            S.divider(),
            S.documentTypeListItem('project').title('Proyectos'),
            S.documentTypeListItem('skill').title('Habilidades'),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    actions: (prev, context) => {
      const singletonTypes = new Set(['profile'])
      const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

      if (singletonTypes.has(context.schemaType)) {
        return prev.filter(({ action }) => action && singletonActions.has(action))
      }

      return prev
    },
  },
})
