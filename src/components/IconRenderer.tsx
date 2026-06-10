import * as React from 'react'
import * as LucideIcons from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import * as SolidIcons from '@fortawesome/free-solid-svg-icons'
import * as BrandIcons from '@fortawesome/free-brands-svg-icons'

interface IconRendererProps {
  name: string
  className?: string
  size?: number
}

type LucideIconComponent = React.ComponentType<{ className?: string; size?: number }>

export function IconRenderer({ name, className, size = 24 }: IconRendererProps) {
  // Check if it's a Devicon (starts with 'devicon-')
  if (name.startsWith('devicon-')) {
    const parts = name.split('-')
    const tech = parts[1]
    const version = parts[2] || 'original'
    
    // Build direct SVG URL
    const svgUrl = `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${tech}/${tech}-${version}.svg`
    
    return (
      <span className={className} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: size, height: size }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={svgUrl} 
          alt={tech} 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          className={
            (tech === 'nextjs' || tech === 'vercel' || tech === 'github' || tech === 'express' || tech === 'git')
              ? 'dark:invert transition-all duration-300'
              : ''
          }
        />
      </span>
    )
  }

  // Check if it's a FontAwesome icon (starts with 'fa')
  if (name.startsWith('fa')) {
    const faIcon = (SolidIcons as unknown as Record<string, IconDefinition>)[name] || 
                   (BrandIcons as unknown as Record<string, IconDefinition>)[name]
    if (faIcon) {
      return (
        <span className={className} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: size, height: size }}>
          <FontAwesomeIcon icon={faIcon} style={{ width: '100%', height: '100%' }} />
        </span>
      )
    }
  }

  // Fallback to Lucide Icons
  const LucideIcon = (LucideIcons as unknown as Record<string, LucideIconComponent>)[name] || LucideIcons.Code
  return <LucideIcon className={className} size={size} />
}
