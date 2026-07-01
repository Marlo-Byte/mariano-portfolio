'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Terminal, Search, X, FolderOpen } from 'lucide-react'
import Image from 'next/image'
import { urlFor } from '@/sanity/client'
import { ProjectType } from '@/sanity/mockData'
import { GlowCard } from './ui/GlowCard'
import { cn } from '@/lib/utils'

interface ProjectsProps {
  projects: ProjectType[]
  githubUrl?: string
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

export function Projects({ projects, githubUrl }: ProjectsProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState('Todos')

  // Dynamic Tag Compiler
  const availableTags = useMemo(() => {
    const counts: { [key: string]: number } = {}
    projects.forEach(project => {
      project.tags?.forEach(tag => {
        counts[tag] = (counts[tag] || 0) + 1
      })
    })
    // Sort tags by frequency, then alphabetically
    const sortedTags = Object.keys(counts).sort((a, b) => {
      if (counts[b] !== counts[a]) {
        return counts[b] - counts[a]
      }
      return a.localeCompare(b)
    })
    return ['Todos', ...sortedTags.slice(0, 6)]
  }, [projects])

  // Filter projects by both Selected Tag and Search Query
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesTag = selectedTag === 'Todos' || project.tags?.includes(selectedTag)
      
      const query = searchQuery.trim().toLowerCase()
      if (!query) return matchesTag
      
      const matchesSearch = 
        project.title?.toLowerCase().includes(query) ||
        project.description?.toLowerCase().includes(query) ||
        project.tags?.some(tag => tag.toLowerCase().includes(query))
        
      return matchesTag && matchesSearch
    })
  }, [projects, selectedTag, searchQuery])

  // Framer Motion container options
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 80, damping: 15 },
    },
  }

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-200/50 dark:border-slate-800/50 transition-colors duration-300 relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[120px] -z-10 animate-pulse duration-[10000ms]" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Proyectos Destacados
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          <p className="text-slate-600 dark:text-slate-400 mt-4 max-w-xl mx-auto text-sm sm:text-base">
            Una selección de aplicaciones web recientes que demuestran mi experiencia técnica y enfoque en la calidad.
          </p>
        </div>

        {/* Filter and Search controls */}
        <div className="max-w-2xl mx-auto mb-12 flex flex-col items-center gap-6">
          {/* Search Input */}
          <div className="relative w-full max-w-md group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center">
              <Search className="absolute left-4 text-slate-400 dark:text-slate-500 w-4 h-4 pointer-events-none transition-colors group-focus-within:text-primary" />
              <input
                type="text"
                placeholder="Buscar por tecnología, título o descripción..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-10 py-3 rounded-full border border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-950/30 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-primary/30 transition-all text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 p-0.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
                  aria-label="Limpiar búsqueda"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Technology Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-xl">
            {availableTags.map((tag) => {
              const isSelected = selectedTag === tag
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className="relative px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 select-none overflow-hidden cursor-pointer"
                >
                  {isSelected && (
                    <motion.span
                      layoutId="activeTagBg"
                      className="absolute inset-0 bg-primary rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className={cn(
                    "relative z-10 transition-colors duration-300",
                    isSelected 
                      ? "text-white dark:text-slate-950" 
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  )}>
                    {tag}
                  </span>
                  {!isSelected && (
                    <span className="absolute inset-0 rounded-full border border-slate-200/60 dark:border-slate-800/60 bg-slate-100/50 dark:bg-slate-900/20 -z-10" />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div
          layout="position"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              // Check if Sanity image exists, build URL
              let imgUrl = ''
              if (project.image) {
                try {
                  imgUrl = urlFor(project.image).format('webp').quality(80).url() || ''
                } catch {
                  imgUrl = ''
                }
              }
              // Fallback to local mockup image if empty
              const finalImageUrl = imgUrl || project.imageUrlFallback || '/favicon.ico'

              return (
                <motion.div
                  layout
                  key={project._id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  className="h-full"
                >
                  <GlowCard
                    whileHover={{ y: -6 }}
                    className="group flex flex-col h-full"
                    contentClassName="relative overflow-hidden"
                  >
                    
                    {/* Image block with overlay badge & effects */}
                    <div className="relative w-full h-48 sm:h-56 bg-slate-950 overflow-hidden">
                      
                      {/* Grayscale to Color Image */}
                      <Image
                        src={finalImageUrl}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-center grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 opacity-90 group-hover:opacity-100"
                        unoptimized={finalImageUrl.startsWith('http')} // skip Unsplash optimization error in dev
                      />
                      
                      {/* Gradient shadow overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
                      
                      {/* Floating Bento Tag */}
                      <div className="absolute top-4 left-4 flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-950/80 backdrop-blur-md text-primary border border-primary/20">
                        <Terminal size={10} />
                        <span>Proyecto</span>
                      </div>
                    </div>

                    {/* Content block */}
                    <div className="flex flex-col flex-grow p-6 sm:p-7 justify-between">
                      <div className="space-y-3">
                        {/* Title */}
                        <h3 className="text-xl font-extrabold text-slate-800 dark:text-white group-hover:text-primary transition-colors duration-200">
                          {project.title}
                        </h3>
                        
                        {/* Description */}
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                          {project.description}
                        </p>

                        {/* Tech Badges */}
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 border border-slate-200/40 dark:border-slate-800/40"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Actions Footer */}
                      <div className="flex items-center gap-3 pt-6 mt-6 border-t border-slate-200/50 dark:border-slate-800/50">
                        {project.codeUrl && (
                          <a
                            href={project.codeUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex-1 py-2 px-3 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800/40 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800 flex items-center justify-center gap-1.5 transition-all duration-200"
                          >
                            <GithubIcon className="w-3.5 h-3.5" />
                            <span>Código</span>
                          </a>
                        )}

                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex-1 py-2 px-3 rounded-lg text-xs font-bold text-white dark:text-slate-950 dark:hover:text-white bg-primary hover:bg-primary-hover flex items-center justify-center gap-1.5 shadow-sm hover:shadow-primary/20 transition-all duration-200"
                          >
                            <span>Ver Demo</span>
                            <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                    </div>

                  </GlowCard>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        <AnimatePresence mode="wait">
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-md mx-auto text-center py-16 px-6 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 backdrop-blur-sm mt-8"
            >
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center mx-auto mb-4 text-slate-400 dark:text-slate-500">
                <FolderOpen size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
                No se encontraron proyectos
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                No pudimos encontrar ningún proyecto que coincida con &quot;{searchQuery}&quot; {selectedTag !== 'Todos' && `en la categoría ${selectedTag}`}.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedTag('Todos')
                }}
                className="inline-flex items-center justify-center px-4 py-2 rounded-xl text-xs font-bold text-white dark:text-slate-950 dark:hover:text-white bg-primary hover:bg-primary-hover shadow-sm hover:shadow-primary/20 transition-all duration-200 cursor-pointer"
              >
                Restablecer filtros
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Extra Bottom Call to Action */}
        {githubUrl && (
          <div className="text-center mt-16">
            <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-500">
              ¿Quieres ver más proyectos de código abierto? Visita mi perfil de{' '}
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline font-semibold"
              >
                GitHub
              </a>.
            </p>
          </div>
        )}

      </div>
    </section>
  )
}

