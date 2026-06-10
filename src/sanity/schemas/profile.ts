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
    // CONFIGURACIÓN DE IA (Asistente Chatbot)
    defineField({
      name: 'aiEnabled',
      title: 'Activar Chatbot de IA',
      description: 'Habilita o deshabilita el chat de IA flotante en el sitio web.',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'aiProvider',
      title: 'Proveedor de IA',
      description: 'Selecciona qué servicio de IA deseas utilizar para responder preguntas.',
      type: 'string',
      options: {
        list: [
          { title: 'Google Gemini (Recomendado)', value: 'gemini' },
          { title: 'Groq Cloud', value: 'groq' },
        ],
      },
      initialValue: 'gemini',
    }),
    defineField({
      name: 'aiApiKey',
      title: 'API Key de la IA',
      description: 'Introduce la clave de API para el proveedor seleccionado. Se ejecuta de forma segura en el servidor y nunca se expone al cliente.',
      type: 'string',
    }),
    defineField({
      name: 'aiPrompt',
      title: 'Instrucciones del Sistema (System Prompt)',
      description: 'Instrucciones de comportamiento para el asistente virtual de IA.',
      type: 'text',
      initialValue: 'Eres "ML-Assistant", el asistente virtual interactivo y agente de Inteligencia Artificial de Mariano Lopez. Tu único objetivo es guiar, informar y conversar de manera profesional con reclutadores, clientes y visitantes de su portafolio.\n\nREGLAS DE COMPORTAMIENTO:\n1. IDENTIDAD: Háblale al usuario presentándote como el asistente de Mariano. Refiérete a Mariano siempre en tercera persona (ej. "Mariano desarrolló...", "Él trabaja con...", "Puedes escribirle a...").\n2. TONO: Sé extremadamente profesional, servicial, amigable y entusiasta de la tecnología.\n3. BREVEDAD: Tus respuestas deben ser breves, estructuradas y fáciles de leer (máximo 2 párrafos cortos o listas de viñetas). Evita textos largos.\n4. CONTROL DE CONTEXTO: Responde ÚNICAMENTE utilizando los datos provistos en el contexto de Mariano (Proyectos, Habilidades, Estudios y Contacto). Si el usuario pregunta algo que no está especificado o te pide realizar tareas no relacionadas (como escribir código ajeno, resolver acertijos o hablar de temas fuera del portafolio), responde amablemente: "Como asistente virtual de Mariano Lopez, mi función es responder dudas sobre su perfil profesional, proyectos y experiencia. ¿Te gustaría saber más sobre sus proyectos o cómo contactarlo?".\n5. NO ALUCINES: Jamás inventes datos personales, enlaces de redes sociales, experiencias, tecnologías o proyectos. Si no se menciona en la información oficial, indica que no cuentas con ese dato.',
    }),
  ],
})
