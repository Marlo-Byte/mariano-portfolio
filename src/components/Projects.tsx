'use client'

import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import Image from 'next/image'
import { urlFor } from '@/sanity/client'
import { ProjectType } from '@/sanity/mockData'

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

interface ProjectsProps {
  projects: ProjectType[]
}

export function Projects({ projects }: ProjectsProps) {
  // Framer Motion container options
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
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
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 border-t transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Proyectos Destacados
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-xl mx-auto">
            Una selección de aplicaciones web recientes que demuestran mi experiencia técnica y enfoque en la calidad.
          </p>
        </div>

        {/* Projects grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => {
            // Check if Sanity image exists, build URL
            let imgUrl = ''
            if (project.image) {
              try {
                imgUrl = urlFor(project.image).url() || ''
              } catch {
                imgUrl = ''
              }
            }
            // Fallback to local mockup image if empty
            const finalImageUrl = imgUrl || project.imageUrlFallback || '/favicon.ico'

            return (
              <motion.article
                key={project._id}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                className="group relative flex flex-col h-full rounded-2xl glass-effect border overflow-hidden transition-all duration-200"
              >
                {/* Image block */}
                <div className="relative w-full h-48 sm:h-52 bg-slate-900 overflow-hidden">
                  <Image
                    src={finalImageUrl}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    unoptimized={finalImageUrl.startsWith('http')} // skip Unsplash optimization error in dev
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                </div>

                {/* Content block */}
                <div className="flex flex-col flex-grow p-6">
                  {/* Title & Tags */}
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-primary transition-colors duration-200 mb-2">
                    {project.title}
                  </h3>
                  
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6 flex-grow">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions footer */}
                  <div className="flex justify-between items-center pt-4 border-t border-slate-200/40 dark:border-slate-800/40">
                    {project.codeUrl ? (
                      <a
                        href={project.codeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-semibold text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary flex items-center gap-1.5 transition-colors duration-200"
                      >
                        <GithubIcon className="w-4 h-4" />
                        <span>Código</span>
                      </a>
                    ) : (
                      <span />
                    )}

                    {project.demoUrl ? (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-semibold text-primary hover:text-primary-hover flex items-center gap-1.5 transition-colors duration-200"
                      >
                        <span>Demo En Vivo</span>
                        <ExternalLink size={14} />
                      </a>
                    ) : (
                      <span />
                    )}
                  </div>
                </div>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
