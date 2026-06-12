'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { StarfieldBackground } from './StarfieldBackground'

interface PageLoaderProps {
  logoCharacter?: string
}

export function PageLoader({ logoCharacter = 'M' }: PageLoaderProps) {
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('[Iniciando sistema...]')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // Disable scrolling on load
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    let currentProgress = 0
    const interval = setInterval(() => {
      // Random step size to make loading feel organic
      const step = Math.floor(Math.random() * 8) + 2
      currentProgress = Math.min(currentProgress + step, 100)
      setProgress(currentProgress)

      // Update status string based on progress percentage
      if (currentProgress < 20) {
        setStatus('[Iniciando sistema...]')
      } else if (currentProgress < 50) {
        setStatus('[Cargando recursos del portfolio...]')
      } else if (currentProgress < 75) {
        setStatus('[Analizando perfil del desarrollador...]')
      } else if (currentProgress < 95) {
        setStatus('[Estableciendo conexión con la IA...]')
      } else {
        setStatus('[Listo ✓]')
      }

      if (currentProgress >= 100) {
        clearInterval(interval)
        const timeout = setTimeout(() => {
          setIsComplete(true)
          // Restore scrolling
          document.body.style.overflow = ''
          document.documentElement.style.overflow = ''
        }, 500)
        return () => clearTimeout(timeout)
      }
    }, 100)

    return () => {
      clearInterval(interval)
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [])

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: '-100%',
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[99999] pointer-events-auto select-none"
        >
          <StarfieldBackground count={350} speed={2} starColor="#ffffff">
            <div className="w-full h-full flex flex-col items-center justify-center">
              {/* Logo Monogram Container */}
              <div className="relative flex items-center justify-center w-24 h-24">
                <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_0_15px_rgba(99,102,241,0.35)]">
                  {/* Left bracket path < */}
                  <motion.path
                    d="M 33,32 L 13,50 L 33,68"
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.4, ease: 'easeInOut' }}
                  />
                  
                  {/* Right bracket path > */}
                  <motion.path
                    d="M 67,32 L 87,50 L 67,68"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.4, ease: 'easeInOut' }}
                  />
                </svg>

                {/* Logo Monogram character in center */}
                <motion.div
                  initial={{ scale: 0.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 100, damping: 10, delay: 0.6 }}
                  className="absolute font-mono text-3xl font-black text-white tracking-tighter"
                >
                  {logoCharacter}
                </motion.div>
              </div>

              {/* Slim progress bar wrapper */}
              <div className="w-52 h-[3px] bg-slate-900/60 rounded-full mt-10 overflow-hidden relative border border-slate-800/40">
                {/* Active loading progress gradient */}
                <motion.div 
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full shadow-[0_0_8px_rgba(6,182,212,0.6)]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut', duration: 0.1 }}
                />
              </div>

              {/* Status logs */}
              <div className="mt-4 text-[10px] font-mono text-slate-400 tracking-wider h-4 uppercase font-bold">
                {status}
              </div>

              {/* Percentage */}
              <div className="text-xs font-mono font-bold text-slate-300 mt-1.5">
                {progress}%
              </div>
            </div>
          </StarfieldBackground>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
