'use client'

import { motion } from 'framer-motion'
import { GraduationCap, Calendar, BookOpen, Award, ExternalLink } from 'lucide-react'
import { EducationType } from '@/sanity/mockData'
import { getFileUrl } from '@/sanity/client'
import { TiltCard } from './ui/TiltCard'

interface EducationProps {
  education: EducationType[]
}

export function Education({ education }: EducationProps) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  } as const

  const cardLeftVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring' as const, stiffness: 60, damping: 14 },
    },
  } as const

  const cardRightVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring' as const, stiffness: 60, damping: 14 },
    },
  } as const

  const lineVariants = {
    hidden: { height: 0 },
    visible: {
      height: '100%',
      transition: { duration: 1.5, ease: 'easeInOut' as const },
    },
  } as const

  return (
    <section id="education" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-200/50 dark:border-slate-800/50 bg-indigo-50/20 dark:bg-transparent transition-colors duration-300 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-primary/5 blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 rounded-full bg-accent/5 blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Trayectoria Educativa
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          <p className="text-slate-600 dark:text-slate-400 mt-4 max-w-xl mx-auto text-sm sm:text-base">
            Mi formación académica, cursos de especialización y certificaciones profesionales.
          </p>
        </div>

        {/* Timeline Path Container */}
        <div className="relative mt-12">
          
          {/* Vertical Timeline Line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[3px]">
            {/* Background track */}
            <div className="absolute inset-0 bg-slate-200/50 dark:bg-slate-800/50 rounded-full" />
            {/* Glowing active track with scroll reveal */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={lineVariants}
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-primary via-indigo-500 to-accent rounded-full shadow-[0_0_12px_rgba(99,102,241,0.5)]"
            />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="space-y-12 md:space-y-16"
          >
            {education.map((item, idx) => {
              const isEven = idx % 2 === 0
              const certUrl = getFileUrl(item.certificate) || item.certificateUrlFallback
              
              return (
                <div 
                  key={item._id} 
                  className={`flex flex-col md:flex-row items-stretch w-full relative ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  
                  {/* Spacing Column (Desktop only) */}
                  <div className="hidden md:block w-1/2" />

                  {/* Icon Node on Line */}
                  <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-1.5 z-10 flex items-center justify-center w-8 h-8 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg text-primary dark:text-primary transition-transform duration-300 hover:scale-125 hover:shadow-primary/20">
                    <GraduationCap size={16} className="animate-pulse" />
                  </div>

                  {/* Card Block */}
                  <motion.div 
                    variants={isEven ? cardLeftVariants : cardRightVariants}
                    className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8 lg:px-12 flex"
                  >
                    <TiltCard className="w-full p-6 sm:p-7 group">
                      <div className="flex flex-col h-full justify-between">
                        <div>
                          {/* Timeline Badge */}
                          <div className="flex flex-wrap items-center gap-3 mb-4">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary dark:text-primary-hover border border-primary/20">
                              <Calendar size={12} />
                              {item.startDate} - {item.endDate}
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 border border-slate-200/50 dark:border-slate-800/40">
                              <BookOpen size={12} />
                              Estudio / Curso
                            </span>
                          </div>

                          {/* Title & Institution */}
                          <h3 className="text-lg sm:text-xl font-extrabold text-slate-800 dark:text-white mb-1.5 group-hover:text-primary transition-colors duration-300">
                            {item.degree}
                          </h3>
                          <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-4 tracking-wide">
                            {item.institution}
                          </p>

                          {/* Description */}
                          {item.description && (
                            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                              {item.description}
                            </p>
                          )}
                        </div>

                        {/* Certificate Button */}
                        {certUrl && (
                          <div className="mt-5 pt-4 border-t border-slate-100/50 dark:border-slate-800/20 flex">
                            <a
                              href={certUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-primary/10 to-accent/10 hover:from-primary/20 hover:to-accent/20 text-primary hover:text-primary border border-primary/20 dark:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-primary/5 active:scale-95 group/btn"
                            >
                              <Award size={14} className="text-primary group-hover/btn:scale-110 transition-transform duration-300" />
                              <span>Ver Certificado</span>
                              <ExternalLink size={12} className="opacity-60 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
                            </a>
                          </div>
                        )}
                      </div>
                    </TiltCard>
                  </motion.div>

                </div>
              )
            })}
          </motion.div>

        </div>

      </div>
    </section>
  )
}
