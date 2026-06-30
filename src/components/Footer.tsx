'use client'

import { motion } from 'framer-motion'
import { ArrowUp, Mail, MapPin } from 'lucide-react'
import { ProfileType } from '@/sanity/mockData'

interface FooterProps {
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

export function Footer({ profile }: FooterProps) {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  // Framer Motion variants for subtle staggered entry
  const footerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 80,
        damping: 15,
        staggerChildren: 0.1,
      },
    },
  }

  const childVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 100, damping: 15 },
    },
  }

  return (
    <footer className="relative border-t border-slate-200/60 dark:border-slate-800/60 py-16 px-4 sm:px-6 lg:px-8 bg-slate-100/70 dark:bg-transparent backdrop-blur-sm overflow-hidden">
      
      {/* Aesthetic glowing background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[150px] rounded-full bg-primary/5 dark:bg-primary/2 blur-[80px] md:blur-[120px] -z-10 pointer-events-none" />
      
      <motion.div
        variants={footerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-start">
          
          {/* Brand & Monogram Column */}
          <motion.div variants={childVariants} className="md:col-span-5 flex flex-col space-y-4">
            <a href="#home" className="inline-flex items-center gap-3 group select-none">
              {/* Brackets Monogram Logo */}
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60 overflow-hidden transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-md group-hover:shadow-primary/10">
                {/* Dynamic colorful glowing background spot */}
                <div className="absolute -inset-1 bg-gradient-to-tr from-primary to-accent opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-300 blur-sm" />
                
                {/* Code bracket symbols enclosing the monogram */}
                <div className="flex items-center justify-center font-mono text-sm font-bold text-slate-400 group-hover:text-primary transition-colors duration-300">
                  <span className="text-[10px] text-primary select-none opacity-60 group-hover:opacity-100 group-hover:-translate-x-[1px] transition-all">&lt;</span>
                  <span className="px-[3px] text-slate-800 dark:text-white font-extrabold text-sm tracking-tighter">
                    {profile.logoCharacter || profile.name.charAt(0)}
                  </span>
                  <span className="text-[10px] text-accent select-none opacity-60 group-hover:opacity-100 group-hover:translate-x-[1px] transition-all">&gt;</span>
                </div>
              </div>
              
              {/* Title & Subtitle */}
              <div className="flex flex-col">
                <span className="text-sm font-black tracking-tight text-slate-900 dark:text-white group-hover:text-primary transition-colors duration-250 leading-none">
                  {profile.logoTitle || profile.name}
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mt-1 leading-none flex items-center gap-1 select-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{profile.logoSubtitle || 'dev.studio'}</span>
                </span>
              </div>
            </a>
            
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
              Especializado en diseñar y programar interfaces fluidas, rápidas y escalables. Apasionado por la interactividad, el rendimiento y la estética moderna.
            </p>
            
            {/* Social Icons Panel */}
            <div className="flex gap-2.5 pt-2">
              {profile.githubUrl && (
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl glass-effect text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-white border border-slate-200/50 dark:border-slate-800/40 hover:border-primary/20 dark:hover:border-primary/20 transition-all duration-200 hover:-translate-y-0.5"
                  aria-label="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              )}
              {profile.linkedinUrl && (
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl glass-effect text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-white border border-slate-200/50 dark:border-slate-800/40 hover:border-primary/20 dark:hover:border-primary/20 transition-all duration-200 hover:-translate-y-0.5"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              )}
              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="p-2.5 rounded-xl glass-effect text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-white border border-slate-200/50 dark:border-slate-800/40 hover:border-primary/20 dark:hover:border-primary/20 transition-all duration-200 hover:-translate-y-0.5"
                  aria-label="Email"
                >
                  <Mail size={16} />
                </a>
              )}
            </div>
          </motion.div>

          {/* Navigation Column */}
          <motion.div variants={childVariants} className="md:col-span-3 flex flex-col">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-white mb-4">Navegación</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Inicio', href: '#home' },
                { label: 'Sobre Mí', href: '#about' },
                { label: 'Educación', href: '#education' },
                { label: 'Proyectos', href: '#projects' },
                { label: 'Habilidades', href: '#skills' },
                { label: 'Contacto', href: '#contact' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-white transition-colors duration-205 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-800 group-hover:bg-primary dark:group-hover:bg-white transition-all duration-200" />
                    <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* CTA Column */}
          <motion.div variants={childVariants} className="md:col-span-4 flex flex-col space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-white">¿Tienes un proyecto?</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Siempre estoy interesado en hablar sobre desarrollo web, resolver problemas complejos y colaborar en proyectos geniales.
            </p>
            <div className="flex flex-col gap-3.5 pt-1">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold bg-primary hover:bg-primary-hover text-white dark:text-slate-950 dark:hover:text-white text-xs shadow-md hover:shadow-primary/15 transition-all duration-200 cursor-pointer self-start"
              >
                <span>Hablemos</span>
                <Mail size={13} />
              </a>
              
              {profile.location && (
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-500">
                  <MapPin size={13} className="text-slate-400 dark:text-slate-600" />
                  <span>{profile.location}</span>
                </div>
              )}
            </div>
          </motion.div>

        </div>

        {/* Bottom Bar Container */}
        <motion.div
          variants={childVariants}
          className="mt-12 pt-8 border-t border-slate-200/50 dark:border-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          {/* Copyright details */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-1">
            <p className="text-xs text-slate-500 dark:text-slate-600">
              © {currentYear} {profile.name}. Todos los derechos reservados.
            </p>
            <p className="text-[11px] text-slate-400 dark:text-slate-600">
              Construido con dedicación y código de alta fidelidad.
            </p>
          </div>

          {/* Back to top button */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="px-3.5 py-2.5 rounded-xl glass-effect text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-white border border-slate-200/60 dark:border-slate-800/60 shadow-sm cursor-pointer flex items-center justify-center gap-2 text-xs font-semibold transition-all duration-200"
            aria-label="Volver arriba"
          >
            <span>Volver arriba</span>
            <ArrowUp size={14} />
          </motion.button>

          {/* Stack details */}
          <p className="text-xs text-slate-500 dark:text-slate-600 text-center sm:text-right">
            Construido con <span className="font-semibold text-slate-600 dark:text-slate-400">Next.js 16</span>, <span className="font-semibold text-slate-600 dark:text-slate-400">Tailwind v4</span> y <span className="font-semibold text-slate-600 dark:text-slate-400">Sanity</span>.
          </p>
        </motion.div>
        
      </motion.div>
    </footer>
  )
}
