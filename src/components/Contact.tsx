'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Send, CheckCircle2, AlertCircle, Loader2, Copy, Check } from 'lucide-react'
import { ProfileType } from '@/sanity/mockData'

export function Contact({ profile }: { profile: ProfileType }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [responseMsg, setResponseMsg] = useState('')
  const [copied, setCopied] = useState(false)

  // Input Focus States for Floating Labels
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCopyEmail = () => {
    if (!profile.email) return
    navigator.clipboard.writeText(profile.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error')
      setResponseMsg('Por favor completa todos los campos.')
      return
    }

    setStatus('loading')
    setResponseMsg('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Ocurrió un error al enviar el mensaje.')
      }

      setStatus('success')
      setResponseMsg(data.message || '¡Mensaje enviado correctamente!')
      setFormData({ name: '', email: '', message: '' })
    } catch (err) {
      console.error(err)
      const errorMessage = err instanceof Error ? err.message : 'Error de conexión. Por favor reintenta.'
      setStatus('error')
      setResponseMsg(errorMessage)
    }
  }

  // Label animation state helper
  const isLabelFloated = (name: 'name' | 'email' | 'message') => {
    return focusedField === name || formData[name] !== ''
  }

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 border-t transition-colors duration-300 relative">
      {/* Background glow */}
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-accent/5 blur-[120px] -z-10 animate-pulse duration-[8000ms]" />

      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Ponte en Contacto
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-xl mx-auto text-sm sm:text-base">
            ¿Tienes algún proyecto en mente o quieres charlar? Escríbeme y te responderé lo antes posible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Side: Info Bento Box (Spans 5 columns) */}
          <div className="md:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Direct Email Card */}
            <div className="glass-effect p-7 rounded-[2rem] border flex flex-col justify-between flex-1 relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-primary/10 dark:bg-primary/5 blur-xl group-hover:scale-110 transition-transform duration-300" />
              
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:rotate-6 transition-transform duration-300">
                  <Mail size={22} />
                </div>
                <h3 className="text-lg font-extrabold text-slate-800 dark:text-white">
                  Contacto Directo
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  ¿Prefieres un email tradicional? Puedes escribirme directamente o copiar mi dirección aquí:
                </p>
              </div>

              {/* Copy To Clipboard Button Container */}
              <div className="mt-6 flex items-center justify-between p-3 rounded-xl bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800/50">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 break-all select-all pr-2">
                  {profile.email}
                </span>
                
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-white dark:bg-slate-900 text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-white border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer flex-shrink-0"
                  aria-label="Copy Email"
                >
                  {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                </button>
              </div>
            </div>
            
            {/* Location & Timezone Card */}
            <div className="glass-effect p-6 rounded-[2rem] border flex flex-col justify-center space-y-3">
              {profile.location && (
                <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span>📍</span>
                  <span>{profile.location}</span>
                </div>
              )}
              {profile.timezone && (
                <div className="flex items-center gap-2.5 text-xs text-slate-500 dark:text-slate-400">
                  <span>🕒</span>
                  <span>{profile.timezone}</span>
                </div>
              )}
            </div>

          </div>

          {/* Right Side: Form Bento Box (Spans 7 columns) */}
          <div className="md:col-span-7">
            <form onSubmit={handleSubmit} className="glass-effect p-7 sm:p-8 rounded-[2rem] border space-y-5 flex flex-col justify-between h-full">
              
              <div className="space-y-5">
                {/* Name Input with Floating Label */}
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    disabled={status === 'loading'}
                    className="w-full px-4 pt-6 pb-2.5 rounded-xl border border-slate-300 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40 text-slate-850 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all disabled:opacity-50 text-sm"
                    required
                  />
                  <label
                    htmlFor="name"
                    className={`absolute left-4 pointer-events-none transition-all duration-200 ${
                      isLabelFloated('name')
                        ? 'top-2 text-[10px] font-bold text-primary uppercase tracking-wider'
                        : 'top-4.5 text-sm text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    Nombre Completo
                  </label>
                </div>

                {/* Email Input with Floating Label */}
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    disabled={status === 'loading'}
                    className="w-full px-4 pt-6 pb-2.5 rounded-xl border border-slate-300 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40 text-slate-850 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all disabled:opacity-50 text-sm"
                    required
                  />
                  <label
                    htmlFor="email"
                    className={`absolute left-4 pointer-events-none transition-all duration-200 ${
                      isLabelFloated('email')
                        ? 'top-2 text-[10px] font-bold text-primary uppercase tracking-wider'
                        : 'top-4.5 text-sm text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    Correo Electrónico
                  </label>
                </div>

                {/* Message Input with Floating Label */}
                <div className="relative">
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    disabled={status === 'loading'}
                    className="w-full px-4 pt-6 pb-2.5 rounded-xl border border-slate-300 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40 text-slate-850 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all disabled:opacity-50 resize-none text-sm"
                    required
                  />
                  <label
                    htmlFor="message"
                    className={`absolute left-4 pointer-events-none transition-all duration-200 ${
                      isLabelFloated('message')
                        ? 'top-2 text-[10px] font-bold text-primary uppercase tracking-wider'
                        : 'top-4.5 text-sm text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    Escribe tu mensaje...
                  </label>
                </div>
              </div>

              {/* Status Alert Banners */}
              <div className="py-1">
                <AnimatePresence mode="wait">
                  {status === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-start gap-2.5 text-sm font-medium"
                    >
                      <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0" />
                      <span>{responseMsg}</span>
                    </motion.div>
                  )}

                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-2xl flex items-start gap-2.5 text-sm font-medium"
                    >
                      <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                      <span>{responseMsg}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3.5 px-6 rounded-xl font-bold bg-primary hover:bg-primary-hover text-white flex items-center justify-center gap-2 shadow-md hover:shadow-primary/20 transition-all duration-200 disabled:opacity-50 cursor-pointer"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Enviando Mensaje...</span>
                  </>
                ) : (
                  <>
                    <span>Enviar Mensaje</span>
                    <Send size={14} />
                  </>
                )}
              </button>

            </form>
          </div>

        </div>

      </div>
    </section>
  )
}
