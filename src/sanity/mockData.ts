export interface ProfileType {
  _id: string
  name: string
  role: string
  logoTitle?: string
  logoCharacter?: string
  logoSubtitle?: string
  avatar?: { asset: { _ref: string } } // Sanity image
  avatarUrlFallback?: string // Local placeholder if Sanity image is missing
  bio: string
  aboutTitle?: string
  about: string
  resume?: { asset: { _ref: string } } // Sanity file
  resumeUrlFallback?: string // Local CV fallback link
  githubUrl?: string
  linkedinUrl?: string
  email: string
  stats?: Array<{ label: string; value: string }>
  highlights?: Array<{ title: string; description: string; icon: string }>
  location?: string
  timezone?: string
}

export interface ProjectType {
  _id: string
  title: string
  slug: { current: string }
  description: string
  tags: string[]
  codeUrl?: string
  demoUrl?: string
  image?: { asset: { _ref: string } } // Sanity image
  imageUrlFallback?: string // Local placeholder if Sanity image is missing
}

export interface SkillCategoryType {
  _id: string
  title: string
  slug: { current: string }
}

export interface SkillType {
  _id: string
  name: string
  category: string | SkillCategoryType | null
  icon: string
}

export interface EducationType {
  _id: string
  institution: string
  degree: string
  startDate: string
  endDate: string
  description?: string
  certificate?: { asset: { _ref: string } }
  certificateUrlFallback?: string
}

export const mockProjects: ProjectType[] = [
  {
    _id: 'mock-p1',
    title: 'E-Commerce Premium App',
    slug: { current: 'ecommerce-premium' },
    description: 'Plataforma de comercio electrónico de alto rendimiento con carrito de compras, pasarela de pagos integrada y panel de administración en tiempo real.',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Stripe'],
    codeUrl: 'https://github.com',
    demoUrl: 'https://demo.com',
    imageUrlFallback: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=600&auto=format&fit=crop',
  },
  {
    _id: 'mock-p2',
    title: 'SaaS Analytics Dashboard',
    slug: { current: 'saas-analytics' },
    description: 'Dashboard interactivo de analíticas financieras y de usuario para startups, con visualizaciones complejas de datos, filtros y exportación de reportes.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Recharts', 'Framer Motion'],
    codeUrl: 'https://github.com',
    demoUrl: 'https://demo.com',
    imageUrlFallback: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop',
  },
  {
    _id: 'mock-p3',
    title: 'Gestor de Tareas Colaborativo',
    slug: { current: 'task-manager' },
    description: 'Aplicación web para gestión de proyectos en equipo. Permite crear tableros Kanban, asignar tareas, chatear y programar fechas límites.',
    tags: ['Next.js', 'PostgreSQL', 'Prisma', 'Tailwind CSS', 'WebSockets'],
    codeUrl: 'https://github.com',
    demoUrl: 'https://demo.com',
    imageUrlFallback: 'https://images.unsplash.com/photo-1611224885990-ab7363d1f2a9?q=80&w=600&auto=format&fit=crop',
  },
]

export const mockSkillCategories: SkillCategoryType[] = [
  { _id: 'cat-frontend', title: 'Frontend', slug: { current: 'frontend' } },
  { _id: 'cat-backend', title: 'Backend & DB', slug: { current: 'backend' } },
  { _id: 'cat-tools', title: 'Herramientas & CMS', slug: { current: 'tools' } },
]

export const mockSkills: SkillType[] = [
  // Frontend
  { _id: 'mock-s1', name: 'React', category: 'cat-frontend', icon: 'devicon-react-original' },
  { _id: 'mock-s2', name: 'Next.js', category: 'cat-frontend', icon: 'devicon-nextjs-original' },
  { _id: 'mock-s3', name: 'TypeScript', category: 'cat-frontend', icon: 'devicon-typescript-original' },
  { _id: 'mock-s4', name: 'Tailwind CSS', category: 'cat-frontend', icon: 'devicon-tailwindcss-original' },
  // Backend
  { _id: 'mock-s5', name: 'Node.js', category: 'cat-backend', icon: 'devicon-nodejs-original' },
  { _id: 'mock-s6', name: 'PostgreSQL', category: 'cat-backend', icon: 'devicon-postgresql-original' },
  { _id: 'mock-s7', name: 'Express', category: 'cat-backend', icon: 'devicon-express-original' },
  // Tools
  { _id: 'mock-s8', name: 'Git & GitHub', category: 'cat-tools', icon: 'devicon-github-original' },
  { _id: 'mock-s9', name: 'Docker', category: 'cat-tools', icon: 'devicon-docker-original' },
  { _id: 'mock-s10', name: 'Sanity CMS', category: 'cat-tools', icon: 'devicon-sanity-original' },
]

export const mockProfile: ProfileType = {
  _id: 'mock-profile',
  name: 'Mariano',
  role: 'Desarrollador Frontend Full-Stack',
  logoTitle: 'Mariano',
  logoCharacter: 'M',
  logoSubtitle: 'dev.studio',
  avatarUrlFallback: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500&auto=format&fit=crop', // Professional male portrait
  bio: 'Desarrollador Frontend Full-Stack especializado en crear experiencias web excepcionales, rápidas y y escalables.',
  aboutTitle: 'Desarrollador enfocado en resolver problemas complejos de forma sencilla y eficiente.',
  about: 'Me apasiona la intersección entre el código limpio, el rendimiento técnico y la estética visual. Constantemente busco mejorar la experiencia de usuario y estructurar aplicaciones que sean fáciles de escalar y mantener.\n\nHe trabajado con startups y empresas de software en la construcción de productos desde cero. Mi enfoque se centra en utilizar herramientas modernas para potenciar las marcas en entornos digitales de alta competencia.',
  resumeUrlFallback: '#',
  githubUrl: 'https://github.com',
  linkedinUrl: 'https://linkedin.com',
  email: 'mariano@example.com',
  stats: [
    { label: 'Años de Experiencia', value: '3+' },
    { label: 'Proyectos Completados', value: '15+' },
    { label: 'Tecnologías Dominadas', value: '12+' },
  ],
  highlights: [
    {
      icon: 'faCode',
      title: 'Desarrollo Frontend',
      description: 'Creación de SPAs e interfaces del lado del cliente altamente interactivas con React y TypeScript.',
    },
    {
      icon: 'faRocket',
      title: 'Rendimiento y SEO',
      description: 'Optimización de carga e indexación SEO utilizando características avanzadas de Next.js (SSR, ISR).',
    },
    {
      icon: 'faWandMagicSparkles',
      title: 'Aesthetics & UI/UX',
      description: 'Pasión por los detalles visuales, el diseño responsive y animaciones pulidas pero no intrusivas.',
    },
  ],
  location: 'Buenos Aires, Argentina',
  timezone: 'UTC-3 (Horario local)',
}

export const mockEducation: EducationType[] = [
  {
    _id: 'mock-edu-1',
    institution: 'Universidad Tecnológica Nacional (UTN)',
    degree: 'Licenciatura en Sistemas de Información',
    startDate: '2021',
    endDate: 'Presente',
    description: 'Enfoque en arquitectura de software, gestión de bases de datos, algoritmos complejos y administración de redes. Participación activa en proyectos de desarrollo académico.'
  },
  {
    _id: 'mock-edu-2',
    institution: 'Desarrollo Web & Frontend Bootcamp',
    degree: 'Especialización Frontend (React/TypeScript/Next.js)',
    startDate: '2022',
    endDate: '2023',
    description: 'Programa intensivo cubriendo Next.js App Router, React 19, TypeScript, metodologías ágiles, y construcción de aplicaciones del lado del cliente altamente interactivas.',
    certificateUrlFallback: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  {
    _id: 'mock-edu-3',
    institution: 'Certificación Profesional Platzi / Coderhouse',
    degree: 'Diseño de Interfaces (UI/UX) y Animaciones Web',
    startDate: '2023',
    endDate: '2023',
    description: 'Curso de diseño UI/UX centrado en accesibilidad, micro-animaciones con Framer Motion, consistencia visual, layouts responsive y optimización UX.',
    certificateUrlFallback: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  }
]
