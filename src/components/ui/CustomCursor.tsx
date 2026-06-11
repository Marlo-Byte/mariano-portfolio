'use client'

import React, { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

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
  const [isHovering, setIsHovering] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(true)
  const [particles, setParticles] = useState<Particle[]>([])
  const [ripples, setRipples] = useState<Ripple[]>([])

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Spring configuration for trailing physical lag
  const springConfig = { damping: 28, stiffness: 280, mass: 0.4 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  // 1. Mobile/Touch Device detection (pointer: fine capability check)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)')
    
    // Defer the set state to avoid synchronous rendering in effect execution
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

  // 2. Cursor Event Listeners (only setup on desktop devices)
  useEffect(() => {
    if (isMobile) return

    // Cursor Coordinates Tracking
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    // Hover Target Detections (Global Event Delegation)
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return
      
      const isInteractive = target.closest('a, button, input, textarea, [role="button"], .cursor-pointer, select, [type="submit"], iframe')
      if (isInteractive) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return
      
      const isInteractive = target.closest('a, button, input, textarea, [role="button"], .cursor-pointer, select, [type="submit"], iframe')
      if (isInteractive) {
        setIsHovering(false)
      }
    }

    // Click State, Ripple & Particle Spawner
    const handleMouseDown = (e: MouseEvent) => {
      setIsClicked(true)

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
    const handleMouseUp = () => setIsClicked(false)

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mouseout', handleMouseOut)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mouseout', handleMouseOut)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isMobile, isVisible, cursorX, cursorY])

  // Do not render anything if the client is mobile/touch-screen
  if (isMobile) return null

  // Spring animation variants for the outer glow ring
  const ringVariants = {
    default: {
      width: 28,
      height: 28,
      backgroundColor: 'rgba(99, 102, 241, 0)',
      borderColor: 'var(--primary)',
      borderWidth: 1.5,
    },
    hover: {
      width: 50,
      height: 50,
      backgroundColor: 'color-mix(in srgb, var(--accent) 15%, transparent)',
      borderColor: 'var(--accent)',
      borderWidth: 2,
    }
  }

  // Animation variants for the inner dot
  const dotVariants = {
    default: {
      scale: 1,
      backgroundColor: 'var(--primary)',
    },
    hover: {
      scale: 1.3,
      backgroundColor: 'var(--accent)',
    }
  }

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
      {/* Outer Spring Glow Ring */}
      <motion.div
        variants={ringVariants}
        animate={isClicked ? { scale: 0.82, width: 44, height: 44, borderColor: 'var(--accent)', borderWidth: 2.5 } : isHovering ? 'hover' : 'default'}
        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
        className="fixed top-0 left-0 rounded-full pointer-events-none flex items-center justify-center shadow-sm z-[9998]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 0.85 : 0,
        }}
      >
        {/* Subtle center crosshair indicator on hover */}
        {isHovering && (
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.35, scale: 1 }}
            className="w-1.5 h-1.5 rounded-full bg-accent"
          />
        )}
      </motion.div>

      {/* Inner Precision Dot */}
      <motion.div
        variants={dotVariants}
        animate={isClicked ? { scale: 0.7 } : isHovering ? 'hover' : 'default'}
        transition={{ type: 'spring', stiffness: 450, damping: 25 }}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none shadow-md shadow-primary/30 z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
        }}
      />
    </div>
  )
}
