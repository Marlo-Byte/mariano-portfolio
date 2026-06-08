'use client'

import { useState, useEffect } from 'react'
import { flushSync } from 'react-dom'
import { useTheme } from 'next-themes'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ProfileType } from '@/sanity/mockData'

interface NavbarProps {
  profile: ProfileType
}

export function Navbar({ profile }: NavbarProps) {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  // Avoid hydration mismatch by waiting for mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true)
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  // Auto-track active section on scroll
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px', // Trigger when section occupies center of viewport
      threshold: 0,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      });
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    const sections = ['home', 'about', 'projects', 'skills', 'contact']
    
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'

    if (
      !('startViewTransition' in document) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setTheme(nextTheme)
      return
    }

    const doc = document as unknown as {
      startViewTransition: (callback: () => void) => void
    }

    doc.startViewTransition(() => {
      flushSync(() => {
        setTheme(nextTheme)
      })
    })
  }

  const menuItems = [
    { label: 'Inicio', id: 'home', href: '#home' },
    { label: 'Sobre Mí', id: 'about', href: '#about' },
    { label: 'Proyectos', id: 'projects', href: '#projects' },
    { label: 'Habilidades', id: 'skills', href: '#skills' },
    { label: 'Contacto', id: 'contact', href: '#contact' },
  ]

  return (
    <>
      {/* Floating Pill Navbar */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
        className="fixed top-4 left-0 right-0 mx-auto z-50 w-[92%] max-w-5xl rounded-2xl glass-effect px-4 sm:px-6 h-16 flex items-center justify-between border shadow-lg shadow-slate-100/10 dark:shadow-slate-950/20 transition-all duration-300"
      >
        {/* Dynamic Logo */}
        <div className="flex-shrink-0">
          <a href="#home" className="text-lg font-bold tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-extrabold text-base shadow-sm">
              {profile.name.charAt(0)}
            </span>
            <span className="hidden sm:inline hover:text-primary transition-colors duration-200">
              {profile.name}
            </span>
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 relative">
          {menuItems.map((item) => {
            const isActive = activeSection === item.id
            return (
              <a
                key={item.id}
                href={item.href}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`relative px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors duration-300 ${
                  isActive
                    ? 'text-primary dark:text-white'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                {/* Sliding Hover Bubble */}
                {hoveredItem === item.id && (
                  <motion.span
                    layoutId="hoverBubble"
                    className="absolute inset-0 rounded-lg bg-slate-100 dark:bg-slate-800/60 -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}

                {/* Underline Indicator for Active Section */}
                {isActive && (
                  <motion.span
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-gradient-to-r from-primary to-accent"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                
                {item.label}
              </a>
            )
          })}
        </nav>

        {/* Action Controls (Theme switch + Menu trigger) */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-accent hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-transparent hover:border-slate-200/50 dark:hover:border-slate-700/50 transition-all duration-300 cursor-pointer"
            aria-label="Toggle Theme"
          >
            {mounted && (
              <motion.div
                initial={{ rotate: -90, scale: 0.8, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </motion.div>
            )}
          </button>

          {/* Mobile hamburger menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 md:hidden rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 focus:outline-none border border-transparent hover:border-slate-200/50 dark:hover:border-slate-700/50 transition-all duration-300"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {/* Full-Screen Mobile Glass Overlay Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-slate-950/40 dark:bg-slate-950/60 backdrop-blur-lg md:hidden flex flex-col justify-center items-center"
          >
            <motion.nav
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col space-y-6 text-center"
            >
              {menuItems.map((item, index) => (
                <motion.a
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-2xl font-bold uppercase tracking-widest hover:text-primary transition-colors duration-200 ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent'
                      : 'text-slate-800 dark:text-slate-200'
                  }`}
                >
                  {item.label}
                </motion.a>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
