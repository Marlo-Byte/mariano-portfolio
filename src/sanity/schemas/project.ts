import { defineField, defineType } from 'sanity'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'

export const project = defineType({
  name: 'project',
  title: 'Proyecto',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Imagen',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción Corta',
      type: 'text',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'tags',
      title: 'Tecnologías / Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'codeUrl',
      title: 'URL Código (GitHub)',
      type: 'url',
    }),
    defineField({
      name: 'demoUrl',
      title: 'URL Demo En Vivo',
      type: 'url',
    }),
    orderRankField({ type: 'project' }),
    defineField({
      name: 'order',
      title: 'Orden (Manual Fallback)',
      type: 'number',
      initialValue: 0,
      description: 'Orden manual opcional si no se utiliza el drag-and-drop.',
    }),
  ],
})
