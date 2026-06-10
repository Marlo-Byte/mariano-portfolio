import { defineField, defineType } from 'sanity'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'

export const education = defineType({
  name: 'education',
  title: 'Educación',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    defineField({
      name: 'institution',
      title: 'Institución / Universidad',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'degree',
      title: 'Título / Especialidad / Curso',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'startDate',
      title: 'Año de Inicio',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'Año de Fin',
      type: 'string',
      description: 'Escribe el año o "Presente" si continúas cursando.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Detalles / Descripción',
      type: 'text',
      description: 'Describe tus logros, materias clave o proyectos realizados.',
    }),
    defineField({
      name: 'certificate',
      title: 'Certificado (PDF)',
      type: 'file',
      options: { accept: '.pdf' },
      description: 'Sube tu certificado en formato PDF (opcional).',
    }),
    orderRankField({ type: 'education' }),
  ],
  preview: {
    select: {
      title: 'degree',
      subtitle: 'institution',
    },
  },
})
