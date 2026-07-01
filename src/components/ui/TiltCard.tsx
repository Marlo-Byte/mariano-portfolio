'use client'

import React, { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TiltCardProps extends React.ComponentPropsWithoutRef<typeof motion.div> {
  children: React.ReactNode
  className?: string
  maxTilt?: number
  useGlassStyles?: boolean
}

export function TiltCard({ 
  children, 
  className, 
  maxTilt = 12, 
  useGlassStyles = true,
  style,
  ...props 
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  
  // Mouse coordinates normalized between -0.5 and 0.5
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Spring physics for smooth rotations
  const springConfig = { damping: 25, stiffness: 220, mass: 0.5 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)

  // Rotate axes calculations
  const rotateX = useTransform(ySpring, [-0.5, 0.5], [maxTilt, -maxTilt])
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-maxTilt, maxTilt])

  // Holographic reflection/shine positioning
  const shineX = useTransform(xSpring, [-0.5, 0.5], ['0%', '100%'])
  const shineY = useTransform(ySpring, [-0.5, 0.5], ['0%', '100%'])
  
  // Dynamic color shift based on cursor positions (holographic rainbow foil style)
  const hue1 = useTransform(xSpring, [-0.5, 0.5], [175, 235])
  const hue2 = useTransform(ySpring, [-0.5, 0.5], [270, 330])
  
  // CSS transforms (combine custom styles if present)
  const transform = useMotionTemplate`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`

  const shineBg = useMotionTemplate`
    radial-gradient(
      circle at ${shineX} ${shineY},
      rgba(255, 255, 255, 0.25) 0%,
      color-mix(in srgb, hsl(${hue1} 85% 65% / 15%), transparent) 25%,
      color-mix(in srgb, hsl(${hue2} 85% 65% / 15%), transparent) 50%,
      transparent 80%
    )
  `

  const [isHovered, setIsHovered] = useState(false)
  const cardRectRef = useRef<{ left: number; top: number; width: number; height: number }>({ left: 0, top: 0, width: 0, height: 0 })

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRectRef.current
    if (rect.width === 0) return

    const normalizedX = (e.clientX - rect.left) / rect.width - 0.5
    const normalizedY = (e.clientY - rect.top) / rect.height - 0.5

    x.set(normalizedX)
    y.set(normalizedY)
  }

  function handleMouseLeave() {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  function handleMouseEnter() {
    setIsHovered(true)
    const card = cardRef.current
    if (card) {
      const rect = card.getBoundingClientRect()
      cardRectRef.current = {
        left: rect.left,
        top: rect.top,
        width: rect.width || 1,
        height: rect.height || 1,
      }
    }
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ ...style, transform }}
      className={cn(
        "relative flex flex-col transform-gpu preserve-3d transition-shadow duration-300",
        useGlassStyles && "rounded-[2rem] overflow-hidden border border-slate-200/50 dark:border-slate-800/50 bg-white/70 dark:bg-slate-950/40 backdrop-blur-md shadow-sm",
        useGlassStyles && isHovered && "shadow-2xl shadow-primary/5 dark:shadow-primary/10 border-primary/20 dark:border-primary/20",
        className
      )}
      {...props}
    >
      {/* Holographic shiny glaze overlay */}
      {useGlassStyles && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 mix-blend-color-dodge opacity-0 transition-opacity duration-300"
          style={{
            background: shineBg,
            opacity: isHovered ? 1 : 0
          }}
        />
      )}
      
      {/* Rainbow reflection underlay border */}
      {useGlassStyles && (
        <div 
          className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-tr from-primary/5 via-accent/5 to-transparent transition-opacity duration-300"
          style={{ opacity: isHovered ? 1 : 0.4 }}
        />
      )}

      {/* Content wrapper with depth */}
      <div className={cn(
        "relative z-20 h-full w-full flex flex-col flex-grow transform-gpu",
        useGlassStyles ? "translate-z-10" : ""
      )}>
        {children}
      </div>
    </motion.div>
  )
}
