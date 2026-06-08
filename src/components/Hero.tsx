'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Mail, Terminal } from 'lucide-react'
import Image from 'next/image'
import { urlFor } from '@/sanity/client'
import { ProfileType } from '@/sanity/mockData'

interface HeroProps {
  profile: ProfileType
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

function LinkedinIcon({ className }: { className?: string }) {
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
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

export function Hero({ profile }: HeroProps) {
  // Resolve profile avatar image URL
  let avatarUrl = ''
  if (profile.avatar) {
    try {
      avatarUrl = urlFor(profile.avatar).url() || ''
    } catch {
      avatarUrl = ''
    }
  }
  const finalAvatarUrl = avatarUrl || profile.avatarUrlFallback || ''

  // Framer Motion staggered variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 100, damping: 15 },
    },
  }

  const stackBadges = ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind v4', 'Sanity CMS']

  return (
    <section id="home" className="relative min-h-[100vh] flex items-center justify-center overflow-hidden pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      
      {/* Background Neon Gradients & Grid Pattern */}
      <div className="absolute inset-0 z-0">
        {/* Glow Left (Primary color blur) */}
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full bg-primary/15 dark:bg-primary/5 blur-[100px] md:blur-[150px] animate-pulse duration-[8000ms]" />
        {/* Glow Right (Cyan accent blur) */}
        <div className="absolute bottom-1/4 right-1/3 translate-x-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-accent/15 dark:bg-accent/5 blur-[100px] md:blur-[150px] animate-pulse duration-[6000ms]" />
        {/* Sleek dotted/grid texture */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.04] dark:opacity-[0.06]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Side: Staggered Profile Intro */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 order-2 lg:order-1"
          >
            {/* Pulsing Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-wider text-primary dark:text-indigo-300 bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="w-2 h-2 rounded-full bg-emerald-500 absolute" />
              <span>Disponible para trabajar</span>
            </motion.div>

            {/* Heading Stagger */}
            <motion.h1 variants={itemVariants} className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-none text-slate-900 dark:text-white">
              Hola, soy{' '}
              <span className="bg-gradient-to-r from-primary via-indigo-500 to-accent bg-clip-text text-transparent block sm:inline">
                {profile.name}
              </span>
            </motion.h1>

            {/* Subheading with neon-accent bar */}
            <motion.div variants={itemVariants} className="space-y-1">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-200">
                {profile.role}
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto lg:mx-0" />
            </motion.div>

            {/* Bio Description */}
            <motion.p variants={itemVariants} className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
              {profile.bio}
            </motion.p>

            {/* Micro Tech Tags */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {stackBadges.map((badge) => (
                <span
                  key={badge}
                  className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 dark:bg-slate-800/40 text-slate-500 dark:text-slate-400 border border-slate-200/50 dark:border-slate-800/50"
                >
                  {badge}
                </span>
              ))}
            </motion.div>

            {/* Social Links Panel */}
            <motion.div variants={itemVariants} className="flex gap-3 pt-2 justify-center lg:justify-start">
              {profile.githubUrl && (
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl glass-effect text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary border hover:border-primary/30 transition-all duration-200"
                  aria-label="GitHub"
                >
                  <GithubIcon className="w-5 h-5" />
                </a>
              )}
              {profile.linkedinUrl && (
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl glass-effect text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary border hover:border-primary/30 transition-all duration-200"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </a>
              )}
              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="p-3 rounded-xl glass-effect text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary border hover:border-primary/30 transition-all duration-200"
                  aria-label="Email"
                >
                  <Mail size={20} />
                </a>
              )}
            </motion.div>

            {/* Call To Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
              <a
                href="#projects"
                className="px-8 py-3.5 rounded-xl text-white font-medium bg-primary hover:bg-primary-hover shadow-lg hover:shadow-primary/30 transition-all duration-200 neon-glow"
              >
                Ver Proyectos
              </a>
              <a
                href="#contact"
                className="px-8 py-3.5 rounded-xl font-medium glass-effect text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border transition-all duration-200"
              >
                Hablemos
              </a>
            </motion.div>
          </motion.div>

          {/* Right Side: Floating Photo & Code Widget (Bento layout) */}
          <div className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, type: 'spring', stiffness: 60 }}
              className="relative w-72 h-72 sm:w-96 sm:h-96"
            >
              
              {/* Backlight Ambient Glow */}
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-primary/30 to-accent/30 opacity-40 blur-2xl animate-pulse duration-[5000ms]" />

              {/* Bento Box Photo Frame */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
                className="relative w-full h-full rounded-[2rem] p-[2px] bg-gradient-to-tr from-primary/40 via-indigo-500/20 to-accent/40 shadow-2xl overflow-hidden"
              >
                <div className="absolute inset-[2px] rounded-[2rem] overflow-hidden bg-slate-50 dark:bg-slate-900 border border-slate-200/20 dark:border-slate-800/40">
                  {finalAvatarUrl && (
                    <Image
                      src={finalAvatarUrl}
                      alt={profile.name}
                      fill
                      sizes="(max-width: 768px) 288px, 384px"
                      className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-500"
                      priority
                      unoptimized={finalAvatarUrl.startsWith('http')}
                    />
                  )}
                  {/* Subtle dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 to-transparent" />
                </div>
              </motion.div>

              {/* Overlaid Translucent IDE Code Snippet widget */}
              <motion.div
                initial={{ x: 30, y: 30, opacity: 0 }}
                animate={{ x: 0, y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4, type: 'spring' }}
                whileHover={{ scale: 1.05 }}
                className="absolute -bottom-6 -left-6 sm:-left-12 glass-effect p-4 sm:p-5 rounded-2xl border shadow-xl flex flex-col space-y-2 max-w-[240px] sm:max-w-[280px]"
              >
                <div className="flex items-center gap-1.5 pb-2 border-b border-slate-200/50 dark:border-slate-800/50">
                  <Terminal size={14} className="text-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Mariano.ts</span>
                  <div className="flex gap-1 ml-auto">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </div>
                </div>
                
                <code className="text-[10px] sm:text-xs font-mono text-slate-600 dark:text-slate-300 space-y-1">
                  <p className="text-purple-500 dark:text-indigo-400">
                    const <span className="text-blue-500 dark:text-cyan-400">dev</span> = &#123;
                  </p>
                  <p className="pl-3">
                    name: <span className="text-emerald-600 dark:text-emerald-400">&apos;{profile.name}&apos;</span>,
                  </p>
                  <p className="pl-3">
                    status: <span className="text-amber-500">&apos;{profile.role.split(' ')[0]}&apos;</span>,
                  </p>
                  <p className="pl-3">
                    code: <span className="text-rose-500">true</span>
                  </p>
                  <p className="text-purple-500 dark:text-indigo-400">&#125;</p>
                </code>
              </motion.div>

            </motion.div>
          </div>

        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:block"
        >
          <a
            href="#about"
            className="flex flex-col items-center gap-2 text-xs font-medium text-slate-400 dark:text-slate-500 hover:text-primary dark:hover:text-primary transition-colors duration-200"
          >
            <span>Descubrir más</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ArrowDown size={16} />
            </motion.div>
          </a>
        </motion.div>

      </div>
    </section>
  )
}
