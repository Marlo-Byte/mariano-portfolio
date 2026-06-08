'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { ProfileType } from '@/sanity/mockData'

export function Contact({ profile }: { profile: ProfileType }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [responseMsg, setResponseMsg] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Client-side quick checks
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

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 border-t transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Ponte en Contacto
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-xl mx-auto">
            ¿Tienes algún proyecto en mente o quieres charlar? Escríbeme y te responderé lo antes posible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Info Column */}
          <div className="md:col-span-5 space-y-6">
            <div className="glass-effect p-6 rounded-2xl border">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                <Mail size={18} className="text-primary" />
                <span>Contacto Directo</span>
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                Si prefieres enviar un mail tradicional, puedes escribirme directamente a:
              </p>
              <a
                href={`mailto:${profile.email}`}
                className="text-sm font-semibold text-primary hover:text-primary-hover break-all"
              >
                {profile.email}
              </a>
            </div>
            
            <div className="glass-effect p-6 rounded-2xl border text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
              {profile.location && <p>📍 {profile.location}</p>}
              {profile.timezone && <p className="mt-2">🕒 {profile.timezone}</p>}
            </div>
          </div>

          {/* Form Column */}
          <div className="md:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={status === 'loading'}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors disabled:opacity-50"
                  placeholder="Tu nombre completo"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={status === 'loading'}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors disabled:opacity-50"
                  placeholder="ejemplo@correo.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Mensaje
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  disabled={status === 'loading'}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors disabled:opacity-50 resize-none"
                  placeholder="Escribe tu mensaje aquí..."
                  required
                />
              </div>

              {/* Status Alert Messages */}
              <AnimatePresence mode="wait">
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-start gap-2 text-sm"
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
                    className="p-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-xl flex items-start gap-2 text-sm"
                  >
                    <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                    <span>{responseMsg}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3.5 px-6 rounded-xl font-semibold bg-primary hover:bg-primary-hover text-white flex items-center justify-center gap-2 shadow-md hover:shadow-primary/30 transition-all duration-200 disabled:opacity-50 cursor-pointer"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <span>Enviar Mensaje</span>
                    <Send size={16} />
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
