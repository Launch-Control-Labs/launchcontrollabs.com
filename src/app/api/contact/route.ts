import { Resend } from 'resend'
import { NextRequest } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)

  if (!body) {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const { name, email, message } = body as Record<string, string>

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return Response.json({ error: 'Name, email, and message are required.' }, { status: 400 })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return Response.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }

  const from = process.env.CONTACT_EMAIL_FROM ?? 'onboarding@resend.dev'
  const toRaw = process.env.CONTACT_EMAIL_TO ?? ''
  const to = toRaw.split(',').map((s) => s.trim()).filter(Boolean)

  if (to.length === 0) {
    return Response.json({ error: 'Server misconfiguration: no recipient configured.' }, { status: 500 })
  }

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `New contact form submission from ${name}`,
    html: `
      <div style="font-family: monospace; background: #080810; color: #E5EBF2; padding: 2rem; border-radius: 4px; max-width: 600px;">
        <div style="border-bottom: 1px solid #22D3EE; padding-bottom: 1rem; margin-bottom: 1.5rem;">
          <p style="color: #22D3EE; font-size: 0.7rem; letter-spacing: 0.25em; text-transform: uppercase; margin: 0 0 0.5rem;">
            LAUNCH CONTROL LABS — NEW CONTACT SUBMISSION
          </p>
          <h2 style="margin: 0; font-size: 1.25rem; font-weight: 400; color: #E5EBF2;">
            ${name}
          </h2>
        </div>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="color: #8BA0B5; font-size: 0.7rem; letter-spacing: 0.15em; text-transform: uppercase; padding: 0.5rem 0; width: 80px; vertical-align: top;">FROM</td>
            <td style="padding: 0.5rem 0;"><a href="mailto:${email}" style="color: #22D3EE; text-decoration: none;">${email}</a></td>
          </tr>
          <tr>
            <td style="color: #8BA0B5; font-size: 0.7rem; letter-spacing: 0.15em; text-transform: uppercase; padding: 0.5rem 0; vertical-align: top;">MESSAGE</td>
            <td style="padding: 0.5rem 0; white-space: pre-wrap; line-height: 1.6;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</td>
          </tr>
        </table>
        <p style="margin-top: 2rem; color: #4B5C6B; font-size: 0.65rem; letter-spacing: 0.1em; text-transform: uppercase;">
          Reply directly to this email to respond to ${name}.
        </p>
      </div>
    `,
  })

  if (error) {
    console.error('[/api/contact] Resend error:', error)
    return Response.json({ error: 'Failed to send message. Please try again.' }, { status: 500 })
  }

  return Response.json({ success: true })
}
