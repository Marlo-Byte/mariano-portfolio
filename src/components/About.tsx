'use client'

import { motion } from 'framer-motion'
import { Download, Sparkles, TrendingUp } from 'lucide-react'
import { ProfileType } from '@/sanity/mockData'
import { getFileUrl } from '@/sanity/client'
import { IconRenderer } from './IconRenderer'

interface AboutProps {
  profile: ProfileType
}

export function About({ profile }: AboutProps) {
  // Fallbacks
  const stats = profile.stats && profile.stats.length > 0 ? profile.stats : [
    { label: 'Años de Experiencia', value: '3+' },
    { label: 'Proyectos Completados', value: '15+' },
    { label: 'Tecnologías Dominadas', value: '12+' },
  ]

  const highlights = profile.highlights && profile.highlights.length > 0 ? profile.highlights : [
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
  ]

  // Resolve CV file url
  const cvUrl = getFileUrl(profile.resume) || profile.resumeUrlFallback || '#'

  // Framer Motion presets
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const bentoCardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 80, damping: 15 },
    },
  }

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 border-t transition-colors duration-300 relative">
      {/* Ambient background blur inside the section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-accent/5 blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Sobre Mí
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-xl mx-auto text-sm sm:text-base">
            Conoce mi trayectoria, valores profesionales y las métricas que definen mi trabajo.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6"
        >
          
          {/* Card 1: Main Biography & Description (Spans 8 columns) */}
          <motion.div
            variants={bentoCardVariants}
            className="lg:col-span-8 glass-effect rounded-[2rem] p-8 border flex flex-col justify-between relative overflow-hidden"
          >
            {/* Subtle background texture grid */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.03] -z-10" />

            <div className="space-y-6">
              <div className="flex items-center gap-2 text-primary">
                <Sparkles size={18} className="animate-spin duration-[4000ms]" />
                <span className="text-xs font-bold uppercase tracking-wider">Mi Filosofía</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-white leading-tight">
                {profile.aboutTitle || 'Desarrollador enfocado en resolver problemas complejos de forma sencilla y eficiente.'}
              </h3>
              
              <div className="text-slate-600 dark:text-slate-300 text-base leading-relaxed space-y-4 whitespace-pre-wrap">
                {profile.about}
              </div>
            </div>

            {/* Download CV button */}
            {cvUrl !== '#' && (
              <div className="pt-8 flex justify-start">
                <a
                  href={cvUrl}
                  download={`CV_${profile.name}.pdf`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold bg-gradient-to-r from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 dark:from-slate-800 dark:to-slate-800/80 dark:hover:from-slate-700 dark:hover:to-slate-700/80 text-slate-800 dark:text-slate-200 border border-slate-300/60 dark:border-slate-700/60 hover:border-slate-400 dark:hover:border-slate-600 transition-all duration-200 shadow-sm"
                >
                  <Download size={16} />
                  <span>Descargar Currículum</span>
                </a>
              </div>
            )}
          </motion.div>

          {/* Card 2: Quick Metrics Dashboard (Spans 4 columns) */}
          <motion.div
            variants={bentoCardVariants}
            className="lg:col-span-4 glass-effect rounded-[2rem] p-8 border flex flex-col justify-between relative overflow-hidden"
          >
            {/* Ambient light inside card */}
            <div className="absolute -top-12 -right-12 w-28 h-28 rounded-full bg-primary/10 dark:bg-primary/5 blur-2xl" />

            <div className="space-y-6 w-full">
              <div className="flex items-center gap-2 text-accent">
                <TrendingUp size={18} />
                <span className="text-xs font-bold uppercase tracking-wider">Métricas Clave</span>
              </div>
              
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                Logros en Números
              </h3>
            </div>

            {/* Vertical Stats list with progress representation */}
            <div className="space-y-6 py-4 w-full">
              {stats.map((stat, idx) => {
                const colors = ['bg-primary', 'bg-accent', 'bg-yellow-500']
                const barColor = colors[idx % colors.length]
                
                return (
                  <div key={idx} className="space-y-2 group">
                    <div className="flex justify-between items-end">
                      <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                        {stat.label}
                      </span>
                      <span className="text-2xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-200">
                        {stat.value}
                      </span>
                    </div>
                    {/* Simulated Gauge Line */}
                    <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '80%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 + idx * 0.1 }}
                        className={`h-full rounded-full ${barColor}`}
                      />
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="text-[10px] font-medium text-slate-400 dark:text-slate-500 italic mt-2 text-center lg:text-left">
              * Datos basados en proyectos de producción y desarrollo continuo.
            </div>
          </motion.div>

          {/* Cards 3, 4, 5: Highlights / Core Values (Each spans 4 columns) */}
          {highlights.map((item, idx) => {
            const glowColors = [
              'group-hover:border-primary/30 group-hover:shadow-primary/5',
              'group-hover:border-accent/30 group-hover:shadow-accent/5',
              'group-hover:border-yellow-500/30 group-hover:shadow-yellow-500/5',
            ]
            const glowClass = glowColors[idx % glowColors.length]

            const iconColors = [
              'text-primary bg-primary/10',
              'text-accent bg-accent/10',
              'text-yellow-500 bg-yellow-500/10',
            ]
            const iconClass = iconColors[idx % iconColors.length]

            return (
              <motion.div
                key={idx}
                variants={bentoCardVariants}
                whileHover={{ y: -5 }}
                className={`lg:col-span-4 glass-effect rounded-[2rem] p-7 border flex flex-col space-y-4 group transition-all duration-200 hover:shadow-xl ${glowClass}`}
              >
                {/* Icon Capsule */}
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:rotate-6 ${iconClass}`}>
                  <IconRenderer name={item.icon} size={22} />
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-extrabold text-slate-800 dark:text-slate-100 text-lg group-hover:text-primary transition-colors duration-200">
                    {item.title}
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            )
          })}

        </motion.div>

      </div>
    </section>
  )
}
