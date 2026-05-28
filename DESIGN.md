# DESIGN.md — Launch Control Labs

```yaml
---
brand:
  name: Launch Control Labs
  tagline: "We build and run AI-powered software ventures"
  feel: [commanding, precise, alive, operational]
  anti-feel: [generic, corporate, playful, whimsical]

colors:
  background: "#0B1628"
  deep: "#060E1C"
  surface: "#0E1E38"
  text-primary: "#D4DCE8"
  text-secondary: "#8B9DB5"
  text-dim: "#5A7A9E"
  text-muted: "#3A5573"
  accent: "#E5A832"
  accent-dim: "rgba(229, 168, 50, 0.15)"
  screen-green: "#1a5c3a"
  screen-amber: "#FF8C00"
  emissive-hot: "#FF4D00"
  status-active: "#34D399"
  status-error: "#F87171"
  border: "#1A3055"
  border-subtle: "#12243F"

typography:
  heading: "IBM Plex Mono, monospace"
  heading-weight: 700
  heading-max: "clamp(2.5rem, 8vw, 7.5rem)"
  body: "Inter, system-ui, sans-serif"
  body-weight: 400
  mono: "IBM Plex Mono, monospace"
  mono-weight: 300
  base-size: 14px
  line-height: 1.7
  letter-spacing-tight: "-0.03em"
  letter-spacing-wide: "0.05em"

spacing:
  grid: 8px
  section-gap: "clamp(4rem, 10vh, 8rem)"
  content-max-width: 900px
  page-padding: "0 2rem"

borders:
  radius-sm: 4px
  radius-md: 8px
  radius-lg: 16px
  border-default: "1px solid rgba(229, 168, 50, 0.15)"
  border-active: "1px solid rgba(229, 168, 50, 0.6)"
  border-section: "1px solid #1A3055"

motion:
  duration-fast: 150ms
  duration-normal: 300ms
  duration-slow: 600ms
  easing: "cubic-bezier(0.16, 1, 0.3, 1)"
  scroll-smooth: true
  status-pulse: "2.5s ease infinite"

3d:
  tone-mapping: NoToneMapping
  antialias: false
  lighting: baked-only
  emissive-multiplier: 6-9
  post-processing: [bloom, vignette, noise, ACES-filmic]
  fog-color: "rgb(0.02, 0.03, 0.05)"

textures:
  noise-opacity: 0.025
  grid-opacity: 0.03
  grid-size: 200px
  backdrop-blur: 12px
---
```

## Design Philosophy

Launch Control Labs builds mission-critical software. The site communicates this through the language of **operational interfaces** — control rooms, telemetry panels, flight readiness dashboards. Every pixel earns its place by conveying status, capability, or readiness.

**Core Principles:**

1. **Operational, not decorative.** Every element exists because it communicates something. If it doesn't convey status, capability, or structure — it goes.

2. **Density over whitespace.** Information-rich layouts that reward attention. We are a Bloomberg terminal, not a meditation app. Tightly packed, readable, purposeful.

3. **Amber as signal, not decoration.** The accent color (#E5A832) appears only where the user's eye should go — active states, critical data, interaction prompts. It is a signal lamp, not a paintbrush.

4. **Mono is authority.** IBM Plex Mono for all structural text — headings, labels, navigation, data. Inter for body copy only where extended reading comfort matters. The monospace grid is the backbone.

5. **Texture proves materiality.** Subtle noise grain, grid overlays, backdrop blur — these aren't decoration. They prove the interface has physical depth. It exists in space, not on a flat plane.

6. **One animation maximum per viewport.** The status pulse dot. That's it. Everything else responds to user action only. No auto-playing carousels, no floating particles, no hover-state fireworks.

## What This Brand Feels Like

Imagine: 3am at NASA Johnson Space Center during a critical orbital insertion. The room is dark except for the glow of monitors. Information is everywhere but nothing is cluttered — every readout has a purpose, every indicator is in the right place, the ambient light is warm amber on deep midnight blue.

The people in this room are calm because they are competent. They don't need to announce their skill — the screens do it for them. The interface IS the proof of capability.

**Atmosphere:** Deep midnight. Warm amber glow. Subtle CRT texture. Information density without chaos.

**Rhythm:** Tight monospaced grids. Numbered lists. Hierarchical labels. Terminal prompt metaphors.

**Texture:** Film grain at 2.5% opacity. Grid lines at 3%. Glass-morphic panels. Edge-lit borders.

**Function:** Status indicators that pulse. Borders that separate concerns. Labels in screaming-small uppercase that orient without demanding attention.

## What To Avoid (Anti-Patterns)

These destroy the LCL identity. Flag instantly during design review:

| Pattern | Why It's Wrong |
|---------|---------------|
| Purple/violet gradients | AI startup slop. We are not an AI wrapper company. |
| `rounded-full` on containers | Bubbly, playful, anti-operational. Small pills only. |
| Stock photos from Unsplash | Generic. We show interfaces, not people-shaking-hands. |
| "Innovation", "Synergy", "Leverage" | Corporate buzzword vomit. Say what we actually do. |
| Centered text blocks > 3 lines | Control rooms left-align. Centered text is brochure-ware. |
| Heroicons everywhere | Default AI-generated UI indicator. Use system or custom only. |
| Feature grids (3x3 icon cards) | Template marketplace layout. We use numbered lists. |
| Shadow-xl on every card | Cheap depth trick. We use border + subtle background shift. |
| `bg-gradient-to-r from-purple to-blue` | The #1 indicator of AI-generated landing page. Nuclear ban. |
| "Get Started" / "Sign Up Today" | We don't have signups. We have `projects@launchcontrollabs.com`. |
| Testimonial carousels | Social proof theater. We show the work. |
| Animated counters ("10,000+ users!") | Vanity metrics. Not operational data. |
| Full-width hero images | Magazine layout. We are a terminal, not a billboard. |
| `text-transparent bg-clip-text` | Gradient text is 2023 AI slop shorthand. |
| Comic Sans, Poppins, Nunito | Wrong typeface universe entirely. |

## Typography Scale

All measurements on the 8px grid. Monospace is the default — Inter is the exception.

```
Label (section):   0.55rem / 0.3em tracking / uppercase / text-muted
Label (meta):      0.6rem  / 0.05em tracking / uppercase / text-dim
Body:              0.85rem / Inter / text-dim / 1.65 line-height
Body (large):      1rem    / Inter / text / 1.7 line-height  
Title:             1rem    / Plex Mono / 600 weight / tight tracking
Heading (h2):      clamp(1.4rem, 3vw, 2rem) / Plex Mono / 400 / tight
Heading (h1):      clamp(2.2rem, 5vw, 3.5rem) / Plex Mono / 400 / tight
Display:           clamp(2.5rem, 8vw, 7.5rem) / Plex Mono / 700 / tight
Number (accent):   1.8rem / Plex Mono / 300 / amber
```

## Component Rules

### Status Bar (Fixed Top)
- Font: 0.6rem uppercase, 0.05em tracking
- Background: `rgba(11, 22, 40, 0.85)` with `backdrop-filter: blur(12px)`
- Border: `1px solid var(--border-subtle)` bottom, plus amber shadow line
- Content: status dot (pulsing green) + system identifiers + timestamp

### Section Headers
- Use `.section-label` class: 0.55rem, 0.3em tracking, uppercase, text-muted
- Always left-aligned, never centered
- Serves as wayfinding, not decoration

### Capability Items
- Grid layout: number column (3.5rem) + content column
- Numbers: 1.8rem, mono, 300 weight, amber
- Titles: 1rem, 600 weight, tight tracking
- Descriptions: Inter, 0.85rem, text-dim

### Links & CTAs
- No buttons. Links only, with amber color and animated underline on hover
- Format: `text →` (with arrow)
- Email links are the primary CTA: `projects@launchcontrollabs.com →`

### Borders & Separators
- Use `var(--border)` (#1A3055) for section dividers
- 1px solid, full-width within content area
- Never use box-shadow for depth — use background color shift instead

### 3D Canvas Elements
- No border-radius on canvas containers
- Background must match `--bg-deep` (#060E1C)
- Post-processing: bloom + vignette + noise + ACES filmic tonemapping
- Emissive materials only — no dynamic lights
- Fog color matches deep background

### Color Usage Hierarchy
1. **Amber** — interactive elements, active states, signals, numbers
2. **Green** — status active, success states, live indicators only
3. **Red** — error states only, never decorative
4. **Text primary** — headings, primary content
5. **Text dim** — secondary content, descriptions
6. **Text muted** — labels, metadata, tertiary information
