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
        <div style="background-color: #f8fafc; padding: 40px 10px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; min-height: 100%;">
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(15, 23, 42, 0.05); border: 1px solid #e2e8f0;">
            <!-- Top Gradient Bar -->
            <tr>
              <td height="6" style="background: linear-gradient(90deg, #6366f1 0%, #06b6d4 100%);"></td>
            </tr>
            
            <!-- Main Content Area -->
            <tr>
              <td style="padding: 40px 32px;">
                <!-- Header -->
                <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                  <tr>
                    <td>
                      <span style="font-size: 24px; font-weight: 800; color: #0f172a; letter-spacing: -0.025em; display: inline-block; vertical-align: middle;">
                        <span style="color: #6366f1;">&lt;</span> M <span style="color: #06b6d4;">&gt;</span>
                      </span>
                      <span style="font-size: 18px; font-weight: 700; color: #1e293b; display: inline-block; vertical-align: middle; margin-left: 8px; font-family: inherit;">
                        Mariano Portfolio
                      </span>
                    </td>
                    <td align="right">
                      <span style="display: inline-block; padding: 6px 12px; background-color: #e0e7ff; color: #4f46e5; border-radius: 9999px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">
                        Nuevo Mensaje
                      </span>
                    </td>
                  </tr>
                </table>

                <!-- Intro -->
                <h2 style="font-size: 20px; font-weight: 700; color: #0f172a; margin: 0 0 16px 0; line-height: 1.3;">
                  ¡Has recibido un nuevo mensaje de contacto!
                </h2>
                <p style="font-size: 14px; color: #475569; margin: 0 0 24px 0; line-height: 1.5;">
                  Un visitante de tu portafolio ha completado el formulario de contacto. Aquí tienes los detalles del remitente y su mensaje:
                </p>

                <!-- Sender Details Box -->
                <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; border-radius: 12px; border: 1px solid #f1f5f9; margin-bottom: 24px;">
                  <tr>
                    <td style="padding: 16px;">
                      <table width="100%" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                          <td width="30%" valign="top" style="font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; padding-bottom: 8px;">
                            Nombre:
                          </td>
                          <td width="70%" valign="top" style="font-size: 14px; font-weight: 600; color: #1e293b; padding-bottom: 8px;">
                            ${name}
                          </td>
                        </tr>
                        <tr>
                          <td width="30%" valign="top" style="font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em;">
                            Email:
                          </td>
                          <td width="70%" valign="top" style="font-size: 14px; font-weight: 600; color: #6366f1;">
                            <a href="mailto:${email}" style="color: #6366f1; text-decoration: none;">${email}</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <!-- Message Box -->
                <div style="font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">
                  Mensaje:
                </div>
                <div style="background-color: #ffffff; border-left: 4px solid #6366f1; border-radius: 0 12px 12px 0; padding: 20px; margin-bottom: 32px; border-top: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9; border-bottom: 1px solid #f1f5f9; box-shadow: 0 2px 8px rgba(15, 23, 42, 0.02);">
                  <p style="font-size: 15px; color: #334155; line-height: 1.6; margin: 0; white-space: pre-wrap; font-style: normal;">${message}</p>
                </div>

                <!-- Call to Action Button -->
                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="center">
                      <a href="mailto:${email}?subject=RE: Nuevo mensaje de contacto de ${name}" style="display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%); color: #ffffff; font-weight: 700; font-size: 14px; text-decoration: none; padding: 14px 30px; border-radius: 10px; box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.3); transition: all 0.2s;">
                        Responder a ${name}
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color: #f8fafc; padding: 24px 32px; border-top: 1px solid #e2e8f0; text-align: center;">
                <p style="font-size: 12px; color: #94a3b8; margin: 0 0 8px 0; line-height: 1.5;">
                  Este correo fue enviado automáticamente desde el formulario de contacto de tu portafolio personal.
                </p>
                <p style="font-size: 11px; color: #cbd5e1; margin: 0;">
                  © ${new Date().getFullYear()} Mariano Portfolio. Todos los derechos reservados.
                </p>
              </td>
            </tr>
          </table>
        </div>
      `,
    })

    if (error) {
      console.error('Error al enviar el email:', error)
      return NextResponse.json(
        { error: error.message || 'Error al enviar el mensaje. Por favor intenta de nuevo.' },
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
      { error: error instanceof Error ? error.message : 'Ocurrió un error inesperado.' },
      { status: 500 }
    )
  }
}
