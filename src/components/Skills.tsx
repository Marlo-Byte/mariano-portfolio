'use client'

import { motion } from 'framer-motion'
import { SkillType, SkillCategoryType } from '@/sanity/mockData'
import { IconRenderer } from './IconRenderer'

interface SkillsProps {
  skills: SkillType[]
  categories: SkillCategoryType[]
}

export function Skills({ skills, categories }: SkillsProps) {
  const gradientStyles = [
    { 
      color: 'from-blue-500 to-indigo-500', 
      glow: 'group-hover:border-blue-500/30 group-hover:shadow-blue-500/5',
      badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
    },
    { 
      color: 'from-purple-500 to-pink-500', 
      glow: 'group-hover:border-purple-500/30 group-hover:shadow-purple-500/5',
      badgeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20'
    },
    { 
      color: 'from-teal-500 to-emerald-500', 
      glow: 'group-hover:border-teal-500/30 group-hover:shadow-teal-500/5',
      badgeColor: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20'
    },
    { 
      color: 'from-amber-500 to-orange-500', 
      glow: 'group-hover:border-amber-500/30 group-hover:shadow-amber-500/5',
      badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
    },
    { 
      color: 'from-cyan-500 to-sky-500', 
      glow: 'group-hover:border-cyan-500/30 group-hover:shadow-cyan-500/5',
      badgeColor: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20'
    }
  ]

  // Group skills dynamically by category
  const skillGroups = categories.map((cat, idx) => {
    const list = skills.filter((s) => {
      if (!s.category) return false
      const catId = typeof s.category === 'string' ? s.category : s.category._id
      const catSlug = typeof s.category === 'string' ? s.category : s.category.slug?.current
      
      return catId === cat._id || catSlug === cat.slug?.current
    })

    const style = gradientStyles[idx % gradientStyles.length]

    return {
      _id: cat._id,
      title: cat.title,
      list,
      ...style
    }
  })

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
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 border-t transition-colors duration-300 relative">
      {/* Background glow in center */}
      <div className="absolute top-1/2 left-1/3 w-80 h-80 rounded-full bg-primary/5 blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Habilidades Técnicas
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-xl mx-auto text-sm sm:text-base">
            Las tecnologías, lenguajes y metodologías que utilizo para dar vida a los proyectos web.
          </p>
        </div>

        {/* Skill Category Bento Grids */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skillGroups.map((group, groupIdx) => (
            <motion.div
              key={groupIdx}
              variants={groupVariants}
              className={`lg:col-span-1 glass-effect rounded-[2rem] p-6 sm:p-7 border flex flex-col h-full group transition-all duration-300 hover:shadow-2xl ${group.glow}`}
            >
              
              {/* Category Header with dynamic count badge */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200/40 dark:border-slate-800/40">
                <div className="flex items-center gap-3">
                  <div className={`w-3.5 h-3.5 rounded-full bg-gradient-to-r ${group.color} shadow-sm shadow-black/10`} />
                  <h3 className="text-lg font-extrabold text-slate-800 dark:text-white">
                    {group.title}
                  </h3>
                </div>
                
                {/* Count Badge */}
                <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold border ${group.badgeColor}`}>
                  {group.list.length} {group.list.length === 1 ? 'Tec' : 'Tecs'}
                </span>
              </div>

              {/* Skills Grid List */}
              <div className="grid grid-cols-2 gap-3.5 flex-grow">
                {group.list.length > 0 ? (
                  group.list.map((skill) => (
                    <motion.div
                      key={skill._id}
                      whileHover={{ scale: 1.04, y: -2 }}
                      className="p-4 bg-slate-100/30 dark:bg-slate-800/20 hover:bg-white dark:hover:bg-slate-800/60 rounded-2xl border border-slate-200/30 dark:border-slate-800/30 hover:border-slate-200/80 dark:hover:border-slate-700/80 hover:shadow-md flex flex-col justify-center items-center text-center transition-all duration-300 group/item relative overflow-hidden"
                    >
                      {/* Glow card indicator */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-accent/5 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 -z-10" />

                      <IconRenderer
                        name={skill.icon}
                        className="text-slate-500 dark:text-slate-400 group-hover/item:text-primary transition-colors duration-300 mb-2.5"
                        size={24}
                      />
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300 tracking-wide">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))
                ) : (
                  <p className="col-span-2 text-center text-sm text-slate-400 dark:text-slate-500 italic py-6">
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
