'use client'

import React from 'react'
import { SECTION_THEMES } from '@/styles/section-constants'

type SectionKey = keyof typeof SECTION_THEMES

interface SectionThemeProviderProps {
  sectionIndex: number
  children: React.ReactNode
  className?: string
}

export function SectionThemeProvider({
  sectionIndex,
  children,
  className = '',
}: SectionThemeProviderProps) {
  const sectionKeys = Object.keys(SECTION_THEMES) as SectionKey[]
  const sectionKey = sectionKeys[sectionIndex % sectionKeys.length]
  const theme = SECTION_THEMES[sectionKey]

  const sectionStyles = {
    '--section-bg': theme.bg,
    '--section-text': theme.text,
    '--section-accent': theme.accent,
    '--section-muted': theme.muted,
    '--section-border': theme.border,
  } as React.CSSProperties

  return (
    <div
      style={sectionStyles}
      className={className}
      data-section={sectionKey}
    >
      {children}
    </div>
  )
}
