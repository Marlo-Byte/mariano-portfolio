'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Download, Sparkles, TrendingUp, Clock, Sun, Moon, Music, Code2, Laptop } from 'lucide-react'
import { ProfileType } from '@/sanity/mockData'
import { getFileUrl } from '@/sanity/client'
import { IconRenderer } from './IconRenderer'
import { GlowCard } from './ui/GlowCard'

function TimezoneWidget({ location = 'Buenos Aires, AR' }: { location?: string }) {
  const [time, setTime] = useState('')
  const [isDay, setIsDay] = useState(true)

  useEffect(() => {
    const updateTime = () => {
      try {
        const date = new Date()
        const timeString = date.toLocaleTimeString('es-AR', {
          timeZone: 'America/Argentina/Buenos_Aires',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        })
        setTime(timeString)

        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: 'America/Argentina/Buenos_Aires',
          hour: 'numeric',
          hour12: false
        })
        const hour = parseInt(formatter.format(date), 10)
        setIsDay(hour >= 6 && hour < 18)
      } catch {
        const date = new Date()
        setTime(date.toLocaleTimeString())
        const hour = date.getHours()
        setIsDay(hour >= 6 && hour < 18)
      }
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const isBusinessHours = () => {
    try {
      const date = new Date()
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Argentina/Buenos_Aires',
        hour: 'numeric',
        hour12: false
      })
      const hour = parseInt(formatter.format(date), 10)
      return hour >= 9 && hour < 20
    } catch {
      const hour = new Date().getHours()
      return hour >= 9 && hour < 20
    }
  }

  return (
    <div className="flex flex-col justify-between h-full w-full space-y-4 text-left">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary">
          <Clock size={18} />
          <span className="text-xs font-bold uppercase tracking-wider">Zona Horaria</span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-500 dark:text-slate-400 border border-slate-200/50 dark:border-slate-700/50">
          {isDay ? <Sun size={10} className="text-amber-500 animate-spin" style={{ animationDuration: '12s' }} /> : <Moon size={10} className="text-indigo-400" />}
          <span>{isDay ? 'Día' : 'Noche'}</span>
        </div>
      </div>

      <div className="space-y-1">
        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Ubicación</span>
        <h4 className="text-sm font-extrabold text-slate-800 dark:text-white leading-none">{location}</h4>
        <div className="text-2xl sm:text-3xl font-black font-mono tracking-wider bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent py-0.5">
          {time || '--:--:--'}
        </div>
      </div>

      <div className="pt-2.5 border-t border-slate-200/30 dark:border-slate-800/20">
        {isBusinessHours() ? (
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Abierto a llamadas / ofertas</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400">Programando / Fuera de horario</span>
          </div>
        )}
      </div>
    </div>
  )
}

function ActivityWidget() {
  const [currentMode, setCurrentMode] = useState<'coding' | 'music'>('coding')

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMode(prev => prev === 'coding' ? 'music' : 'coding')
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col justify-between h-full w-full space-y-4 text-left">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-accent">
          {currentMode === 'coding' ? <Laptop size={18} /> : <Music size={18} />}
          <span className="text-xs font-bold uppercase tracking-wider">
            {currentMode === 'coding' ? 'Actividad Actual' : 'Escuchando Ahora'}
          </span>
        </div>
        {currentMode === 'music' && (
          <div className="flex items-end gap-0.5 h-3.5 pb-0.5">
            <span className="w-0.75 bg-accent rounded-full animate-eq-1" style={{ height: '30%' }} />
            <span className="w-0.75 bg-accent rounded-full animate-eq-2" style={{ height: '80%' }} />
            <span className="w-0.75 bg-accent rounded-full animate-eq-3" style={{ height: '50%' }} />
            <span className="w-0.75 bg-accent rounded-full animate-eq-4" style={{ height: '70%' }} />
          </div>
        )}
      </div>

      <div className="flex items-center gap-3.5 py-0.5">
        {currentMode === 'coding' ? (
          <>
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 dark:from-emerald-500/10 dark:to-teal-500/5 border border-emerald-500/20 flex items-center justify-center text-emerald-500 flex-shrink-0">
              <Code2 size={22} className="animate-pulse" />
            </div>
            <div className="min-w-0">
              <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Visual Studio Code</span>
              <h4 className="text-xs font-extrabold text-slate-800 dark:text-white truncate">Editando About.tsx</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">Proyecto: mariano-portfolio</p>
            </div>
          </>
        ) : (
          <>
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/10 dark:from-violet-500/10 dark:to-purple-500/5 border border-violet-500/20 flex items-center justify-center text-violet-500 flex-shrink-0 relative overflow-hidden group">
              <Music size={22} className="animate-bounce" />
            </div>
            <div className="min-w-0">
              <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Spotify Premium</span>
              <h4 className="text-xs font-extrabold text-slate-800 dark:text-white truncate">Starboy</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">Artista: The Weeknd</p>
            </div>
          </>
        )}
      </div>

      <div className="pt-2.5 border-t border-slate-200/30 dark:border-slate-800/20 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
        <span>{currentMode === 'coding' ? 'Foco: Productivo' : 'Reproductor Activo'}</span>
        <span className="font-semibold text-primary">{currentMode === 'coding' ? 'TypeScript' : 'R&B / Pop'}</span>
      </div>
    </div>
  )
}

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
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-200/50 dark:border-slate-800/50 bg-white/30 dark:bg-transparent transition-colors duration-300 relative">
      {/* Ambient background blur inside the section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-accent/5 blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Sobre Mí
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          <p className="text-slate-600 dark:text-slate-400 mt-4 max-w-xl mx-auto text-sm sm:text-base">
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
          <GlowCard
            variants={bentoCardVariants}
            className="lg:col-span-8"
            contentClassName="p-8 justify-between relative"
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
          </GlowCard>

          {/* Card 2: Quick Metrics Dashboard (Spans 4 columns) */}
          <GlowCard
            variants={bentoCardVariants}
            className="lg:col-span-4"
            contentClassName="p-8 justify-between relative"
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
          </GlowCard>

          {/* Cards 3, 4, 5: Highlights / Core Values (Each spans 4 columns) */}
          {highlights.map((item, idx) => {
            const iconColors = [
              'text-primary bg-primary/10',
              'text-accent bg-accent/10',
              'text-yellow-500 bg-yellow-500/10',
            ]
            const iconClass = iconColors[idx % iconColors.length]

            return (
              <GlowCard
                key={idx}
                variants={bentoCardVariants}
                whileHover={{ y: -5 }}
                className="lg:col-span-4 group"
                contentClassName="p-7 space-y-4"
              >
                {/* Icon Capsule */}
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:rotate-6 ${iconClass}`}>
                  <IconRenderer name={item.icon} size={22} />
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-extrabold text-slate-800 dark:text-slate-100 text-lg group-hover:text-primary transition-colors duration-200">
                    {item.title}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </GlowCard>
            )
          })}

          {/* Timezone Widget (col span: 6) */}
          <GlowCard
            variants={bentoCardVariants}
            className="lg:col-span-6 relative overflow-hidden"
            contentClassName="p-8 relative overflow-hidden"
          >
            {/* Ambient glows inside cards */}
            <div className="absolute -top-12 -right-12 w-28 h-28 rounded-full bg-primary/10 dark:bg-primary/5 blur-2xl" />
            <TimezoneWidget location={profile.location} />
          </GlowCard>

          {/* Activity/Music Widget (col span: 6) */}
          <GlowCard
            variants={bentoCardVariants}
            className="lg:col-span-6 relative overflow-hidden"
            contentClassName="p-8 relative overflow-hidden"
          >
            <div className="absolute -top-12 -right-12 w-28 h-28 rounded-full bg-accent/10 dark:bg-accent/5 blur-2xl" />
            <ActivityWidget />
          </GlowCard>

        </motion.div>

      </div>
    </section>
  )
}
