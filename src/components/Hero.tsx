'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Mail } from 'lucide-react'
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

  return (
    <section id="home" className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
      {/* Glow Backdrops */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-72 md:w-96 h-72 md:h-96 rounded-full bg-primary/20 dark:bg-primary/10 blur-[90px] md:blur-[130px] animate-pulse duration-[9000ms]" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-72 md:w-96 h-72 md:h-96 rounded-full bg-accent/20 dark:bg-accent/10 blur-[90px] md:blur-[130px] animate-pulse duration-[7000ms]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Profile Intro */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6"
          >
            <span className="px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider text-primary bg-primary/10 dark:bg-primary/20 border border-primary/20 uppercase">
              Disponible para proyectos
            </span>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight">
              Hola, soy{' '}
              <span className="bg-gradient-to-r from-primary via-indigo-500 to-accent bg-clip-text text-transparent">
                {profile.name}
              </span>
            </h1>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-slate-700 dark:text-slate-200">
              {profile.role}
            </h2>

            <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
              {profile.bio}
            </p>

            {/* Social Icons inside Hero */}
            <div className="flex gap-4 pt-2 justify-center lg:justify-start">
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
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
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
            </div>
          </motion.div>

          {/* Right Side: Photo with rotating gradient border */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 flex justify-center items-center"
          >
            <div className="relative group w-64 h-64 sm:w-80 sm:h-80">
              
              {/* Pulsing Backlight Effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary to-accent opacity-30 dark:opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-300" />
              
              {/* Rotating Gradient Frame */}
              <div className="absolute inset-0 rounded-full p-[3px] bg-gradient-to-tr from-primary via-indigo-500 to-accent animate-spin duration-[12000ms]" />

              {/* Image Container */}
              <div className="absolute inset-[3px] rounded-full overflow-hidden bg-slate-100 dark:bg-slate-900 border-2 border-slate-50 dark:border-slate-950">
                {finalAvatarUrl && (
                  <Image
                    src={finalAvatarUrl}
                    alt={profile.name}
                    fill
                    sizes="(max-width: 768px) 256px, 320px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    priority
                    unoptimized={finalAvatarUrl.startsWith('http')}
                  />
                )}
              </div>
            </div>
          </motion.div>

        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
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
