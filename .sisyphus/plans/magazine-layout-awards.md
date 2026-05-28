# Magazine Layout + Awards Section

## TL;DR

> **Quick Summary**: Redesign projects section as editorial magazine layout with varied visual weight, and add awards section showcasing Webby, TWIF, Product Hunt, and Awwwards recognition.
> 
> **Deliverables**:
> - Redesigned `MissionCards.tsx` with editorial magazine feel
> - New `Awards.tsx` component with 4 award badges
> - Updated `page.tsx` wiring
> 
> **Estimated Effort**: Medium (2 tasks, ~30 min implementation)
> **Parallel Execution**: YES — 2 waves
> **Critical Path**: Task 1 + Task 2 (parallel) → Task 3 (wire + verify)

---

## Context

### Original Request
User wants projects section to feel like "magazine articles" — not uniform database cards. Also wants awards section added with team achievements (without naming specific client associations).

### Current State
- `src/components/MissionCards.tsx` renders all 6 projects as identical bordered cards in a vertical stack
- No awards section exists
- Design system uses CSS variables: `--font-mono`, `--text`, `--text-dim`, `--border`, `--accent`, `--green`
- All components use inline styles (no Tailwind, no CSS modules)
- Projects: Talisman, Helios, LCL, Option One Plumbing, Sky Boss, NPS.today
- No project detail pages (cards don't link anywhere)

### Awards to Include (DO NOT mention client/project associations)
| Award | Year | Category | Display As |
|-------|------|----------|-----------|
| Webby Award | 2023 | Apps & Software | "Webby Award Winner" |
| TWIF Awards | 2024 | Best New Startup | "Best New Startup — TWIF" |
| Product Hunt | 2024 | SaaS Product of the Week | "Product of the Week" |
| Awwwards | 2024 | Featured / Inspiration | "Awwwards Featured" |

### Metis Review Findings (Addressed)
- ✅ Responsive behavior specified (see acceptance criteria)
- ✅ Anti-slop guardrails added
- ✅ Award badge format pinned (typographic, not illustrations)
- ✅ Hover behavior defined (none — static editorial)
- ✅ Content inventory complete (6 projects with title, desc, stack, year, status)
- ✅ No existing links to preserve

---

## Work Objectives

### Core Objective
Transform the projects section from uniform database cards into an editorial magazine layout, and add an awards recognition section.

### Concrete Deliverables
- `src/components/MissionCards.tsx` — complete rewrite
- `src/components/Awards.tsx` — new file
- `src/app/page.tsx` — add Awards import + render

### Definition of Done
- [ ] `npm run build` exits 0
- [ ] All 6 projects visible in page source
- [ ] 4 awards visible in page source
- [ ] No TypeScript errors

### Must Have
- Featured project (Talisman) gets 2-3x the visual space of others
- Asymmetric grid: full-width → 2-up → 3-up (three tiers)
- Numbered entries (01, 02, 03...) for editorial sequencing
- "WORK" as section label (not "ACTIVE MISSIONS")
- "CLIENT WORK" sub-label separating internal products from client projects
- Awards as typographic badges (text-based, not illustrations)
- Responsive: 3-up collapses to 1-up below 768px, 2-up to 1-up below 640px
- All CSS variables from existing design system (no new colors/fonts)

### Must NOT Have (Guardrails)
- ❌ NO framer-motion, GSAP, or any animation library imports
- ❌ NO parallax scroll effects
- ❌ NO staggered reveal/fade-in animations
- ❌ NO intersection observers
- ❌ NO external fonts or asset imports (images, SVGs from CDN)
- ❌ NO card borders/outlines (use spacing + typography for hierarchy)
- ❌ NO carousel or slider for awards
- ❌ NO gradient backgrounds or decorative blobs
- ❌ NO changes to any file besides MissionCards.tsx, Awards.tsx, page.tsx
- ❌ NO mention of "Talisman", "OBWS", or any client name in awards section

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed.

### Test Decision
- **Infrastructure exists**: YES (Next.js build)
- **Automated tests**: None (UI component, verified via build)
- **Framework**: `npm run build`

### QA Policy
- Build must pass
- Grep for all project names + award names in build output
- Visual structure verified by checking rendered HTML structure

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately — both independent):
├── Task 1: Redesign MissionCards.tsx [visual-engineering]
└── Task 2: Create Awards.tsx component [quick]

Wave 2 (After Wave 1):
└── Task 3: Wire into page.tsx + verify build [quick]
```

### Dependency Matrix
| Task | Depends On | Blocks |
|------|-----------|--------|
| 1 | None | 3 |
| 2 | None | 3 |
| 3 | 1, 2 | — |

---

## TODOs

- [ ] 1. Redesign MissionCards.tsx as Editorial Magazine Layout

  **What to do**:
  Replace the entire `MissionCards.tsx` file with an editorial magazine layout that uses three tiers of visual weight:

  **Tier 1 — Featured (full width)**:
  - Talisman: number "01", large headline (`clamp(2.5rem, 6vw, 5rem)`), full description, tech tags, year, ACTIVE status
  - Uses full container width, generous vertical padding, border-bottom separator

  **Tier 2 — Two-up grid (medium projects)**:
  - Helios (02) + Launch Control Labs (03): side by side via `grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))`
  - Headlines at `clamp(1.8rem, 4vw, 3rem)`, shorter descriptions
  - Border-bottom separator after this tier

  **Tier 3 — Three-up grid (client work)**:
  - "CLIENT WORK" sub-label above
  - Option One (04), Sky Boss (05), NPS.today (06): compact cards in 3-column grid `repeat(auto-fit, minmax(240px, 1fr))`
  - Smallest headlines (`clamp(1.1rem, 2vw, 1.4rem)`), brief descriptions
  - Tech listed inline without borders (just text with · separators)

  **Section label**: "WORK" (using existing `.section-label` class)
  
  **Numbered entries**: Each project gets 01-06 in small mono type
  
  **Status indicators**: Keep the green dot for ACTIVE, accent dot for DEPLOYED
  
  **NO borders on any cards/articles** — only horizontal rule separators between tiers
  
  **Responsive behavior**:
  - Below 768px: 2-up grid becomes 1-up (stacked)
  - Below 640px: 3-up grid becomes 1-up (stacked)
  - Featured tier always full width (works at all sizes)
  - Use `minmax()` in grid so it auto-collapses

  **Data** (hardcoded in component, matching current pattern):
  ```
  1. Talisman — ACTIVE, 2024 — AI-powered accounting automation for modern finance teams. Graph-native architecture processing millions of transactions. — Next.js, Neo4j, LLMs
  2. Helios — ACTIVE, 2025 — Autonomous AI agent runtime with multi-agent orchestration. Built for production workloads. — TypeScript, Memgraph, R3F
  3. Launch Control Labs — DEPLOYED, 2026 — This site. Built with basement.studio's baked-lighting approach. WebGL meets mission control. — Next.js, Three.js, GSAP
  4. Option One Plumbing — DEPLOYED, 2025 — Full-range plumbing services platform. CSR and field worker coordination. — Next.js, Real-time, CRM
  5. Sky Boss — DEPLOYED, 2025 — Aviation operations management. Fleet tracking, maintenance, crew coordination. — React, Node.js, Real-time
  6. NPS.today — DEPLOYED, 2024 — Net Promoter Score platform. Automated survey distribution and analytics. — Next.js, Analytics, Automation
  ```

  **Must NOT do**:
  - No animation libraries
  - No card borders or backgrounds (except transparent hover is OK)
  - No intersection observers or scroll-triggered reveals
  - No image placeholders or gradient fills
  - No external asset imports

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: `["engineering"]`

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 2)
  - **Parallel Group**: Wave 1
  - **Blocks**: Task 3
  - **Blocked By**: None

  **References**:
  - `src/components/MissionCards.tsx` — current file to replace entirely
  - `src/components/Capabilities.tsx` — reference for numbered entry pattern and section-label class usage
  - `src/app/globals.css` — all CSS variables available (--font-mono, --text, --text-dim, etc.)

  **Acceptance Criteria**:
  - [ ] File compiles with no TypeScript errors
  - [ ] All 6 project names present in component
  - [ ] Three distinct visual tiers (check font-size differs between tiers)
  - [ ] No `border: 1px solid` on any article/card element
  - [ ] No animation library imports (grep for framer-motion, gsap)
  - [ ] Grid uses `auto-fit` + `minmax` for responsive collapse

  **QA Scenarios**:
  ```
  Scenario: All projects render with correct hierarchy
    Tool: Bash (grep)
    Steps:
      1. npm run build in ~/Projects/launchcontrollabs.com
      2. grep -c "Talisman\|Helios\|Launch Control\|Option One\|Sky Boss\|NPS.today" .next/server/app/page.html
    Expected Result: Count = 6 (all projects present)
    Evidence: .sisyphus/evidence/task-1-projects-render.txt

  Scenario: No forbidden patterns
    Tool: Bash (grep)
    Steps:
      1. grep -c "framer-motion\|gsap\|IntersectionObserver\|border.*1px.*solid" src/components/MissionCards.tsx
    Expected Result: Count = 0
    Evidence: .sisyphus/evidence/task-1-no-slop.txt
  ```

  **Commit**: YES (groups with Task 3)
  - Message: `feat(design): editorial magazine layout for projects section`
  - Files: `src/components/MissionCards.tsx`

---

- [ ] 2. Create Awards Section Component

  **What to do**:
  Create a new `src/components/Awards.tsx` file with a minimal awards recognition section.

  **Design approach** — typographic badges, NOT illustrations:
  ```
  RECOGNITION

  WEBBY AWARD        TWIF AWARDS           PRODUCT HUNT         AWWWARDS
  WINNER             BEST NEW STARTUP      PRODUCT OF THE WEEK  FEATURED
  2023               2024                  2024                 2024
  ```

  Each award is a compact typographic block:
  - Award name: small uppercase mono, letter-spaced, `var(--text-muted)`
  - Achievement: slightly larger, `var(--text)` or `var(--accent)`
  - Year: small, muted

  **Layout**: Horizontal row on desktop (4-up grid with `repeat(auto-fit, minmax(160px, 1fr))`), wraps to 2x2 on tablet, stacks on mobile.

  **Section styling**:
  - Section label: "RECOGNITION" (using `.section-label` pattern)
  - Minimal padding, border-top separator
  - Centered alignment for each badge block
  - Overall section has `text-align: center` feel

  **Full component**:
  ```tsx
  export default function Awards() {
    const awards = [
      { org: 'Webby Awards', achievement: 'Winner', year: '2023' },
      { org: 'TWIF', achievement: 'Best New Startup', year: '2024' },
      { org: 'Product Hunt', achievement: 'Product of the Week', year: '2024' },
      { org: 'Awwwards', achievement: 'Featured', year: '2024' },
    ]
    
    return (
      <section>
        <div className="page">
          <p className="section-label">RECOGNITION</p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 'clamp(2rem, 4vw, 3rem)',
            textAlign: 'center',
          }}>
            {awards.map((award) => (
              <div key={award.org}>
                <p style={{
                  fontSize: '0.6rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)',
                  marginBottom: 'var(--space-2)',
                }}>{award.org}</p>
                <p style={{
                  fontSize: 'clamp(0.85rem, 1.2vw, 1rem)',
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text)',
                  letterSpacing: '-0.01em',
                  marginBottom: 'var(--space-1)',
                }}>{award.achievement}</p>
                <p style={{
                  fontSize: '0.55rem',
                  letterSpacing: '0.1em',
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)',
                }}>{award.year}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  ```

  **Must NOT do**:
  - No mention of Talisman, OBWS, or any client name
  - No trophy/ribbon SVG illustrations
  - No external image imports
  - No animation on badges
  - No carousel/slider

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 1)
  - **Parallel Group**: Wave 1
  - **Blocks**: Task 3
  - **Blocked By**: None

  **References**:
  - `src/components/Capabilities.tsx` — section-label class usage pattern
  - `src/app/globals.css` — CSS variables

  **Acceptance Criteria**:
  - [ ] File exists at `src/components/Awards.tsx`
  - [ ] Contains all 4 awards (Webby, TWIF, Product Hunt, Awwwards)
  - [ ] Zero mentions of "Talisman" or "OBWS" or "Official Black Wall Street"
  - [ ] No external image/SVG imports
  - [ ] Exports default function component

  **QA Scenarios**:
  ```
  Scenario: Awards component has correct content
    Tool: Bash (grep)
    Steps:
      1. grep -c "Webby\|TWIF\|Product Hunt\|Awwwards" src/components/Awards.tsx
    Expected Result: Count >= 4
    Evidence: .sisyphus/evidence/task-2-awards-content.txt

  Scenario: No client names leaked
    Tool: Bash (grep)
    Steps:
      1. grep -ic "talisman\|obws\|black wall street" src/components/Awards.tsx
    Expected Result: Count = 0
    Evidence: .sisyphus/evidence/task-2-no-leak.txt
  ```

  **Commit**: YES (groups with Task 3)
  - Message: `feat(design): add awards recognition section`
  - Files: `src/components/Awards.tsx`

---

- [ ] 3. Wire Awards into Page + Final Verification

  **What to do**:
  - Add `import Awards from '@/components/Awards'` to `src/app/page.tsx`
  - Render `<Awards />` AFTER the projects section (`<MissionCards />`) and BEFORE the contact section (`<Contact />`)
  - Run full build verification
  - Commit all changes together

  **Must NOT do**:
  - No changes to any section besides the Awards insertion point
  - No reordering of existing sections

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 2 (sequential after Wave 1)
  - **Blocks**: None
  - **Blocked By**: Task 1, Task 2

  **References**:
  - `src/app/page.tsx` — current page structure showing section order

  **Acceptance Criteria**:
  - [ ] `npm run build` exits 0 with no errors
  - [ ] Awards component imported and rendered in page.tsx
  - [ ] Section order: StatusBar → CompanyTicker → 3D Scene → Capabilities → MissionCards → Awards → Contact → Footer

  **QA Scenarios**:
  ```
  Scenario: Full build passes
    Tool: Bash
    Steps:
      1. cd ~/Projects/launchcontrollabs.com && npm run build 2>&1 | tail -5
    Expected Result: "Compiled successfully" with exit code 0
    Evidence: .sisyphus/evidence/task-3-build.txt

  Scenario: Page renders all sections
    Tool: Bash (curl + grep)
    Steps:
      1. curl -s http://localhost:3005 | grep -c "WORK\|RECOGNITION\|READY TO LAUNCH"
    Expected Result: Count >= 3 (all major section labels present)
    Evidence: .sisyphus/evidence/task-3-sections.txt
  ```

  **Commit**: YES
  - Message: `feat(design): editorial magazine layout + awards section`
  - Files: `src/components/MissionCards.tsx`, `src/components/Awards.tsx`, `src/app/page.tsx`

---

## Commit Strategy

Single commit after all 3 tasks complete:
- `feat(design): editorial magazine layout + awards section`
- Files: MissionCards.tsx, Awards.tsx, page.tsx

---

## Success Criteria

### Verification Commands
```bash
cd ~/Projects/launchcontrollabs.com
npm run build        # Expected: exit 0, "Compiled successfully"
grep -c "Talisman\|Helios\|NPS.today" src/components/MissionCards.tsx  # Expected: >= 3
grep -c "Webby\|TWIF\|Product Hunt" src/components/Awards.tsx  # Expected: >= 3
grep -ic "talisman\|obws" src/components/Awards.tsx  # Expected: 0
```

### Final Checklist
- [ ] All "Must Have" present (magazine layout, 3 tiers, numbered, responsive)
- [ ] All "Must NOT Have" absent (no animations, no borders, no client names in awards)
- [ ] Build passes clean
- [ ] All 6 projects render
- [ ] All 4 awards render
