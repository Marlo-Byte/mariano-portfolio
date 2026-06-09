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

export interface SkillType {
  _id: string
  name: string
  category: 'frontend' | 'backend' | 'tools'
  icon: string // Lucide icon name
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

export const mockSkills: SkillType[] = [
  // Frontend
  { _id: 'mock-s1', name: 'React', category: 'frontend', icon: 'Code' },
  { _id: 'mock-s2', name: 'Next.js', category: 'frontend', icon: 'Layout' },
  { _id: 'mock-s3', name: 'TypeScript', category: 'frontend', icon: 'Code' },
  { _id: 'mock-s4', name: 'Tailwind CSS', category: 'frontend', icon: 'Layers' },
  // Backend
  { _id: 'mock-s5', name: 'Node.js', category: 'backend', icon: 'Cpu' },
  { _id: 'mock-s6', name: 'PostgreSQL', category: 'backend', icon: 'Database' },
  { _id: 'mock-s7', name: 'Express', category: 'backend', icon: 'Terminal' },
  // Tools
  { _id: 'mock-s8', name: 'Git & GitHub', category: 'tools', icon: 'GitBranch' },
  { _id: 'mock-s9', name: 'Docker', category: 'tools', icon: 'Box' },
  { _id: 'mock-s10', name: 'Sanity CMS', category: 'tools', icon: 'Settings' },
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
      icon: 'Code',
      title: 'Desarrollo Frontend',
      description: 'Creación de SPAs e interfaces del lado del cliente altamente interactivas con React y TypeScript.',
    },
    {
      icon: 'Rocket',
      title: 'Rendimiento y SEO',
      description: 'Optimización de carga e indexación SEO utilizando características avanzadas de Next.js (SSR, ISR).',
    },
    {
      icon: 'Sparkles',
      title: 'Aesthetics & UI/UX',
      description: 'Pasión por los detalles visuales, el diseño responsive y animaciones pulidas pero no intrusivas.',
    },
  ],
  location: 'Buenos Aires, Argentina',
  timezone: 'UTC-3 (Horario local)',
}
