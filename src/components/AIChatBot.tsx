'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Bot, Sparkles, AlertCircle, FileText, Cpu, Code2 } from 'lucide-react'
import { ProfileType, ProjectType } from '@/sanity/mockData'
import { getFileUrl } from '@/sanity/client'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

// Contact Card component
function ContactCard({ email, linkedin, github }: { email: string; linkedin?: string; github?: string }) {
  const [copied, setCopied] = useState(false)
  
  const handleCopy = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="my-2.5 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900/60 shadow-sm space-y-3 w-full text-left">
      <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
        <div className="w-7.5 h-7.5 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
          <Send size={13} />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Email de Mariano</span>
          <span className="text-xs font-semibold block truncate select-all">{email}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleCopy}
          className="flex-1 py-1.5 px-3 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-[10px] font-bold text-slate-700 dark:text-slate-200 transition-all duration-150 active:scale-95 cursor-pointer"
        >
          {copied ? '¡Copiado! ✓' : 'Copiar correo'}
        </button>
        <a
          href={`mailto:${email}`}
          className="flex-1 py-1.5 px-3 rounded-lg bg-primary hover:bg-primary-hover text-white dark:text-slate-950 dark:hover:text-white text-[10px] font-bold text-center transition-all duration-150 active:scale-95 cursor-pointer flex items-center justify-center"
        >
          Escribir email
        </a>
      </div>

      {(linkedin || github) && (
        <div className="flex items-center justify-between pt-2 border-t border-slate-200/50 dark:border-slate-800/40">
          <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Enlaces</span>
          <div className="flex gap-1.5">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-lg bg-slate-200/40 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors duration-150 cursor-pointer"
                title="GitHub"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
            )}
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-lg bg-slate-200/40 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors duration-150 cursor-pointer"
                title="LinkedIn"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// CV Download Card component
function CVCard({ resumeUrl }: { resumeUrl: string }) {
  return (
    <div className="my-2.5 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900/60 shadow-sm flex items-center justify-between gap-3 w-full text-left">
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="w-8.5 h-8.5 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center flex-shrink-0">
          <FileText size={16} />
        </div>
        <div className="min-w-0">
          <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Currículum Vitae</span>
          <span className="text-xs font-semibold block truncate text-slate-800 dark:text-slate-200">CV_Mariano_Lopez.pdf</span>
        </div>
      </div>
      <a
        href={resumeUrl}
        download="CV_Mariano_Lopez.pdf"
        target="_blank"
        rel="noreferrer"
        className="py-1.5 px-3 rounded-lg bg-primary hover:bg-primary-hover text-white dark:text-slate-950 dark:hover:text-white text-[10px] font-bold transition-all duration-150 active:scale-95 cursor-pointer whitespace-nowrap"
      >
        Descargar
      </a>
    </div>
  )
}

// Projects list Card component
function ProjectsCard({ projects }: { projects: ProjectType[] }) {
  return (
    <div className="my-2.5 space-y-2 w-full text-left">
      {projects.slice(0, 2).map((p) => (
        <div 
          key={p._id} 
          className="p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900/60 shadow-sm flex flex-col gap-2"
        >
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-[11px] font-extrabold text-slate-800 dark:text-slate-100 truncate">{p.title}</h4>
            <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[7px] font-extrabold uppercase tracking-wider whitespace-nowrap">
              Proyecto
            </span>
          </div>
          
          <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal line-clamp-2">
            {p.description}
          </p>

          <div className="flex flex-wrap gap-1 mt-0.5">
            {p.tags.slice(0, 3).map((t) => (
              <span key={t} className="px-1.5 py-0.5 rounded bg-slate-200/50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[8px] font-bold">
                {t}
              </span>
            ))}
          </div>

          <div className="flex gap-2 pt-2 border-t border-slate-200/30 dark:border-slate-800/20 mt-1">
            {p.codeUrl && (
              <a
                href={p.codeUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-1 px-2 rounded-md bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200/60 dark:border-slate-700 text-[9px] font-bold text-slate-600 dark:text-slate-200 text-center transition-colors cursor-pointer"
              >
                Código
              </a>
            )}
            {p.demoUrl && (
              <a
                href={p.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-1 px-2 rounded-md bg-primary hover:bg-primary-hover text-white dark:text-slate-950 dark:hover:text-white text-[9px] font-bold text-center transition-colors cursor-pointer"
              >
                Ver Demo
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

// Stats Card component
function StatsCard({ stats }: { stats?: Array<{ label: string; value: string }> }) {
  const displayStats = stats && stats.length > 0 ? stats : [
    { label: 'Años de Experiencia', value: '3+' },
    { label: 'Proyectos Completados', value: '15+' },
    { label: 'Tecnologías Dominadas', value: '12+' },
  ]

  return (
    <div className="my-2.5 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900/60 shadow-sm space-y-2.5 w-full text-left">
      <h4 className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Logros Clave</h4>
      
      <div className="space-y-2.5">
        {displayStats.map((s, i) => (
          <div key={i} className="space-y-1">
            <div className="flex justify-between text-[10px] font-bold text-slate-700 dark:text-slate-350">
              <span className="truncate pr-2">{s.label}</span>
              <span className="text-primary">{s.value}</span>
            </div>
            <div className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full w-[80%]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

type AvatarState = 'idle' | 'thinking' | 'technical' | 'contact' | 'cv' | 'success' | 'error'

function DynamicAvatar({ state, size = 16, className = '' }: { state: AvatarState; size?: number; className?: string }) {
  switch (state) {
    case 'thinking':
      return <Cpu size={size} className={`text-accent animate-spin ${className}`} />
    case 'technical':
      return <Code2 size={size} className={`text-emerald-500 animate-pulse ${className}`} />
    case 'contact':
      return <Send size={size} className={`text-violet-500 ${className}`} />
    case 'cv':
      return <FileText size={size} className={`text-rose-500 ${className}`} />
    case 'success':
      return <Sparkles size={size} className={`text-yellow-500 animate-pulse fill-yellow-500/20 ${className}`} />
    case 'error':
      return <AlertCircle size={size} className={`text-rose-500 animate-bounce ${className}`} />
    case 'idle':
    default:
      return <Bot size={size} className={`text-primary ${className}`} />
  }
}

function getMessageState(content: string): AvatarState {
  const text = content.toLowerCase()
  if (text.includes('[card:contact]') || text.includes('[tag:contact]') || text.includes('correo') || text.includes('email') || text.includes('contacto') || text.includes('linkedin') || text.includes('github') || text.includes('redes')) {
    return 'contact'
  }
  if (text.includes('[card:cv]') || text.includes('[tag:cv]') || text.includes('cv') || text.includes('currículum') || text.includes('curriculum') || text.includes('descargar')) {
    return 'cv'
  }
  if (text.includes('[card:projects]') || text.includes('[card:stats]') || text.includes('proyecto') || text.includes('proyectos') || text.includes('código') || text.includes('tecnología') || text.includes('experiencia') || text.includes('skills')) {
    return 'technical'
  }
  if (text.includes('hola') || text.includes('bienvenido') || text.includes('asistente') || text.includes('🤖') || text.includes('✨')) {
    return 'success'
  }
  if (text.includes('lo siento') || text.includes('disculpa') || text.includes('error') || text.includes('fallo') || text.includes('problema')) {
    return 'error'
  }
  return 'idle'
}

export function AIChatBot({ profile, projects }: { profile: ProfileType; projects: ProjectType[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(() => [
    {
      role: 'assistant',
      content: `¡Hola! Soy el asistente virtual inteligente de **${profile.name}**. 🤖✨\n\nPuedo responder tus dudas sobre su trayectoria, proyectos destacados, estudios o cómo ponerte en contacto. ¿Qué te gustaría saber hoy?`,
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [showWelcomeTooltip, setShowWelcomeTooltip] = useState(false)

  useEffect(() => {
    // Show tooltip after 3 seconds, hide after 10 seconds
    const showTimer = setTimeout(() => {
      setShowWelcomeTooltip(true)
    }, 3000)

    const hideTimer = setTimeout(() => {
      setShowWelcomeTooltip(false)
    }, 10000)

    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
    }
  }, [])
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Scroll to bottom on new messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
      // Delay focus slightly for animation completion
      setTimeout(() => inputRef.current?.focus(), 250)
    }
  }, [messages, isOpen])

  // Close chat window on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleSubmit = async (e?: React.FormEvent, customText?: string) => {
    e?.preventDefault()
    const textToSend = customText || input
    if (!textToSend.trim() || isLoading) return

    setInput('')
    setErrorMsg('')
    const userMessage: Message = { role: 'user', content: textToSend }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: updatedMessages }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Ocurrió un error al procesar tu pregunta.')
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: data.content }])
    } catch (err) {
      const error = err as Error
      console.error(error)
      setErrorMsg(error.message || 'Error de conexión. Intenta de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  // Quick suggestions selection
  const suggestions = [
    { text: '¿Qué tecnologías usas?', label: 'Tecnologías' },
    { text: 'Háblame de tus proyectos', label: 'Proyectos' },
    { text: '¿Cómo puedo contactarte?', label: 'Contacto' },
  ]

  // Parse inline element strings (bold, emails, URLs)
  const parseInlineElements = (text: string): React.ReactNode[] => {
    // Regex splits text into bold blocks, emails, HTTP(S) links, and regular text segments
    const tokenRegex = /(\*\*[^*]+\*\*|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|https?:\/\/[^\s]+)/g
    const parts = text.split(tokenRegex)
    
    return parts.map((part, idx) => {
      const key = `inline-${idx}`
      if (!part) return null

      // Match markdown bold syntax: **text**
      if (part.startsWith('**') && part.endsWith('**')) {
        const innerText = part.slice(2, -2)
        return (
          <strong key={key} className="font-black text-slate-900 dark:text-white">
            {parseInlineElements(innerText)}
          </strong>
        )
      }

      // Match email addresses
      if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(part)) {
        return (
          <a
            key={key}
            href={`mailto:${part}`}
            className="text-primary hover:text-primary-hover dark:text-blue-400 dark:hover:text-blue-300 underline decoration-primary/40 dark:decoration-blue-400/40 underline-offset-2 font-semibold transition-colors duration-150 cursor-pointer select-all break-all"
          >
            {part}
          </a>
        )
      }

      // Match HTTP/HTTPS links
      if (/^https?:\/\//.test(part)) {
        let cleanUrl = part
        let trailingPunctuation = ''
        const trailingMatch = part.match(/([.,;:!?)\]}]+)$/)
        if (trailingMatch) {
          trailingPunctuation = trailingMatch[1]
          cleanUrl = part.slice(0, -trailingPunctuation.length)
        }

        return (
          <span key={key}>
            <a
              href={cleanUrl}
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:text-primary-hover dark:text-blue-400 dark:hover:text-blue-300 underline decoration-primary/40 dark:decoration-blue-400/40 underline-offset-2 font-semibold transition-colors duration-150 cursor-pointer break-all"
            >
              {cleanUrl}
            </a>
            {trailingPunctuation}
          </span>
        )
      }

      // Plain text segments
      return part
    })
  }

  // Render markdown bold helper & Rich visual cards
  const renderMessageContent = (text: string) => {
    // Split text by custom [CARD:...] or [TAG:...] tags (case-insensitive, allows space)
    const parts = text.split(/(\[(?:CARD|TAG)\s*:\s*(?:CONTACT|PROJECTS|CV|STATS)\])/gi)

    return parts.map((part, index) => {
      const match = part.match(/^\[(?:CARD|TAG)\s*:\s*(CONTACT|PROJECTS|CV|STATS)\]$/i)
      
      if (match) {
        const cardType = match[1].toUpperCase() // e.g. "CONTACT", "PROJECTS", "CV", "STATS"
        
        if (cardType === 'CONTACT') {
          return (
            <ContactCard 
              key={index} 
              email={profile.email} 
              linkedin={profile.linkedinUrl} 
              github={profile.githubUrl} 
            />
          )
        }
        if (cardType === 'CV') {
          const cvUrl = getFileUrl(profile.resume) || profile.resumeUrlFallback || '#'
          return <CVCard key={index} resumeUrl={cvUrl} />
        }
        if (cardType === 'PROJECTS') {
          return <ProjectsCard key={index} projects={projects || []} />
        }
        if (cardType === 'STATS') {
          return <StatsCard key={index} stats={profile.stats} />
        }
        
        return null
      }

      // Split the text segment into lines to parse list items, headings, and paragraphs individually
      const lines = part.split('\n')
      return (
        <div key={index} className="space-y-1.5 my-1">
          {lines.map((line, lineIdx) => {
            const trimmedLine = line.trim()
            if (!trimmedLine && lineIdx > 0 && lineIdx < lines.length - 1) {
              return <div key={lineIdx} className="h-2" />
            }

            // A: Check for Headers (starts with # or ends with : and is relatively short)
            // Strip leading/trailing double asterisks (common in bold titles) to avoid syntax interference
            const cleanLineCheck = trimmedLine.replace(/^\*\*|\*\*$/g, '').trim()
            const isHeader = trimmedLine.startsWith('#') || 
              (cleanLineCheck.endsWith(':') && cleanLineCheck.length < 60 && !cleanLineCheck.includes('http') && !cleanLineCheck.includes('@'))
            
            // B: Check for Bullet Points (starts with -, *, •)
            const isBullet = trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ') || trimmedLine.startsWith('• ')
            
            // Clean prefix for rendering
            let contentText = line
            if (isBullet) {
              if (trimmedLine.startsWith('- ')) contentText = line.replace(/^\s*-\s/, '')
              else if (trimmedLine.startsWith('* ')) contentText = line.replace(/^\s*\*\s/, '')
              else if (trimmedLine.startsWith('• ')) contentText = line.replace(/^\s*•\s/, '')
            }

            // Remove markdown header symbols if present
            if (trimmedLine.startsWith('#')) {
              contentText = contentText.replace(/^#+\s*/, '')
            }

            const parsedElements = parseInlineElements(contentText)

            if (isHeader) {
              const headerLevel = trimmedLine.startsWith('###') 
                ? 'text-xs' 
                : trimmedLine.startsWith('##') 
                ? 'text-[13px]' 
                : trimmedLine.startsWith('#') 
                ? 'text-[14px]' 
                : 'text-[12.5px]'
              return (
                <h4 
                  key={lineIdx} 
                  className={`font-black text-slate-900 dark:text-white mt-3.5 first:mt-1 mb-1 tracking-tight ${headerLevel}`}
                >
                  {parsedElements}
                </h4>
              )
            }

            if (isBullet) {
              return (
                <div key={lineIdx} className="flex items-start gap-2 pl-2 text-[12.5px] leading-relaxed text-slate-800 dark:text-slate-200">
                  <span className="text-primary font-bold flex-shrink-0 mt-2 select-none text-[6px]">●</span>
                  <span className="flex-1">{parsedElements}</span>
                </div>
              )
            }

            // Normal line
            return (
              <p key={lineIdx} className="text-[12.5px] leading-relaxed text-slate-800 dark:text-slate-200">
                {parsedElements}
              </p>
            )
          })}
        </div>
      )
    })
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat window popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 sm:absolute sm:inset-auto sm:bottom-full sm:right-0 w-full h-full sm:w-[380px] sm:h-[520px] sm:max-h-[600px] rounded-none sm:rounded-3xl border-0 sm:border border-slate-200/80 dark:border-slate-800/80 shadow-2xl flex flex-col overflow-hidden mb-0 sm:mb-4 bg-white dark:bg-slate-950 z-[60] sm:z-auto"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-gradient-to-r from-primary/10 to-accent/10 border-b border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 flex items-center justify-center shadow-sm relative overflow-hidden group shadow-primary/5">
                  <DynamicAvatar state={isLoading ? 'thinking' : errorMsg ? 'error' : 'idle'} size={18} />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-50 pointer-events-none" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-800 dark:text-white leading-tight flex items-center gap-1">
                    Asistente de {profile.name.split(' ')[0]}
                    <Sparkles size={11} className="text-accent animate-pulse" />
                  </h3>
                  {isLoading ? (
                    <span className="text-[10px] text-primary dark:text-indigo-400 font-bold flex items-center gap-1 animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-indigo-400 animate-ping" />
                      Escribiendo...
                    </span>
                  ) : (
                    <span className="text-[10px] text-emerald-500 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      En línea
                    </span>
                  )}
                </div>
              </div>
              
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 active:scale-95 transition-all duration-200 cursor-pointer"
                aria-label="Cerrar Chat"
              >
                <X size={16} />
              </button>
            </div>

            {/* Message List */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 scrollbar-thin">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex gap-2 max-w-[85%] items-start">
                    {msg.role === 'assistant' && (
                      <div className="w-7 h-7 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 flex items-center justify-center shadow-sm flex-shrink-0 mt-0.5 relative overflow-hidden">
                        <DynamicAvatar state={getMessageState(msg.content)} size={13} />
                      </div>
                    )}
                    <div
                      className={`px-4 py-2.5 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
                        msg.role === 'user'
                          ? 'bg-primary text-white dark:text-slate-950 rounded-tr-none'
                          : 'bg-slate-50/90 dark:bg-slate-900/65 text-slate-800 dark:text-slate-200 border border-slate-200/60 dark:border-slate-800/40 rounded-tl-none'
                      }`}
                      style={{ whiteSpace: 'pre-wrap' }}
                    >
                      {renderMessageContent(msg.content)}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing indicator loader */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-2 max-w-[85%] items-center">
                    <div className="w-7 h-7 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 flex items-center justify-center shadow-sm flex-shrink-0 relative overflow-hidden">
                      <DynamicAvatar state="thinking" size={13} />
                    </div>
                    <div className="px-4 py-3 rounded-2xl rounded-tl-none bg-slate-50/90 dark:bg-slate-900/65 border border-slate-200/60 dark:border-slate-800/40 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              {/* Error display */}
              {errorMsg && (
                <div className="flex justify-center p-2">
                  <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-xl flex items-center gap-2 text-xs font-semibold">
                    <AlertCircle size={14} className="flex-shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick suggestions chips */}
            {messages.length < 5 && !isLoading && (
              <div className="px-5 py-2 flex gap-1.5 flex-wrap border-t border-slate-200/30 dark:border-slate-800/30 bg-slate-50/20 dark:bg-slate-950/20">
                {suggestions.map((sug, i) => (
                  <button
                    key={i}
                    onClick={() => handleSubmit(undefined, sug.text)}
                    className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200/70 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200/50 dark:border-slate-800/50 text-[10px] font-bold text-slate-700 dark:text-slate-350 hover:text-primary dark:hover:text-white hover:border-primary/40 dark:hover:border-primary/40 active:scale-95 transition-all duration-150 cursor-pointer"
                  >
                    {sug.label}
                  </button>
                ))}
              </div>
            )}

            {/* Input Bar */}
            <form
              onSubmit={handleSubmit}
              className="p-3.5 border-t border-slate-200/50 dark:border-slate-800/50 flex items-center gap-2 bg-slate-50/30 dark:bg-slate-950/30"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                placeholder="Escribe tu pregunta..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-900/40 focus:bg-white dark:focus:bg-slate-900/80 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all disabled:opacity-50 text-xs"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-9.5 h-9.5 rounded-xl bg-primary hover:bg-primary-hover disabled:opacity-40 text-white dark:text-slate-950 dark:hover:text-white flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer shadow-md shadow-primary/10 flex-shrink-0"
                aria-label="Enviar"
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <div className="relative group">
        {/* Tooltip */}
        {!isOpen && (
          <div
            className={`hidden sm:flex absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap px-3.5 py-2 rounded-2xl text-[11px] font-extrabold text-slate-800 dark:text-slate-100 border border-slate-200/50 dark:border-slate-800/50 shadow-xl backdrop-blur-md bg-white/95 dark:bg-slate-950/95 pointer-events-none transition-all duration-300 items-center gap-2 z-30 ${
              showWelcomeTooltip
                ? 'opacity-100 translate-x-0 scale-100'
                : 'opacity-0 translate-x-3 scale-95 group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100'
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>¿Tienes alguna duda? ¡Pregúntame! ✨</span>
            {/* Tiny arrow pointing to the button */}
            <div className="absolute top-1/2 -translate-y-1/2 left-full w-0 h-0 border-y-[6px] border-y-transparent border-l-[6px] border-l-white/95 dark:border-l-slate-950/95" />
          </div>
        )}

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="w-15 h-15 rounded-full text-white flex items-center justify-center shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/45 cursor-pointer relative"
          aria-label="Abrir Asistente de IA"
          animate={isOpen ? {} : { y: [0, -6, 0] }}
          transition={isOpen ? {} : { repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Glowing Aura Behind */}
          <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-primary to-accent opacity-30 blur-lg group-hover:opacity-60 transition-opacity duration-300" />

          {/* Rotating Outer Neon Ring */}
          <motion.div
            className="absolute -inset-[3px] rounded-full bg-gradient-to-r from-primary via-accent to-pink-500 z-0"
            animate={isOpen ? { rotate: 0 } : { rotate: 360 }}
            transition={isOpen ? {} : { repeat: Infinity, duration: 6, ease: 'linear' }}
          />

          {/* Border Mask to separate neon border and main gradient */}
          <span className="absolute inset-[0.5px] rounded-full bg-white dark:bg-slate-950 z-[1] transition-colors duration-300" />

          {/* Main Gradient Sphere */}
          <span className="absolute inset-[3px] rounded-full bg-gradient-to-tr from-primary via-primary-hover to-accent z-[2] group-hover:brightness-110 transition-all duration-300" />

          {/* 3D Glass Reflection Shine */}
          <span className="absolute inset-[3px] top-[3px] h-[45%] rounded-t-full bg-gradient-to-b from-white/30 to-transparent z-[3] pointer-events-none" />

          {/* AI Badge with State */}
          {!isOpen && (
            <span className={`absolute -top-1.5 -right-1.5 w-5.5 h-5.5 rounded-full border-2 border-white dark:border-slate-950 flex items-center justify-center text-white shadow-md z-20 ${isLoading ? 'bg-primary animate-pulse' : 'bg-accent animate-bounce'}`}>
              {isLoading ? (
                <Cpu size={9} className="animate-spin" />
              ) : (
                <Sparkles size={9} className="fill-white text-white" />
              )}
            </span>
          )}

          {/* Icon Container */}
          <div className="relative z-10 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center"
                >
                  <X size={20} className="stroke-[2.5]" />
                </motion.div>
              ) : (
                <motion.div
                  key="chat"
                  initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center"
                >
                  <Bot size={24} className="stroke-[2] group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.button>
      </div>
    </div>
  )
}
