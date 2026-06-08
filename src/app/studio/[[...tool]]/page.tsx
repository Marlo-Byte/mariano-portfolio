'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export default function StudioPage() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID

  if (!projectId || projectId === 'placeholder') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030712] text-slate-100 p-6">
        <div className="max-w-md w-full glass-effect p-8 rounded-2xl border border-slate-800 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center mx-auto text-2xl font-bold">
            !
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Configuración de Sanity Requerida</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Para poder cargar el panel de Sanity Studio, necesitas configurar tu <code className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-amber-400">NEXT_PUBLIC_SANITY_PROJECT_ID</code> en tu archivo local <code className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-amber-400">.env.local</code>.
          </p>
          <div className="text-left bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs text-slate-400">
            <p className="font-semibold text-slate-200">Instrucciones:</p>
            <ol className="list-decimal list-inside space-y-1.5">
              <li>Crea un proyecto en <a href="https://sanity.io/manage" target="_blank" rel="noreferrer" className="text-primary hover:underline font-semibold">sanity.io/manage</a>.</li>
              <li>Copia tu <span className="text-slate-200">Project ID</span>.</li>
              <li>Agrégalo en un archivo <code className="text-slate-200">.env.local</code> en la raíz.</li>
              <li>Asegúrate de agregar <code className="text-slate-200">http://localhost:3000</code> en los CORS Origins del panel de Sanity.</li>
              <li>Reinicia el servidor de desarrollo (<code className="text-slate-200">npm run dev</code>).</li>
            </ol>
          </div>
          <p className="text-xs text-slate-500">
            Puedes consultar todos los pasos en el archivo <code className="text-slate-400">SETUP_GUIDE.md</code>.
          </p>
        </div>
      </div>
    )
  }

  return <NextStudio config={config} />
}
