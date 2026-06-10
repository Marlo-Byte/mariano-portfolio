import { defineField, defineType } from 'sanity'

export const profile = defineType({
  name: 'profile',
  title: 'Perfil de Usuario',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre Completo',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Rol Profesional',
      type: 'string',
      description: 'Ejemplo: Desarrollador Frontend Full-Stack',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logoTitle',
      title: 'Título del Logo (Header)',
      type: 'string',
      description: 'Nombre o título principal que se muestra en el logo del encabezado. Si se deja vacío, se mostrará tu Nombre Completo.',
      initialValue: 'Mariano',
    }),
    defineField({
      name: 'logoCharacter',
      title: 'Monograma/Letra del Logo',
      type: 'string',
      description: 'Letra o inicial que se muestra dentro del logo (Header y Footer). Ejemplo: M. Si se deja vacío, se usará la primera letra de tu Nombre.',
      initialValue: 'M',
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: 'logoSubtitle',
      title: 'Subtítulo del Logo (Header)',
      type: 'string',
      description: 'Subtítulo que se muestra debajo de tu nombre en el encabezado. Ejemplo: dev.studio',
      initialValue: 'dev.studio',
    }),
    defineField({
      name: 'avatar',
      title: 'Foto de Perfil (Avatar)',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Biografía Corta (Hero)',
      description: 'Se muestra en la sección de inicio debajo de tu nombre.',
      type: 'text',
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: 'aboutTitle',
      title: 'Título de la Sección Sobre Mí',
      description: 'Ejemplo: Desarrollador enfocado en resolver problemas complejos...',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'about',
      title: 'Biografía Detallada (Sobre Mí)',
      description: 'Se muestra en la sección "Sobre Mí". Puedes usar saltos de línea.',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'resume',
      title: 'Archivo de CV / Currículum',
      description: 'Sube tu CV en formato PDF',
      type: 'file',
    }),
    defineField({
      name: 'githubUrl',
      title: 'Enlace de GitHub',
      type: 'url',
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'Enlace de LinkedIn',
      type: 'url',
    }),
    defineField({
      name: 'email',
      title: 'Correo de Contacto',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    
    // NEW: Stats Array (for About Section)
    defineField({
      name: 'stats',
      title: 'Estadísticas (Sección Sobre Mí)',
      description: 'Carga exactamente 3 estadísticas principales.',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Estadística',
          fields: [
            defineField({ name: 'label', title: 'Etiqueta (Ej. Años de Experiencia)', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'value', title: 'Valor (Ej. 3+)', type: 'string', validation: (Rule) => Rule.required() }),
          ]
        }
      ],
      validation: (Rule) => Rule.max(3),
    }),

    // NEW: Highlights Array (for About Section)
    defineField({
      name: 'highlights',
      title: 'Destacados / Valores (Sección Sobre Mí)',
      description: 'Carga hasta 3 puntos destacados o valores profesionales.',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Punto Destacado',
          fields: [
            defineField({ name: 'title', title: 'Título', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'description', title: 'Descripción', type: 'text', validation: (Rule) => Rule.required() }),
            defineField({
              name: 'icon',
              title: 'Icono Destacado (FontAwesome)',
              type: 'string',
              description: 'Elige un icono de la lista de FontAwesome para este destacado.',
              options: {
                list: [
                  { title: 'Código (faCode)', value: 'faCode' },
                  { title: 'Cohete / Lanzamiento (faRocket)', value: 'faRocket' },
                  { title: 'Brillo / Varita (faWandMagicSparkles)', value: 'faWandMagicSparkles' },
                  { title: 'Servidor / Backend (faServer)', value: 'faServer' },
                  { title: 'Corazón / Pasión (faHeart)', value: 'faHeart' },
                  { title: 'Escudo / Seguridad (faShieldHalved)', value: 'faShieldHalved' },
                  { title: 'Usuarios / Equipo (faUsers)', value: 'faUsers' },
                  { title: 'Fuego / Energía (faFire)', value: 'faFire' },
                  { title: 'Rayo / Velocidad (faBolt)', value: 'faBolt' },
                  { title: 'Gráfico / Tendencia (faChartLine)', value: 'faChartLine' },
                  { title: 'Planeta / Web (faGlobe)', value: 'faGlobe' },
                  { title: 'Bombilla / Ideas (faLightbulb)', value: 'faLightbulb' },
                  { title: 'Mensaje / Chat (faMessage)', value: 'faMessage' },
                  { title: 'Café (faCoffee)', value: 'faCoffee' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
          ]
        }
      ],
      validation: (Rule) => Rule.max(3),
    }),

    // NEW: Location & Timezone (for Contact Section)
    defineField({
      name: 'location',
      title: 'Ubicación Física',
      description: 'Ejemplo: Buenos Aires, Argentina',
      type: 'string',
    }),
    defineField({
      name: 'timezone',
      title: 'Zona Horaria',
      description: 'Ejemplo: UTC-3 (Horario local)',
      type: 'string',
    }),
  ],
})
