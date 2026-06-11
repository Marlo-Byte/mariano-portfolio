'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  id: number
  x: number
  y: number
  color: string
  angle: number
  distance: number
  size: number
}

interface Ripple {
  id: number
  x: number
  y: number
  color: string
}

export function CustomCursor() {
  const [particles, setParticles] = useState<Particle[]>([])
  const [ripples, setRipples] = useState<Ripple[]>([])
  const [isMobile, setIsMobile] = useState(true)

  // Mobile/Touch Device detection (pointer: fine capability check)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)')
    const checkMedia = () => {
      setIsMobile(!mediaQuery.matches)
    }
    const timer = setTimeout(checkMedia, 0)

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsMobile(!e.matches)
    }
    mediaQuery.addEventListener('change', handleMediaChange)

    return () => {
      clearTimeout(timer)
      mediaQuery.removeEventListener('change', handleMediaChange)
    }
  }, [])

  useEffect(() => {
    if (isMobile) return

    const handleMouseDown = (e: MouseEvent) => {
      const colors = [
        'var(--primary)',
        'var(--accent)',
        '#ec4899', // Pink
        '#f43f5e', // Rose
        '#a855f7', // Purple
        '#3b82f6', // Blue
        '#10b981'  // Emerald
      ]

      const themeColor = colors[Math.floor(Math.random() * 2)] // Primary/Accent for shockwaves

      // 1. Spawn Concentric Shockwave
      const newRipple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        color: themeColor
      }
      setRipples((prev) => [...prev, newRipple].slice(-15))

      // 2. Spawn Sparks/Particles
      const count = 12
      const newParticles = Array.from({ length: count }).map((_, i) => {
        const angle = Math.random() * Math.PI * 2
        const distance = 40 + Math.random() * 55
        const size = 3 + Math.random() * 3
        const color = colors[Math.floor(Math.random() * colors.length)]

        return {
          id: Date.now() + i + Math.random(),
          x: e.clientX,
          y: e.clientY,
          color,
          angle,
          distance,
          size
        }
      })

      setParticles((prev) => [...prev, ...newParticles].slice(-60))
    }

    window.addEventListener('mousedown', handleMouseDown)
    return () => {
      window.removeEventListener('mousedown', handleMouseDown)
    }
  }, [isMobile])

  if (isMobile) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Shockwaves/Ripples Rendering */}
      {ripples.map((r) => (
        <React.Fragment key={r.id}>
          {/* Sharp Inner Shockwave Ring */}
          <motion.div
            initial={{ x: r.x, y: r.y, scale: 0.05, opacity: 0 }}
            animate={{
              scale: 2.4,
              opacity: [0.9, 0],
            }}
            transition={{ delay: 0.05, duration: 0.55, ease: 'easeOut' }}
            onAnimationComplete={() => {
              setRipples((prev) => prev.filter((rip) => rip.id !== r.id))
            }}
            className="fixed w-12 h-12 rounded-full border-2 pointer-events-none z-[9997]"
            style={{
              borderColor: r.color,
              boxShadow: `0 0 10px ${r.color}, inset 0 0 10px ${r.color}`,
              translateX: '-50%',
              translateY: '-50%',
            }}
          />
          {/* Blurry Outer Shockwave Aura */}
          <motion.div
            initial={{ x: r.x, y: r.y, scale: 0.05, opacity: 0 }}
            animate={{
              scale: 3.2,
              opacity: [0.55, 0],
            }}
            transition={{ delay: 0.08, duration: 0.65, ease: 'easeOut' }}
            className="fixed w-12 h-12 rounded-full border pointer-events-none z-[9996] blur-[3px]"
            style={{
              borderColor: r.color,
              backgroundColor: `color-mix(in srgb, ${r.color} 10%, transparent)`,
              translateX: '-50%',
              translateY: '-50%',
            }}
          />
        </React.Fragment>
      ))}

      {/* Particles Rendering */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: p.x - p.size / 2, y: p.y - p.size / 2, scale: 1, opacity: 1 }}
          animate={{
            x: p.x - p.size / 2 + Math.cos(p.angle) * p.distance,
            y: p.y - p.size / 2 + Math.sin(p.angle) * p.distance,
            scale: 0,
            opacity: 0,
          }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          onAnimationComplete={() => {
            setParticles((prev) => prev.filter((part) => part.id !== p.id))
          }}
          className="fixed rounded-full pointer-events-none z-[9999]"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 8px ${p.color}`,
          }}
        />
      ))}
    </div>
  )
}
