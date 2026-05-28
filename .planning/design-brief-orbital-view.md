# LCL Design Brief: "The Orbital View"
## Direction B — Confirmed 2026-05-25

---

## Concept Summary

The site IS an orbital descent. You begin in space — looking down at a network of interconnected operations rendered as a constellation. As you scroll, you descend through the atmosphere, the network grows clearer, and you enter the operational layer where each mission becomes explorable.

**Core Metaphor**: LCL doesn't scramble on the ground — it oversees from above, descending precisely into each operation when needed.

**Emotional Arc**: Awe (vastness) → Intrigue (what are those nodes?) → Descent (entering) → Understanding (missions revealed) → Action (let's work together)

---

## Scroll Map (Frame-by-Frame)

### Frame 1: Deep Space (scroll 0% — first viewport)
**What you see:**
- Pure black with subtle star field (particles)
- LCL logo small and precise, top-left
- Navigation minimal, top-right (barely visible)
- Center: thin white text appears letter-by-letter:
  `LAUNCH CONTROL LABS`
- Below it, fading in: `Operations infrastructure for AI-native ventures`
- Far below viewport: faint blue glow suggesting something is down there
- A subtle "scroll to descend" indicator at bottom

**Mood**: Silent. Vast. You're in the void above everything.
**Tech**: R3F particle system (instanced meshes), GSAP text animation

### Frame 2: The Network Reveals (scroll 10-30%)
**What you see:**
- Stars begin to drift past (parallax — you're moving)
- Below you, a constellation network FADES IN:
  - 3-4 primary nodes (amber/gold glow) connected by thin blue lines
  - Smaller secondary nodes (dimmer) forming a web
  - The network slowly rotates (alive, not static)
- Text overlay fades out as the visual takes over
- Speed sensation increases (stars move faster)

**Mood**: Something is emerging from the dark. Pattern recognition kicks in.
**Tech**: Custom GLSL particle connections, instanced line geometry, camera z-translate via ScrollTrigger

### Frame 3: Atmospheric Entry (scroll 30-50%)
**What you see:**
- Camera accelerates downward
- Edge glow appears (atmospheric friction — orange/amber at viewport edges)
- Stars streak into lines (hyperspace aesthetic, subtle)
- The network below grows larger — nodes becoming visible as distinct elements
- Each node now has a label appearing: `MSN-001`, `MSN-002`, `MSN-003`
- Faint grid lines appear below (like a HUD)

**Mood**: Entering the operational layer. Commitment. You're going IN.
**Tech**: Post-processing bloom intensifies, custom edge-glow shader, camera acceleration curve

### Frame 4: The Operations Layer (scroll 50-70%)
**What you see:**
- Camera slows dramatically (deceleration into hover)
- You're now ABOVE the network, looking down at it
- Each node is clearly visible:
  - **MSN-001: Talisman** — Accounting intelligence platform
  - **MSN-002: Familiar** — AI operating layer
  - **MSN-003: HomeMeds** — Medication management
- Thin data lines pulse between nodes (showing activity)
- A HUD overlay fades in around the edges:
  - Top-left: `SYSTEMS: OPERATIONAL`
  - Top-right: `VENTURES: 3 ACTIVE`
  - Bottom: capability indicators (AI · Infrastructure · Growth · Operations)

**Mood**: Command position. You see everything. Confidence in the view.
**Tech**: HTML overlay via Drei's Html component, node meshes with custom glow shader, pulse animation on lines

### Frame 5: Mission Focus (scroll 70-85%)
**What you see:**
- On hover/proximity, a node EXPANDS:
  - Grows 3x in size
  - A card/panel unfolds from it showing:
    - Mission name
    - One-line description
    - Status indicator (ACTIVE / BUILDING / SCALING)
    - Key metric or insight
- Other nodes dim slightly (focus)
- Mouse movement at this stage = gentle orbital rotation around the network

**Mood**: Zooming in on the detail. Each mission is real, trackable, alive.
**Tech**: Raycaster for hover detection, animated scale/opacity, Html overlay positioned in 3D space

### Frame 6: The Invitation (scroll 85-100%)
**What you see:**
- The network subtly moves to the upper portion of the viewport
- Below it, a clean panel emerges (2D over 3D):
  - `"Ready to launch your next venture?"`
  - Brief capability summary (4 items, one line each)
  - CTA: `[ Initiate Contact ]` — amber/gold, distinct
  - Below: `or view our operational playbook →`
- The 3D network continues living above — ambient animation, pulses
- Footer elements fade in

**Mood**: The transition from awe to action. Clear, confident, no pressure.
**Tech**: Mixed 2D/3D composition, GSAP fade-in sequence, the 3D layer continues rendering above

---

## Technical Architecture

### Stack
```
Next.js 14 (App Router)
├── React Three Fiber (3D rendering)
│   ├── Drei (helpers: Html, Stars, Line, Environment)
│   ├── Custom GLSL shaders (glow, particles, edge effects)
│   └── Post-processing (bloom, chromatic aberration, vignette)
├── GSAP + ScrollTrigger (scroll-to-3D binding)
├── Tailwind CSS (2D UI elements)
└── Framer Motion (2D transitions)
```

### Performance Strategy
- Progressive loading: HTML content renders FIRST (SEO + LCP)
- 3D initializes AFTER first paint (not blocking)
- Star field: instanced meshes (one draw call, 2000+ particles)
- Network: instanced line geometry + custom shader
- Nodes: low-poly icosahedrons with emissive material
- Mobile fallback: 2D animated version (parallax stars + CSS nodes)
- devicePixelRatio capped at 1.5 on mobile
- Render loop pauses when off-screen (IntersectionObserver)
- Target: 60fps on iPhone 14+, 30fps acceptable on older devices

### Asset Budget
- Total 3D assets: < 500KB (geometry is procedural, not modeled)
- Textures: minimal (noise textures for stars, gradient for atmosphere)
- No heavy Blender models — this is a PROCEDURAL scene
- Load time target: < 3s on 4G

### Accessibility Fallback
- All content available as standard HTML (3D is progressive enhancement)
- `prefers-reduced-motion` → static version with fade-ins only
- Screen readers get full semantic content
- Skip-intro button always available

---

## Color System

| Role | Color | Usage |
|---|---|---|
| Void | `#050510` | Background, deep space |
| Space | `#0a0f1e` | Midground, atmospheric |
| Primary | `#3b82f6` | Network lines, subtle accents |
| Mission | `#f59e0b` | Node glow, mission indicators |
| Alert | `#22c55e` | Status: operational |
| Text | `#e2e8f0` | Primary text |
| Muted | `#64748b` | Secondary text, labels |

---

## Typography

| Element | Font | Size | Weight |
|---|---|---|---|
| Logo | Geist Mono or custom | 14px | 500 |
| Hero headline | Geist Sans | 72-96px | 200 (ultralight) |
| HUD labels | Geist Mono | 10-11px | 400 |
| Node labels | Geist Mono | 12px | 500 |
| Body | Geist Sans | 16px | 400 |
| CTA | Geist Sans | 16px | 500 |

Ultralight headline against deep space = the "quiet authority" feel.
Monospace for operational data = precision without trying too hard.

---

## Signature Moment Definition

**The Descent (Frame 3)**

This is the ONE thing people will screenshot and share:
- The moment you scroll and the camera DROPS through the atmosphere
- Stars streak past. Edge glow intensifies. Speed sensation.
- Then sudden deceleration as you arrive at the network
- The emotional shift: from floating → COMMITTED → in control

**Implementation detail:**
- Camera easing: exponential acceleration (0.5s), then cubic deceleration
- Star streak: elongate particle geometry along z-axis during descent
- Edge glow: fragment shader with vignette that intensifies with speed
- Sound design (optional): subtle wind → silence on arrival
- Total descent duration: ~2 seconds of scroll (user controls speed)

---

## What We're NOT Doing

- ❌ No literal Earth model (too cliché, too "space startup")
- ❌ No astronaut imagery
- ❌ No generic floating shapes
- ❌ No loading screen longer than 2s
- ❌ No forced intro animation that can't be skipped
- ❌ No WebGL-only content (everything accessible without it)
- ❌ No hover-only interactions on mobile
- ❌ No sound by default

---

## Implementation Phases

### Phase 1: Foundation (Week 1-2)
- Set up R3F + Next.js integration
- Procedural star field with instanced meshes
- Basic camera path bound to scroll
- Static constellation network (no interaction yet)

### Phase 2: The Descent (Week 2-3)
- Atmospheric entry effect (edge glow, star streaks)
- Camera easing and deceleration
- Post-processing pipeline (bloom, vignette)
- Network reveal animation

### Phase 3: Interaction Layer (Week 3-5)
- Node hover/expand with mission data
- HUD overlay elements
- HTML-in-3D integration for mission cards
- Mouse-driven subtle orbital rotation

### Phase 4: Polish + CTA (Week 5-6)
- 2D/3D composition for bottom section
- CTA section design
- Performance optimization pass
- Mobile fallback implementation
- Accessibility audit

### Phase 5: Ship (Week 6-7)
- Cross-browser testing
- Performance profiling on real devices
- Content review (copy, data accuracy)
- Deploy to Vercel
- Lighthouse audit (target: 90+)

---

## Success Metrics (from Mental Model)

- [ ] Custom 3D/WebGL environment as primary experience ✓ (procedural orbital scene)
- [ ] Scrolling navigates THROUGH the environment ✓ (descent mechanic)
- [ ] At least one element responds memorably ✓ (the descent + node interaction)
- [ ] Visitor can describe the EXPERIENCE ✓ ("I descended from space into their operations")
- [ ] Information architecture clear ✓ (missions visible as nodes, CTA at bottom)
- [ ] Performance: progressive, fallback for weak devices ✓ (planned)
- [ ] Award-submission-worthy craft ✓ (target)
- [ ] Screenshot-worthy moment ✓ (the atmospheric descent)
