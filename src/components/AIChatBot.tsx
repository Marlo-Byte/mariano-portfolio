'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Bot, Sparkles, AlertCircle } from 'lucide-react'
import { ProfileType } from '@/sanity/mockData'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export function AIChatBot({ profile }: { profile: ProfileType }) {
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

  // Render markdown bold helper
  const renderMessageContent = (text: string) => {
    // Simple bold regex replacements to simulate markdown bold (**text**)
    const parts = text.split(/(\*\*[^*]+\*\*)/)
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-extrabold text-slate-900 dark:text-white">{part.slice(2, -2)}</strong>
      }
      // Handle simple bullet lines
      if (part.startsWith('• ') || part.startsWith(' - ')) {
        return <span key={index} className="block pl-2 py-0.5">{part}</span>
      }
      return part
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
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white shadow-md shadow-primary/10">
                  <Bot size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-800 dark:text-white leading-tight flex items-center gap-1">
                    Asistente de {profile.name.split(' ')[0]}
                    <Sparkles size={11} className="text-accent animate-pulse" />
                  </h3>
                  <span className="text-[10px] text-emerald-500 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    En línea
                  </span>
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
                      <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                        <Bot size={13} />
                      </div>
                    )}
                    <div
                      className={`px-4 py-2.5 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
                        msg.role === 'user'
                          ? 'bg-primary text-white rounded-tr-none'
                          : 'bg-slate-100/80 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 border border-slate-200/30 dark:border-slate-800/30 rounded-tl-none'
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
                    <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 flex items-center justify-center text-primary flex-shrink-0">
                      <Bot size={13} />
                    </div>
                    <div className="px-4 py-3 rounded-2xl rounded-tl-none bg-slate-100/80 dark:bg-slate-900/60 border border-slate-200/30 dark:border-slate-800/30 flex items-center gap-1">
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
                    className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200/70 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200/50 dark:border-slate-800/50 text-[10px] font-bold text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white hover:border-primary/40 dark:hover:border-primary/40 active:scale-95 transition-all duration-150 cursor-pointer"
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
                className="w-9.5 h-9.5 rounded-xl bg-primary hover:bg-primary-hover disabled:opacity-40 text-white flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer shadow-md shadow-primary/10 flex-shrink-0"
                aria-label="Enviar"
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent hover:scale-105 active:scale-95 text-white flex items-center justify-center shadow-lg hover:shadow-primary/25 cursor-pointer transition-all duration-200 relative group overflow-hidden"
        aria-label="Abrir Asistente de IA"
      >
        {/* Pulsing ring outline */}
        <span className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-primary to-accent opacity-65 blur-sm group-hover:opacity-100 transition-opacity duration-300 animate-ping duration-[3000ms]" />
        
        {/* Glow spotlight inside */}
        <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative z-10 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={22} />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center"
              >
                <MessageSquare size={22} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </button>
    </div>
  )
}
