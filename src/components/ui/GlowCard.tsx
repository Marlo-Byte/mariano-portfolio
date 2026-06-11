'use client'

import React, { useState } from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlowCardProps extends React.ComponentPropsWithoutRef<typeof motion.div> {
  children: React.ReactNode
  className?: string
  contentClassName?: string
  glowSize?: number
}

export function GlowCard({
  children,
  className,
  contentClassName,
  glowSize = 300,
  ...props
}: GlowCardProps) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [isHovered, setIsHovered] = useState(false)

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  // Radial gradient matching mouse coordinates (uses color-mix on --primary)
  const background = useMotionTemplate`
    radial-gradient(
      ${glowSize}px circle at ${mouseX}px ${mouseY}px,
      color-mix(in srgb, var(--primary) 10%, transparent),
      transparent 80%
    )
  `

  // Border glow utilizing color-mix between primary and accent colors
  const borderBackground = useMotionTemplate`
    radial-gradient(
      ${glowSize * 0.6}px circle at ${mouseX}px ${mouseY}px,
      color-mix(in srgb, var(--primary) 40%, transparent),
      color-mix(in srgb, var(--accent) 30%, transparent) 50%,
      transparent 80%
    )
  `

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative rounded-[2rem] overflow-hidden border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-950/40 backdrop-blur-md transition-shadow duration-300 shadow-sm flex flex-col",
        isHovered && "shadow-lg shadow-primary/5 dark:shadow-primary/10",
        className
      )}
      {...props}
    >
      {/* Glow effect background (inner) */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300"
        style={{
          background,
          opacity: isHovered ? 1 : 0
        }}
      />

      {/* Glow border ring (only visible on hover) */}
      <motion.div
        className="pointer-events-none absolute -inset-[1px] rounded-[2rem] z-10 opacity-0 transition-opacity duration-300"
        style={{
          background: borderBackground,
          opacity: isHovered ? 1 : 0,
          padding: '1px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude'
        }}
      />

      {/* Content wrapper */}
      <div className={cn("relative z-20 h-full w-full flex flex-col flex-grow", contentClassName)}>
        {children}
      </div>
    </motion.div>
  )
}
