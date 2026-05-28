# Session Mental Model: Launch Control Labs Website

## Status: CONFIRMED (2026-05-25)
## Gate: H71 — Approved for execution

---

## 1. Shared Understanding (What We Both Agree On)

- LCL is a technical operations studio that builds and runs AI-powered software ventures
- Current site is at ~5-6/10 — structure is right but CRAFT isn't there
- Existing stack: Next.js + GSAP + Framer Motion (good foundation)
- The site has: Hero, Capabilities (01-04 with amber), Mission Cards, Mission Narrative
- What's broken: dead space, flat/monochrome, textures not rendering, scroll triggers not firing, CTA basic
- The code is NOT the problem — the VISION was never properly defined before coding

## 2. Quality Bar (What "Great" Looks Like HERE)

### Primary Reference: basement.studio
- **What to take**: Full 3D immersive environment that IS the site, not decoration on a site
- **What to take**: "Scroll to Explore" mechanic — the page IS an explorable space
- **What to take**: Environmental storytelling — objects, lighting, atmosphere tell the brand story
- **What to take**: The feeling of entering a PLACE, not reading a page

### Reference: Shopify Editions (Winter 2026)
- **What to take**: Bold art direction with a clear concept (Renaissance)
- **What to take**: Every element serves the theme — not generic components
- **What to take**: Willingness to be SURPRISING and memorable

### Reference: dao.design
- **What to take**: Dark + product showcasing in 3D perspective
- **What to take**: Services listed with intentional spacing on the right
- **What to take**: Moody lighting with warm accent (orange CTA)

### Reference: Ouro Labs
- **What to take**: MASSIVE confident typography
- **What to take**: CSSDA quality / award-worthy craft
- **What to take**: Simplicity of message — few words, maximum impact

### Reference: CommonVow
- **What to take**: Editorial grid structure with diagonal lines
- **What to take**: Typography-as-design (the layout IS the design)
- **What to take**: Confidence to let space breathe with purpose

### Anti-references (what LCL is NOT):
- NOT Vercel (too minimal, too empty)
- NOT a SaaS landing page (no feature grid, no pricing)
- NOT a blog (no walls of text)
- NOT a template (nothing that could be swapped with another company name)

## 3. Emotional Target (How It Should FEEL)

- **First 3 seconds**: "Holy shit, these people are operating at a different level" — intimidation + respect
- **After 30 seconds**: Exploring, discovering, wanting to see what's deeper
- **The signature moment**: A 3D/WebGL interactive element (mission control panel, satellite array, operations center) that responds to user interaction
- **Overall atmosphere**: Walking into a high-tech operations center — you feel the competence before anyone says a word

## 4. Specificity Anchors (Turning Vague → Concrete)

| Vague Term | What We Actually Mean | Visual Proof |
|---|---|---|
| "interactive" | An explorable 3D scene you navigate, like basement.studio | basement.studio hero |
| "mission control" | A spatial environment with consoles, data, activity — not a flat dashboard mockup | SpaceX launch control aesthetic |
| "8/10" | Awwwards/CSSDA nominee quality — custom WebGL, unique interaction, award-worthy craft | basement.studio, ouro-labs |
| "cinematic" | Spatial depth, lighting, camera movement through a 3D environment | basement.studio scroll experience |
| "operational" | Real-time data, blinking indicators, status readouts embedded in the 3D scene | Not a flat metrics page — embedded in environment |

## 5. Vocabulary Alignment (Shared Language)

- "The scene" = the 3D WebGL environment that IS the hero/main experience
- "Explore" = user scrolls or moves mouse to navigate through the 3D space
- "Mission control" = the visual metaphor — an operations center as 3D environment
- "Signature moment" = the single screenshot-worthy 3D interactive element
- "Craft" = pixel-level attention to lighting, materials, textures, transitions
- "Direction D" = the original concept (live mission control + cinematic narrative) — now with actual 3D execution

## 6. Scope Boundaries (What We're NOT Doing)

- ❌ NOT another dark page with text and scroll animations
- ❌ NOT flat 2D components styled to look "techy"
- ❌ NOT a feature grid or SaaS template
- ❌ NOT over-the-top to the point visitors can't find information
- ❌ NOT so experimental it's unclear what LCL does (balance art + clarity)
- ✅ MUST still communicate: what LCL is, what it does, how to get in touch
- ✅ MUST load fast enough to not lose visitors (progressive enhancement)

## 7. Success Criteria (How We'll Know We're Done)

- [ ] Site has a custom 3D/WebGL environment as the primary experience
- [ ] Scrolling/interaction navigates THROUGH the environment (not just past flat sections)
- [ ] At least one element responds to mouse/interaction in a memorable way
- [ ] A visitor could describe what they experienced (not just what they read)
- [ ] Information architecture is still clear (what LCL does, capabilities, contact)
- [ ] Performance: loads progressively, fallback for weak devices
- [ ] Award-submission-worthy craft (CSSDA/Awwwards level)
- [ ] Someone would screenshot and share the 3D interaction

---

## Next Step: Stylescapes

User requested 2-3 visual directions (stylescapes) before any code.
These should explore different takes on the 3D mission control concept:

1. **Direction A: "The Control Room"** — Walk into a literal 3D control room with consoles, screens, data
2. **Direction B: "The Orbital View"** — Space/satellite aesthetic, looking down at operations from above
3. **Direction C: "The Basement"** — basement.studio-inspired dark environment with LCL-specific objects

Each stylescape needs: mood, palette, 3D style reference, interaction model, signature moment.
