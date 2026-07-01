'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Mail, Terminal } from 'lucide-react'
import Image from 'next/image'
import { urlFor } from '@/sanity/client'
import { ProfileType } from '@/sanity/mockData'
import { BackgroundBeamsWithCollision } from './ui/background-beams-with-collision'
import { TiltCard } from './ui/TiltCard'

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

function TypewriterSubtitle({ words }: { words?: string[] }) {
  const wordsToUse = useMemo(() => {
    return words && words.length > 0 ? words : [
      'Desarrollador Frontend Full-Stack',
      'Especialista en Next.js & React',
      'Creador de Experiencias Web Premium',
      'Apasionado por la Optimización y UX'
    ]
  }, [words])
  const [currentWordIdx, setCurrentWordIdx] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [typingSpeed, setTypingSpeed] = useState(100)

  useEffect(() => {
    let timer: NodeJS.Timeout
    const handleType = () => {
      const fullWord = wordsToUse[currentWordIdx]
      if (!isDeleting) {
        setCurrentText(fullWord.substring(0, currentText.length + 1))
        setTypingSpeed(80)

        if (currentText === fullWord) {
          timer = setTimeout(() => {
            setIsDeleting(true)
          }, 2000)
          return
        }
      } else {
        setCurrentText(fullWord.substring(0, currentText.length - 1))
        setTypingSpeed(40)

        if (currentText === '') {
          setIsDeleting(false)
          setCurrentWordIdx((prev) => (prev + 1) % wordsToUse.length)
          setTypingSpeed(250)
          return
        }
      }

      timer = setTimeout(handleType, typingSpeed)
    }

    timer = setTimeout(handleType, typingSpeed)
    return () => clearTimeout(timer)
  }, [currentText, isDeleting, currentWordIdx, typingSpeed, wordsToUse])

  return (
    <div className="flex items-center justify-center lg:justify-start min-h-[36px]">
      <span className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-200">
        {currentText}
      </span>
      <span className="w-[3px] h-6 sm:h-8 bg-primary ml-2 animate-pulse" />
    </div>
  )
}

export function Hero({ profile }: HeroProps) {
  let avatarUrl = ''
  if (profile.avatar) {
    try {
      avatarUrl = urlFor(profile.avatar).format('webp').quality(80).url() || ''
    } catch {
      avatarUrl = ''
    }
  }
  const finalAvatarUrl = avatarUrl || profile.avatarUrlFallback || ''

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
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

  const techBadges = [
    { name: 'Next.js 16', class: 'border-slate-500/20 bg-slate-500/5 text-slate-800 dark:text-slate-200 hover:border-slate-800 dark:hover:border-white' },
    { name: 'React 19', class: 'border-cyan-500/20 bg-cyan-500/5 text-cyan-600 dark:text-cyan-300 hover:border-cyan-500 hover:shadow-[0_0_8px_rgba(6,182,212,0.15)]' },
    { name: 'TypeScript', class: 'border-blue-500/20 bg-blue-500/5 text-blue-600 dark:text-blue-300 hover:border-blue-500 hover:shadow-[0_0_8px_rgba(59,130,246,0.15)]' },
    { name: 'Tailwind v4', class: 'border-teal-500/20 bg-teal-500/5 text-teal-600 dark:text-teal-300 hover:border-teal-500 hover:shadow-[0_0_8px_rgba(20,184,166,0.15)]' },
    { name: 'Sanity CMS', class: 'border-red-500/20 bg-red-500/5 text-red-600 dark:text-red-300 hover:border-red-500 hover:shadow-[0_0_8px_rgba(239,68,68,0.15)]' }
  ]

  return (
    <section id="home" className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
      <style>{`
        @keyframes shift-gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      
      {/* Background Neon Gradients & Grid Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full bg-primary/15 dark:bg-primary/5 blur-[100px] md:blur-[150px] animate-pulse duration-[8000ms]" />
        <div className="absolute bottom-1/4 right-1/3 translate-x-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-accent/15 dark:bg-accent/5 blur-[100px] md:blur-[150px] animate-pulse duration-[6000ms]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.04] dark:opacity-[0.06]" />
      </div>

      <BackgroundBeamsWithCollision className="w-full min-h-[100vh] h-auto bg-transparent dark:bg-transparent flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 z-10">
        <div className="relative z-20 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Side: Staggered Profile Intro */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 order-2 lg:order-1"
            >
              {/* Pulsing Badge */}
              <motion.a
                variants={itemVariants}
                href="#contact"
                whileHover={{ y: -2, scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-bold tracking-wider text-emerald-600 dark:text-emerald-300 bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 dark:border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.1)] hover:shadow-[0_0_20px_rgba(16,185,129,0.25)] hover:border-emerald-500/50 dark:hover:border-emerald-500/60 uppercase select-none transition-colors duration-300 cursor-pointer"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                </span>
                <span>{profile.availabilityStatus || 'Disponible para nuevos proyectos • ¡Hablemos! 🚀'}</span>
              </motion.a>

              {/* Heading Stagger */}
              <motion.h1 variants={itemVariants} className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-none text-slate-900 dark:text-white">
                Hola, soy{' '}
                <span 
                  className="bg-gradient-to-r from-primary via-indigo-500 via-purple-500 to-accent bg-clip-text text-transparent block sm:inline select-none"
                  style={{
                    backgroundSize: '200% auto',
                    animation: 'shift-gradient 6s linear infinite'
                  }}
                >
                  {profile.name}
                </span>
              </motion.h1>

              {/* Subheading with Typewriter & underline */}
              <motion.div variants={itemVariants} className="space-y-3 w-full">
                <TypewriterSubtitle words={profile.typewriterWords} />
                <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto lg:mx-0" />
              </motion.div>

              {/* Bio Description */}
              <motion.p variants={itemVariants} className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed font-medium">
                {profile.bio}
              </motion.p>

              {/* Micro Tech Tags */}
              <motion.div variants={itemVariants} className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {techBadges.map((badge) => (
                  <span
                    key={badge.name}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-sm transition-all duration-300 cursor-default select-none ${badge.class}`}
                  >
                    {badge.name}
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
                    className="p-3 rounded-xl glass-effect text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary border hover:border-primary/30 transition-all duration-300 hover:scale-110 active:scale-95 shadow-sm"
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
                    className="p-3 rounded-xl glass-effect text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary border hover:border-primary/30 transition-all duration-300 hover:scale-110 active:scale-95 shadow-sm"
                    aria-label="LinkedIn"
                  >
                    <LinkedinIcon className="w-5 h-5" />
                  </a>
                )}
                {profile.email && (
                  <a
                    href={`mailto:${profile.email}`}
                    className="p-3 rounded-xl glass-effect text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary border hover:border-primary/30 transition-all duration-300 hover:scale-110 active:scale-95 shadow-sm"
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
                  className="group relative px-8 py-3.5 rounded-xl text-white dark:text-slate-950 dark:group-hover:text-white font-medium bg-primary hover:bg-primary-hover shadow-lg hover:shadow-primary/30 transition-all duration-300 overflow-hidden cursor-pointer select-none"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500 to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                  Ver Proyectos
                </a>
                <a
                  href="#contact"
                  className="px-8 py-3.5 rounded-xl font-medium glass-effect text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border hover:border-primary/40 transition-all duration-300 cursor-pointer select-none"
                >
                  Hablemos
                </a>
              </motion.div>
            </motion.div>

            {/* Right Side: Floating Photo & Code Widget (Bento layout) */}
            <div className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2">
              <TiltCard
                useGlassStyles={false}
                maxTilt={12}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, type: 'spring', stiffness: 60 }}
                className="relative w-72 h-72 sm:w-96 sm:h-96 preserve-3d"
              >
                
                {/* Backlight Ambient Glow */}
                <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-primary/30 to-accent/30 opacity-40 blur-2xl animate-pulse duration-[5000ms]" />

                {/* Bento Box Photo Frame */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
                  className="relative w-full h-full rounded-[2rem] p-[2px] bg-gradient-to-tr from-primary/40 via-indigo-500/20 to-accent/40 shadow-2xl overflow-hidden transform-gpu translate-z-12"
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
                  className="absolute -bottom-6 -left-6 sm:-left-12 glass-effect p-4 sm:p-5 rounded-2xl border shadow-xl flex flex-col space-y-2 max-w-[240px] sm:max-w-[280px] transform-gpu translate-z-24 hover:shadow-primary/10 transition-shadow duration-300"
                >
                  <div className="flex items-center gap-1.5 pb-2 border-b border-slate-200/50 dark:border-slate-800/50">
                    <Terminal size={14} className="text-primary" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Mariano.ts</span>
                    <div className="flex gap-1 ml-auto">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse [animation-delay:0.4s]" />
                    </div>
                  </div>
                  
                  <code className="text-[10px] sm:text-xs font-mono text-slate-600 dark:text-slate-300 space-y-1 select-none">
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

              </TiltCard>
            </div>

          </div>

          {/* Scroll indicator */}
          {profile.discoverMoreEnabled !== false && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-20"
            >
              <style>{`
                @keyframes scroll-dot {
                  0% { opacity: 0; transform: translateY(0); }
                  20% { opacity: 1; }
                  80% { opacity: 0; transform: translateY(10px); }
                  100% { opacity: 0; transform: translateY(0); }
                }
                .animate-scroll-dot {
                  animation: scroll-dot 1.8s cubic-bezier(0.15, 0.41, 0.69, 0.94) infinite;
                }
              `}</style>
              <motion.a
                href="#about"
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="flex items-center gap-2 md:gap-3 px-3.5 py-1.5 md:px-5 md:py-2.5 rounded-full border border-slate-200/50 dark:border-slate-800/40 bg-white/40 dark:bg-slate-950/20 backdrop-blur-md hover:border-primary/40 dark:hover:border-primary/30 hover:bg-white/80 dark:hover:bg-slate-900/35 hover:shadow-[0_0_20px_rgba(99,102,241,0.12)] text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-semibold tracking-wide text-[10px] md:text-xs select-none transition-colors duration-300 cursor-pointer"
              >
                {/* Mouse simulator */}
                <div className="w-4 h-6 md:w-5 md:h-8 rounded-full border border-slate-300 dark:border-slate-700 md:border-2 flex justify-center pt-1 md:pt-1.5 relative overflow-hidden">
                  <span className="w-0.5 h-1.5 md:w-1 md:h-2 rounded-full bg-primary animate-scroll-dot" />
                </div>
                <span>{profile.discoverMoreText || 'Descubrir más'}</span>
                <ArrowDown size={12} className="animate-bounce text-primary md:w-3.5 md:h-3.5" />
              </motion.a>
            </motion.div>
          )}

        </div>
      </BackgroundBeamsWithCollision>
    </section>
  )
}
