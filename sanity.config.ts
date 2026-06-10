import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from '@/sanity/schemas'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

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
      structure: (S, context) =>
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
            orderableDocumentListDeskItem({
              type: 'education',
              title: 'Trayectoria Educativa (Arrastrar)',
              S,
              context,
            }),
            orderableDocumentListDeskItem({
              type: 'project',
              title: 'Proyectos (Arrastrar para ordenar)',
              S,
              context,
            }),
            orderableDocumentListDeskItem({
              type: 'skill',
              title: 'Habilidades (Arrastrar para ordenar)',
              S,
              context,
            }),
            orderableDocumentListDeskItem({
              type: 'skillCategory',
              title: 'Categorías de Habilidades (Arrastrar)',
              S,
              context,
            }),
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
