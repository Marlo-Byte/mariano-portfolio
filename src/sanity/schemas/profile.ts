import { defineField, defineType } from 'sanity'

export const profile = defineType({
  name: 'profile',
  title: 'Perfil de Usuario',
  type: 'document',
  groups: [
    { name: 'general', title: 'Información General', default: true },
    { name: 'hero', title: 'Sección Hero' },
    { name: 'about', title: 'Sección Sobre Mí' },
    { name: 'contact', title: 'Contacto y Redes' },
    { name: 'chatbot', title: 'Asistente de IA' },
  ],
  fields: [
    // --- Grupo: General ---
    defineField({
      name: 'name',
      title: 'Nombre Completo',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logoTitle',
      title: 'Título del Logo (Header)',
      type: 'string',
      description: 'Nombre o título principal que se muestra en el logo del encabezado. Si se deja vacío, se mostrará tu Nombre Completo.',
      initialValue: 'Mariano',
      group: 'general',
    }),
    defineField({
      name: 'logoCharacter',
      title: 'Monograma/Letra del Logo',
      type: 'string',
      description: 'Letra o inicial que se muestra dentro del logo (Header y Footer). Ejemplo: M. Si se deja vacío, se usará la primera letra de tu Nombre.',
      initialValue: 'M',
      group: 'general',
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: 'logoSubtitle',
      title: 'Subtítulo del Logo (Header)',
      type: 'string',
      description: 'Subtítulo que se muestra debajo de tu nombre en el encabezado. Ejemplo: dev.studio',
      initialValue: 'dev.studio',
      group: 'general',
    }),

    // --- Grupo: Hero ---
    defineField({
      name: 'role',
      title: 'Rol Profesional',
      type: 'string',
      description: 'Ejemplo: Desarrollador Frontend Full-Stack',
      group: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'avatar',
      title: 'Foto de Perfil (Avatar)',
      type: 'image',
      options: {
        hotspot: true,
      },
      group: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Biografía Corta (Hero)',
      description: 'Se muestra en la sección de inicio debajo de tu nombre.',
      type: 'text',
      group: 'hero',
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: 'typewriterWords',
      title: 'Frases del Subtítulo (Typewriter)',
      description: 'Carga frases cortas para el efecto de máquina de escribir en el Hero. Si se deja vacío, se mostrarán las frases predeterminadas.',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'hero',
    }),
    defineField({
      name: 'availabilityStatus',
      title: 'Texto de Disponibilidad (Hero Badge)',
      description: 'Texto descriptivo para la insignia de disponibilidad. Ejemplo: Disponible para nuevos proyectos • ¡Hablemos! 🚀',
      type: 'string',
      initialValue: 'Disponible para nuevos proyectos • ¡Hablemos! 🚀',
      group: 'hero',
    }),
    defineField({
      name: 'discoverMoreEnabled',
      title: 'Mostrar Indicador "Descubrir Más"',
      description: 'Habilita o deshabilita el indicador/botón de scroll al final del Hero.',
      type: 'boolean',
      initialValue: true,
      group: 'hero',
    }),
    defineField({
      name: 'discoverMoreText',
      title: 'Texto de "Descubrir Más"',
      description: 'Texto que se muestra al lado del simulador de mouse. Ejemplo: Descubrir más',
      type: 'string',
      initialValue: 'Descubrir más',
      group: 'hero',
    }),

    // --- Grupo: Sobre Mí ---
    defineField({
      name: 'aboutTitle',
      title: 'Título de la Sección Sobre Mí',
      description: 'Ejemplo: Desarrollador enfocado en resolver problemas complejos...',
      type: 'string',
      group: 'about',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'about',
      title: 'Biografía Detallada (Sobre Mí)',
      description: 'Se muestra en la sección "Sobre Mí". Puedes usar saltos de línea.',
      type: 'text',
      group: 'about',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'resume',
      title: 'Archivo de CV / Currículum',
      description: 'Sube tu CV en formato PDF',
      type: 'file',
      group: 'about',
    }),
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
      group: 'about',
      validation: (Rule) => Rule.max(3),
    }),
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
      group: 'about',
      validation: (Rule) => Rule.max(3),
    }),

    // --- Grupo: Contacto & Redes ---
    defineField({
      name: 'email',
      title: 'Correo de Contacto',
      type: 'string',
      group: 'contact',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'githubUrl',
      title: 'Enlace de GitHub',
      type: 'url',
      group: 'contact',
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'Enlace de LinkedIn',
      type: 'url',
      group: 'contact',
    }),
    defineField({
      name: 'location',
      title: 'Ubicación Física',
      description: 'Ejemplo: Buenos Aires, Argentina',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'timezone',
      title: 'Zona Horaria',
      description: 'Ejemplo: UTC-3 (Horario local)',
      type: 'string',
      group: 'contact',
    }),

    // --- Grupo: Asistente de IA ---
    defineField({
      name: 'aiEnabled',
      title: 'Activar Chatbot de IA',
      description: 'Habilita o deshabilita el chat de IA flotante en el sitio web.',
      type: 'boolean',
      initialValue: true,
      group: 'chatbot',
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
      group: 'chatbot',
    }),
    defineField({
      name: 'aiApiKey',
      title: 'API Key de la IA',
      description: 'Introduce la clave de API para el proveedor seleccionado. Se ejecuta de forma segura en el servidor y nunca se expone al cliente.',
      type: 'string',
      group: 'chatbot',
    }),
    defineField({
      name: 'aiPrompt',
      title: 'Instrucciones del Sistema (System Prompt)',
      description: 'Instrucciones de comportamiento para el asistente virtual de IA.',
      type: 'text',
      initialValue: 'Eres "ML-Assistant", el asistente virtual interactivo y agente de Inteligencia Artificial de Mariano Lopez. Tu único objetivo es guiar, informar y conversar de manera profesional con reclutadores, clientes y visitantes de su portafolio.\n\nREGLAS DE COMPORTAMIENTO:\n1. IDENTIDAD: Háblale al usuario presentándote como el asistente de Mariano. Refiérete a Mariano siempre en tercera persona (ej. "Mariano desarrolló...", "Él trabaja con...", "Puedes escribirle a...").\n2. TONO: Sé extremadamente profesional, servicial, amigable y entusiasta de la tecnología.\n3. BREVEDAD: Tus respuestas deben ser breves, estructuradas y fáciles de leer (máximo 2 párrafos cortos o listas de viñetas). Evita textos largos.\n4. CONTROL DE CONTEXTO: Responde ÚNICAMENTE utilizando los datos provistos en el contexto de Mariano (Proyectos, Habilidades, Estudios y Contacto). Si el usuario pregunta algo que no está especificado o te pide realizar tareas no relacionadas (como escribir código ajeno, resolver acertijos o hablar de temas fuera del portafolio), responde amablemente: "Como asistente virtual de Mariano Lopez, mi función es responder dudas sobre su perfil profesional, proyectos y experiencia. ¿Te gustaría saber más sobre sus proyectos o cómo contactarlo?".\n5. NO ALUCINES: Jamás inventes datos personales, enlaces de redes sociales, experiencias, tecnologías o proyectos. Si no se menciona en la información oficial, indica que no cuentas con ese dato.',
      group: 'chatbot',
    }),
  ],
})
