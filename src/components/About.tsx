'use client'

import { motion } from 'framer-motion'
import { Download } from 'lucide-react'
import { ProfileType } from '@/sanity/mockData'
import { getFileUrl } from '@/sanity/client'
import { IconRenderer } from './IconRenderer'

interface AboutProps {
  profile: ProfileType
}

export function About({ profile }: AboutProps) {
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

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 border-t transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Sobre Mí
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text and stats */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-200">
              {profile.aboutTitle || 'Desarrollador enfocado en resolver problemas complejos de forma sencilla y eficiente.'}
            </h3>
            
            {/* Dynamic Bio Paragraphs */}
            <div className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed space-y-4 whitespace-pre-wrap">
              {profile.about}
            </div>

            {/* Action CV Download Button */}
            {cvUrl !== '#' && (
              <div className="pt-2">
                <a
                  href={cvUrl}
                  download={`CV_${profile.name}.pdf`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-200"
                >
                  <Download size={18} />
                  <span>Descargar CV</span>
                </a>
              </div>
            )}

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {stats.map((stat, idx) => (
                <div key={idx} className="glass-effect rounded-xl p-4 text-center border">
                  <div className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights grid */}
          <div className="lg:col-span-5 space-y-4">
            {highlights.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="glass-effect p-6 rounded-2xl border flex gap-4 items-start"
              >
                <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl flex-shrink-0 text-primary">
                  <IconRenderer name={item.icon} size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-1 text-base sm:text-lg">
                    {item.title}
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
