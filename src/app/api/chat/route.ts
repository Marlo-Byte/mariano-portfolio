import { NextResponse } from 'next/server'
import { client } from '@/sanity/client'
import { ProfileType, ProjectType, SkillType, EducationType, mockProfile, mockProjects, mockSkills, mockEducation } from '@/sanity/mockData'

function getLocalTimeAndDate(timezoneStr: string | undefined): string {
  const now = new Date()
  let ianaTimezone = 'America/Argentina/Buenos_Aires'
  
  if (timezoneStr) {
    const tzLower = timezoneStr.toLowerCase()
    if (tzLower.includes('buenos aires') || tzLower.includes('argentina') || tzLower.includes('utc-3') || tzLower.includes('gmt-3')) {
      ianaTimezone = 'America/Argentina/Buenos_Aires'
    } else if (tzLower.includes('madrid') || tzLower.includes('españa') || tzLower.includes('utc+1') || tzLower.includes('gmt+1')) {
      ianaTimezone = 'Europe/Madrid'
    } else if (tzLower.includes('mexico') || tzLower.includes('cdmx') || tzLower.includes('utc-6') || tzLower.includes('gmt-6')) {
      ianaTimezone = 'America/Mexico_City'
    } else if (tzLower.includes('colombia') || tzLower.includes('bogota') || tzLower.includes('utc-5') || tzLower.includes('gmt-5')) {
      ianaTimezone = 'America/Bogota'
    } else {
      try {
        new Intl.DateTimeFormat('es-ES', { timeZone: timezoneStr }).format(now)
        ianaTimezone = timezoneStr
      } catch {
        ianaTimezone = 'America/Argentina/Buenos_Aires'
      }
    }
  }

  try {
    const formatter = new Intl.DateTimeFormat('es-ES', {
      timeZone: ianaTimezone,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    })
    return formatter.format(now)
  } catch {
    return now.toLocaleString('es-ES')
  }
}

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Mensajes no válidos.' }, { status: 400 })
    }

    // 1. Fetch CMS data to build the system prompt
    const isSanityConfigured =
      process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
      process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'placeholder'

    let profile: ProfileType = mockProfile
    let projects: ProjectType[] = mockProjects
    let skills: SkillType[] = mockSkills
    let education: EducationType[] = mockEducation

    if (isSanityConfigured) {
      try {
        const [p, pr, sk, ed] = await Promise.all([
          client.fetch<ProfileType | null>(`*[_type == "profile"][0]`),
          client.fetch<ProjectType[]>(`*[_type == "project"] | order(orderRank asc, order asc)`),
          client.fetch<SkillType[]>(`*[_type == "skill"] { ..., category-> } | order(orderRank asc, order asc)`),
          client.fetch<EducationType[]>(`*[_type == "education"] | order(orderRank asc, startDate desc)`),
        ])
        if (p) profile = p
        if (pr && pr.length > 0) projects = pr
        if (sk && sk.length > 0) skills = sk
        if (ed && ed.length > 0) education = ed
      } catch (err) {
        console.error('Error fetching CMS data in chat api, using fallbacks:', err)
      }
    }

    // 2. Resolve AI Configuration
    const aiEnabled = profile.aiEnabled !== false // Default to true
    const aiProvider = profile.aiProvider || 'gemini'
    // Prioritize API key in CMS, fallback to env variables
    const apiKey = profile.aiApiKey || (aiProvider === 'gemini' ? process.env.GEMINI_API_KEY : process.env.GROQ_API_KEY)
    const defaultPrompt = 'Eres "ML-Assistant", el asistente virtual interactivo y agente de Inteligencia Artificial de Mariano Lopez. Tu único objetivo es guiar, informar y conversar de manera profesional con reclutadores, clientes y visitantes de su portafolio.\n\nREGLAS DE COMPORTAMIENTO:\n1. IDENTIDAD: Háblale al usuario presentándote como el asistente de Mariano. Refiérete a Mariano siempre en tercera persona.\n2. TONO: Sé extremadamente profesional, servicial y amigable.\n3. BREVEDAD: Tus respuestas deben ser breves, estructuradas y fáciles de leer (máximo 2 párrafos cortos).\n4. CONTROL DE CONTEXTO: Responde ÚNICAMENTE utilizando los datos de Mariano. Si preguntan temas fuera de su perfil profesional, reencauza educadamente.\n5. NO ALUCINES: Jamás inventes datos personales, experiencias o proyectos.'
    const systemInstruction = profile.aiPrompt || defaultPrompt

    // If AI is disabled by CMS, return a quick warning
    if (!aiEnabled) {
      return NextResponse.json({
        role: 'assistant',
        content: 'El asistente virtual de IA está desactivado temporalmente.',
      })
    }

    // 3. Build Detailed Context
    const localDateTime = getLocalTimeAndDate(profile.timezone)
    const projectsList = projects.map(p => `- **${p.title}**: ${p.description} (Tecnologías: ${p.tags.join(', ')})`).join('\n')
    const skillsList = skills.map(s => `- ${s.name} (${s.category && typeof s.category !== 'string' ? s.category.title : 'General'})`).join('\n')
    const educationList = education.map(e => `- **${e.degree}** en ${e.institution} (${e.startDate} - ${e.endDate})`).join('\n')

    const fullContext = `
A continuación tienes la información profesional de Mariano Lopez para responder preguntas:

- **Nombre completo**: Mariano Lopez
- **Rol**: ${profile.role}
- **Biografía**: ${profile.bio}
- **Sobre mí**: ${profile.about}
- **Ubicación**: ${profile.location || 'Buenos Aires, Argentina'}
- **Zona Horaria**: ${profile.timezone || 'UTC-3'}
- **Fecha y hora actual de Mariano (según su zona horaria local)**: ${localDateTime}
- **Email de contacto**: ${profile.email}
- **GitHub**: ${profile.githubUrl || 'No disponible'}
- **LinkedIn**: ${profile.linkedinUrl || 'No disponible'}

**EDUCACIÓN Y ESTUDIOS**:
${educationList}

**HABILIDADES / TECNOLOGÍAS**:
${skillsList}

**PROYECTOS DESTACADOS**:
${projectsList}

---
INSTRUCCIONES ADICIONALES:
1. Responde preguntas del usuario basándote EN ESTE CONTEXTO de Mariano Lopez.
2. Si te preguntan algo que NO está en el contexto o no está relacionado con Mariano, responde educadamente que tu función es ser el asistente virtual de Mariano y sólo puedes hablar de su perfil.
3. Sé conciso y breve en tus respuestas (máximo 2 párrafos) para que se lea bien en un chat de pantalla chica.
`

    const lastUserMessage = messages[messages.length - 1].content

    // 4. If NO API key is found, trigger local rule-based engine fallback
    if (!apiKey) {
      console.log(`[Chat API Fallback] No API Key found for ${aiProvider}. Running local rule matching...`)
      
      const query = lastUserMessage.toLowerCase()
      let reply = ''

      if (query.includes('proyecto') || query.includes('trabajo') || query.includes('portafolio') || query.includes('hiciste')) {
        reply = `Mariano ha construido varios proyectos destacados. Algunos de ellos son:\n\n` + 
          projects.slice(0, 3).map(p => `• **${p.title}**: ${p.description}`).join('\n') + 
          `\n\n¿Te gustaría saber más detalles sobre alguno en particular?`
      } else if (query.includes('contacto') || query.includes('email') || query.includes('correo') || query.includes('escribir') || query.includes('llamar')) {
        reply = `Puedes ponerte en contacto directo con Mariano escribiéndole a su correo electrónico: **${profile.email}**, o a través del formulario al final de la página. Su ubicación actual es ${profile.location || 'Buenos Aires, Argentina'}.`
      } else if (query.includes('habilidad') || query.includes('tecnologia') || query.includes('sabe') || query.includes('lenguaje') || query.includes('stack')) {
        reply = `Mariano domina las siguientes tecnologías principales:\n\n` + 
          skills.slice(0, 7).map(s => `• ${s.name}`).join('\n') + 
          `\n\nEstá especializado principalmente en el desarrollo Frontend con React, Next.js y TypeScript.`
      } else if (query.includes('estudio') || query.includes('educacion') || query.includes('universidad') || query.includes('titulo')) {
        reply = `La formación de Mariano incluye:\n\n` + 
          education.map(e => `• **${e.degree}** - ${e.institution} (${e.startDate} - ${e.endDate})`).join('\n')
      } else if (query.includes('hora') || query.includes('dia') || query.includes('día') || query.includes('fecha') || query.includes('hoy') || query.includes('tiempo')) {
        reply = `Hoy es **${localDateTime}** (calculado en base a la zona horaria **${profile.timezone || 'UTC-3'}** configurada en el CMS).`
      } else {
        reply = `¡Hola! Soy el asistente virtual de Mariano Lopez (modo simulador). Puedo contarte sobre sus estudios, tecnologías preferidas, proyectos destacados o cómo contactarlo. ¿Qué te gustaría saber?`
      }

      // Simulate network delay
      await new Promise(r => setTimeout(r, 600))

      return NextResponse.json({
        role: 'assistant',
        content: reply,
      })
    }

    // 5. Query the chosen AI Provider
    if (aiProvider === 'gemini') {
      // Direct call to Google Gemini API
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`
      
      // Map chat history to Gemini structure
      const contents = messages.map((m: { role: string; content: string }) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      }))

      // Inject system prompt in last user message or as a separate systemInstruction
      const requestBody = {
        contents,
        systemInstruction: {
          parts: [{ text: `${systemInstruction}\n\n${fullContext}` }]
        },
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 500,
        }
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })

      if (!response.ok) {
        const errData = await response.json()
        throw new Error(errData.error?.message || 'Error en respuesta de Gemini API')
      }

      const resData = await response.json()
      const aiReply = resData.candidates?.[0]?.content?.parts?.[0]?.text || 'No pude generar una respuesta.'

      return NextResponse.json({
        role: 'assistant',
        content: aiReply.trim(),
      })
    } else {
      // Direct call to Groq Cloud (OpenAI-compatible)
      const url = 'https://api.groq.com/openai/v1/chat/completions'

      const systemPrompt = `${systemInstruction}\n\n${fullContext}`
      const apiMessages = [
        { role: 'system', content: systemPrompt },
        ...messages.map((m: { role: string; content: string }) => ({
          role: m.role,
          content: m.content,
        })),
      ]

      const requestBody = {
        model: 'llama-3.1-8b-instant', // Active fast model on Groq (replaces deprecated llama3-8b-8192)
        messages: apiMessages,
        temperature: 0.4,
        max_tokens: 500,
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify(requestBody),
      })

      if (!response.ok) {
        const errData = await response.json()
        throw new Error(errData.error?.message || 'Error en respuesta de Groq API')
      }

      const resData = await response.json()
      const aiReply = resData.choices?.[0]?.message?.content || 'No pude generar una respuesta.'

      return NextResponse.json({
        role: 'assistant',
        content: aiReply.trim(),
      })
    }

  } catch (error) {
    const err = error as Error
    console.error('Server error in chatbot API:', err)
    return NextResponse.json(
      { error: err.message || 'Ocurrió un error inesperado al procesar la pregunta.' },
      { status: 500 }
    )
  }
}
