'use client'

import { motion } from 'framer-motion'
import { SkillType } from '@/sanity/mockData'
import { IconRenderer } from './IconRenderer'

interface SkillsProps {
  skills: SkillType[]
}

export function Skills({ skills }: SkillsProps) {
  // Group skills by category
  const frontendSkills = skills.filter((s) => s.category === 'frontend')
  const backendSkills = skills.filter((s) => s.category === 'backend')
  const toolSkills = skills.filter((s) => s.category === 'tools')

  const skillGroups = [
    { title: 'Frontend', list: frontendSkills, color: 'from-blue-500 to-indigo-500' },
    { title: 'Backend & DB', list: backendSkills, color: 'from-purple-500 to-pink-500' },
    { title: 'Herramientas / Otros', list: toolSkills, color: 'from-teal-500 to-emerald-500' },
  ]

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const groupVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 70, damping: 15 },
    },
  }

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 border-t transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Habilidades Técnicas
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-xl mx-auto">
            Las tecnologías, lenguajes y metodologías que utilizo para dar vida a los proyectos web.
          </p>
        </div>

        {/* Skill grids grouped */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {skillGroups.map((group, groupIdx) => (
            <motion.div
              key={groupIdx}
              variants={groupVariants}
              className="glass-effect rounded-2xl p-6 border flex flex-col h-full"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200/40 dark:border-slate-800/40">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${group.color}`} />
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                  {group.title}
                </h3>
              </div>

              {/* Skills List */}
              <div className="grid grid-cols-2 gap-4 flex-grow">
                {group.list.length > 0 ? (
                  group.list.map((skill) => (
                    <motion.div
                      key={skill._id}
                      whileHover={{ scale: 1.03 }}
                      className="p-3 bg-slate-100/50 hover:bg-slate-100 dark:bg-slate-800/30 dark:hover:bg-slate-800/60 rounded-xl border border-transparent hover:border-slate-200/50 dark:hover:border-slate-700/50 flex flex-col justify-center items-center text-center transition-colors duration-200"
                    >
                      <IconRenderer
                        name={skill.icon}
                        className="text-slate-700 dark:text-slate-300 mb-2 group-hover:text-primary"
                        size={22}
                      />
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))
                ) : (
                  <p className="col-span-2 text-center text-sm text-slate-400 dark:text-slate-500 italic py-4">
                    Sin habilidades cargadas
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
