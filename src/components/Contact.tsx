'use client'

import { useState } from 'react'

export default function Contact() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section>
      <div className="page">
        <div
          style={{
            borderTop: '1px solid var(--border)',
            paddingTop: 'clamp(3rem, 8vh, 5rem)',
            paddingBottom: 'clamp(2rem, 5vh, 3rem)',
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 7.5rem)',
              fontWeight: 700,
              fontFamily: 'var(--font-mono)',
              color: 'var(--text)',
              letterSpacing: '-0.03em',
              lineHeight: 0.95,
              marginBottom: 'var(--space-5)',
            }}
          >
            READY TO LAUNCH?
          </h2>

          <p
            className="font-body"
            style={{
              fontSize: 'clamp(0.95rem, 1.1vw, 1.125rem)',
              color: 'var(--text-dim)',
              lineHeight: 1.7,
              marginBottom: 'var(--space-6)',
              maxWidth: '480px',
            }}
          >
            We take on 2–3 new missions per quarter. If you have a project that needs serious engineering, open a channel.
          </p>

          <a
            href="mailto:hello@launchcontrollabs.com"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
              fontFamily: 'var(--font-mono)',
              fontWeight: 400,
              color: isHovered ? 'var(--amber)' : 'var(--text)',
              textDecoration: 'none',
              borderBottom: isHovered ? '1px solid var(--amber)' : '1px solid transparent',
              transition: 'color 150ms ease-out, border-color 150ms ease-out',
              cursor: 'pointer',
            }}
          >
            <span style={{ color: 'var(--amber)' }}>&gt;</span>
            hello@launchcontrollabs.com
          </a>
        </div>
      </div>
    </section>
  )
}
