import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json()

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Todos los campos son obligatorios.' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Por favor, ingresa un correo válido.' },
        { status: 400 }
      )
    }

    const apiKey = process.env.RESEND_API_KEY
    const toEmail = process.env.CONTACT_RECEIVER_EMAIL

    // Fallback for development if Resend API key is missing
    if (!apiKey) {
      console.log('=== [DEV MODE] Formulario de Contacto Recibido ===')
      console.log(`Nombre: ${name}`)
      console.log(`Email: ${email}`)
      console.log(`Mensaje: ${message}`)
      console.log('==================================================')
      
      // Simulate slow network request
      await new Promise((resolve) => setTimeout(resolve, 800))

      return NextResponse.json({
        success: true,
        message: '¡Mensaje recibido! (Simulado: configura tu RESEND_API_KEY para recibirlo de verdad)',
      })
    }

    const resend = new Resend(apiKey)

    // Send the email using Resend
    // By default, the free tier of Resend allows sending emails from 'onboarding@resend.dev'
    // to your registered account email.
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Mariano <onboarding@resend.dev>',
      to: toEmail || 'onboarding@resend.dev', // Fallback to onboarding email
      subject: `Nuevo mensaje de contacto de ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #4f46e5; border-bottom: 1px solid #ddd; padding-bottom: 10px;">Nuevo mensaje desde tu Portfolio</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin-top: 15px;">
            <p style="white-space: pre-wrap; margin: 0;">${message}</p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Error al enviar el email:', error)
      return NextResponse.json(
        { error: 'Error al enviar el mensaje. Por favor intenta de nuevo.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: '¡Tu mensaje fue enviado con éxito!',
      data,
    })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Ocurrió un error inesperado.' },
      { status: 500 }
    )
  }
}
