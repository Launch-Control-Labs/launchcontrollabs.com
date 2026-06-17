'use client'

import { useState, FormEvent, useEffect } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

interface ContactFormProps {
  /** Accent colour for borders, labels, and focus rings. Defaults to cyan #22D3EE */
  accentColor?: string
}

export function ContactForm({ accentColor = '#22D3EE' }: ContactFormProps) {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  // Stack name/email fields on narrow containers (≤ 420 px wide)
  const [stackFields, setStackFields] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 420px)')
    const update = (e: MediaQueryListEvent | MediaQueryList) => setStackFields(e.matches)
    update(mq)
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()

      if (!res.ok) {
        setErrorMsg(json.error ?? 'Something went wrong.')
        setStatus('error')
      } else {
        setStatus('success')
      }
    } catch {
      setErrorMsg('Network error — please try again.')
      setStatus('error')
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(255,255,255,0.03)',
    border: `1px solid rgba(${hexToRgb(accentColor)}, 0.25)`,
    borderRadius: 0,
    // min 44 px tap target height; font ≥ 16 px prevents iOS auto-zoom
    padding: '0.75rem',
    fontFamily: 'var(--font-mono)',
    fontSize: '16px',
    color: '#E5EBF2',
    outline: 'none',
    transition: 'border-color 0.2s ease',
    appearance: 'none',
    WebkitAppearance: 'none',
    minHeight: '44px',
    boxSizing: 'border-box',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.6rem',
    letterSpacing: '0.25em',
    textTransform: 'uppercase',
    color: accentColor,
    marginBottom: '0.35rem',
  }

  if (status === 'success') {
    return (
      <div
        style={{
          border: `1px solid rgba(${hexToRgb(accentColor)}, 0.3)`,
          padding: '1.5rem',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.65rem, 1vw, 0.8rem)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: accentColor,
            marginBottom: '0.5rem',
          }}
        >
          TRANSMISSION RECEIVED
        </p>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.85rem, 1.1vw, 0.95rem)',
            color: 'rgba(229,235,242,0.7)',
            lineHeight: 1.5,
          }}
        >
          We&apos;ll be in touch within 48 hours.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{ width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>

        {/* Name + Email — side-by-side on wide, stacked on narrow */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: stackFields ? '1fr' : '1fr 1fr',
            gap: '0.75rem',
          }}
        >
          <div>
            <label htmlFor="cf-name" style={labelStyle}>Name</label>
            <input
              id="cf-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="Your name"
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = accentColor)}
              onBlur={(e) => (e.currentTarget.style.borderColor = `rgba(${hexToRgb(accentColor)}, 0.25)`)}
            />
          </div>
          <div>
            <label htmlFor="cf-email" style={labelStyle}>Email</label>
            <input
              id="cf-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = accentColor)}
              onBlur={(e) => (e.currentTarget.style.borderColor = `rgba(${hexToRgb(accentColor)}, 0.25)`)}
            />
          </div>
        </div>

        <div>
          <label htmlFor="cf-message" style={labelStyle}>Message</label>
          <textarea
            id="cf-message"
            name="message"
            required
            rows={4}
            placeholder="Tell us about your project..."
            style={{ ...inputStyle, resize: 'vertical', minHeight: '6rem', lineHeight: 1.5 }}
            onFocus={(e) => (e.currentTarget.style.borderColor = accentColor)}
            onBlur={(e) => (e.currentTarget.style.borderColor = `rgba(${hexToRgb(accentColor)}, 0.25)`)}
          />
        </div>

        {status === 'error' && (
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: '#F87171',
              letterSpacing: '0.05em',
              margin: 0,
            }}
          >
            {errorMsg}
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.7rem, 1vw, 0.85rem)',
            letterSpacing: '0.25em',
            color: status === 'loading' ? 'rgba(229,235,242,0.4)' : accentColor,
            background: 'transparent',
            border: `2px solid ${status === 'loading' ? 'rgba(229,235,242,0.2)' : accentColor}`,
            // min 48 px tap target
            padding: '0.85rem 2rem',
            minHeight: '48px',
            textTransform: 'uppercase',
            fontWeight: 700,
            cursor: status === 'loading' ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
            width: '100%',
          }}
        >
          {status === 'loading' ? 'TRANSMITTING...' : 'SEND MESSAGE →'}
        </button>

      </div>
    </form>
  )
}

/** Convert a 6-digit hex colour to "R, G, B" for use in rgba() */
function hexToRgb(hex: string): string {
  const clean = hex.replace('#', '')
  const r = parseInt(clean.substring(0, 2), 16)
  const g = parseInt(clean.substring(2, 4), 16)
  const b = parseInt(clean.substring(4, 6), 16)
  return `${r}, ${g}, ${b}`
}
