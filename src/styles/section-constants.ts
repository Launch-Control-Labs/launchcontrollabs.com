export const COLORS = {
  navy: '#020914',
  navyLight: '#0d1a3a',
  white: '#FFFFFF',
  cyan: '#22D3EE',
  cyanDim: 'rgba(34,211,238,0.3)',
  whiteDim: 'rgba(255,255,255,0.5)',
  whiteFaint: 'rgba(255,255,255,0.15)',
}

export const TYPOGRAPHY = {
  // Display (Anton — primary, 13vw hero scale)
  display: {
    font: 'var(--font-display)',
    size: 'clamp(5rem, 13vw, 16rem)',
    weight: 400,
    lineHeight: 0.85,
    letterSpacing: '-0.03em',
  },
  // Section Header (Space Grotesk — secondary, 8vw)
  sectionHeader: {
    font: 'var(--font-display-secondary)',
    size: 'clamp(3.5rem, 8vw, 8rem)',
    weight: 700,
    lineHeight: 0.85,
    letterSpacing: '-0.02em',
  },
  // Stat (Anton — 4rem+)
  stat: {
    font: 'var(--font-display)',
    size: 'clamp(3rem, 8vw, 7rem)',
    weight: 400,
    lineHeight: 0.85,
    letterSpacing: '-0.02em',
  },
  // Legacy aliases for backward compatibility
  headline: 'clamp(5rem, 16vw, 16rem)',
  headlineMd: 'clamp(3.5rem, 9vw, 8rem)',
  dataNum: 'clamp(3rem, 8vw, 7rem)',
  // Deck (body-adjacent, 1.8vw)
  deck: 'clamp(1rem, 1.8vw, 1.5rem)',
  label: 'clamp(0.65rem, 0.9vw, 0.85rem)',
  body: 'clamp(0.875rem, 1vw, 1rem)',
  lineHeightTight: 0.85,
  lineHeightBody: 1.6,
  letterSpacingLabel: '0.25em',
  letterSpacingDeck: '0.15em',
}

export const SPACING = {
  sectionPad: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 3rem)',
  sectionPadX: 'clamp(1.5rem, 4vw, 3rem)',
  sectionPadY: 'clamp(3rem, 6vw, 5rem)',
  gap: 'clamp(1rem, 2vw, 2rem)',
}

export const SECTION_FLAG = {
  display: 'inline-block' as const,
  border: '2px solid rgba(255,255,255,0.4)',
  padding: '0.3rem 0.8rem',
  fontFamily: 'var(--font-mono)',
  fontSize: 'clamp(0.65rem, 0.9vw, 0.85rem)',
  letterSpacing: '0.25em',
  fontWeight: 700,
  textTransform: 'uppercase' as const,
  color: '#FFFFFF',
  marginBottom: '1.5rem',
  alignSelf: 'flex-start' as const,
}

export const SECTION_BASE = {
  background: '#020914',
  color: '#FFFFFF',
  margin: 0,
  padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 3rem)',
  minHeight: '70vh',
  display: 'flex' as const,
  flexDirection: 'column' as const,
  justifyContent: 'center' as const,
  position: 'relative' as const,
  overflow: 'hidden' as const,
}

export const STAR_BG = `
  radial-gradient(1px 1px at 10% 15%, rgba(255,255,255,0.4) 0%, transparent 100%),
  radial-gradient(1px 1px at 25% 40%, rgba(255,255,255,0.3) 0%, transparent 100%),
  radial-gradient(1px 1px at 40% 10%, rgba(255,255,255,0.5) 0%, transparent 100%),
  radial-gradient(1px 1px at 55% 60%, rgba(255,255,255,0.3) 0%, transparent 100%),
  radial-gradient(1px 1px at 70% 25%, rgba(255,255,255,0.4) 0%, transparent 100%),
  radial-gradient(1px 1px at 85% 75%, rgba(255,255,255,0.3) 0%, transparent 100%),
  radial-gradient(1px 1px at 15% 80%, rgba(255,255,255,0.4) 0%, transparent 100%),
  radial-gradient(1px 1px at 90% 45%, rgba(255,255,255,0.5) 0%, transparent 100%),
  radial-gradient(1px 1px at 60% 90%, rgba(255,255,255,0.3) 0%, transparent 100%),
  radial-gradient(1px 1px at 35% 70%, rgba(255,255,255,0.4) 0%, transparent 100%)
`

// 6-section color theme system with WCAG AA compliance (4.5:1 contrast ratio)
export const SECTION_THEMES = {
  hero: {
    // Section 1 — THE PROMISE
    bg: '#080810',
    text: '#E5EBF2',
    accent: '#22D3EE',
    muted: '#4B5563',
    border: '#1F2937',
  },
  problem: {
    // Section 2 — THE PROBLEM
    bg: '#1A0505',
    text: '#FAFAFA',
    accent: '#DC2626',
    muted: '#7F1D1D',
    border: '#991B1B',
  },
  guide: {
    // Section 3 — THE GUIDE
    bg: '#FAFAFA',
    text: '#0A0A0F',
    accent: '#2563EB',
    muted: '#6B7280',
    border: '#E5E7EB',
  },
  proof: {
    // Section 4 — THE PROOF
    bg: '#0A0A0F',
    text: '#FAFAFA',
    accent: '#F59E0B',
    muted: '#374151',
    border: '#1F2937',
  },
  authority: {
    // Section 5 — THE AUTHORITY
    bg: '#000000',
    text: '#FFFFFF',
    accent: '#FFFFFF',
    muted: '#6B7280',
    border: '#374151',
  },
  orbit: {
    // Section 6 — THE ORBIT
    bg: '#0C1E3A',
    text: '#E5EBF2',
    accent: '#4ADE80',
    muted: '#1E3A5F',
    border: '#1E3A5F',
  },
} as const
