# ESPN Visual Elevation — Final Verification & Cleanup

## TL;DR

> **Quick Summary**: Complete the Final Verification Wave that crashed mid-session due to EADDRINUSE on port 3005. Revert unnecessary turbopack config change, then run 4 parallel verification agents (plan compliance, code quality, visual QA, scope fidelity) across all 6 narrative sections on desktop + mobile.
> 
> **Deliverables**:
> - Reverted `next.config.ts` turbopack hack
> - Plan compliance audit (all Must Have / Must NOT Have verified)
> - Code quality review (build, lint, no AI slop)
> - Visual QA across Chrome desktop + mobile emulation (all 6 sections)
> - Scope fidelity check (all 20 commits match spec)
> - Deployment verification (Porkbun GitHub Actions flow)
> 
> **Estimated Effort**: Medium (5 tasks, ~30 min execution)
> **Parallel Execution**: YES — 2 waves
> **Critical Path**: Config revert → Start dev server → 4 parallel verifiers → Present results

---

## Context

### Original Request
Continuation of `espn-visual-elevation` plan (session `ses_1975c1a7cffecw7trNJzmxd5iq`). All 21 implementation tasks completed and committed. Session crashed during Final Verification Wave when the executing agent tried to start `npx next dev -p 3005` but port was already occupied. The agent then made an unnecessary `next.config.ts` change (adding `turbopack: { root: __dirname }`) as a red herring fix.

### Current State
- **Build**: ✅ Passes (`npm run build` → 0 errors, 6 static pages)
- **Git**: 20 implementation commits done. 1 uncommitted file: `next.config.ts` (turbopack root — needs revert)
- **Port 3005**: Now free
- **Unverified**: Visual rendering, scroll behavior, mobile responsiveness, deployment pipeline

### What the Original Plan Required for Final Verification
From `espn-visual-elevation.md` Wave FINAL:
- F1: Plan compliance audit
- F2: Code quality review
- F3: Real manual QA (full scroll, Chrome + Safari + mobile)
- F4: Scope fidelity check

---

## Work Objectives

### Core Objective
Revert the config hack, then verify the ESPN visual elevation work is production-ready across all axes: compliance, quality, visual fidelity, and deployment.

### Concrete Deliverables
- Clean `next.config.ts` (reverted to committed state)
- Evidence files in `.sisyphus/evidence/final-espn/`
- Consolidated verification report
- Confirmed deployment readiness

### Definition of Done
- [ ] `next.config.ts` reverted (no uncommitted changes)
- [ ] `npm run build` still passes after revert
- [ ] Dev server starts on port 3005 without error
- [ ] All 6 sections render 3D content (screenshot evidence)
- [ ] Mobile emulation shows graceful degradation
- [ ] No TypeScript errors, no `as any`, no commented-out code
- [ ] All "Must Have" from original plan present
- [ ] All "Must NOT Have" from original plan absent

### Must Have
- Visual proof (screenshots) of every section working
- Mobile screenshot showing tier system working
- Build passing after config revert
- All original plan constraints verified

### Must NOT Have (Guardrails)
- No code changes beyond the config revert (this is VERIFICATION only)
- No new features or "improvements" discovered during QA
- No deployment to production (verify config only, don't push)
- No modifications to any component files

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed.

### QA Policy
- **Visual**: Playwright opens localhost:3005, scrolls through all 6 sections, screenshots each
- **Mobile**: Playwright emulates iPhone 12, screenshots each section
- **Performance**: `npm run build` timing + Lighthouse if available
- **Code**: grep for forbidden patterns, TypeScript check
- Evidence saved to `.sisyphus/evidence/final-espn/`

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Setup — sequential, fast):
└── Task 1: Revert config + verify dev server starts [quick]

Wave 2 (Verification — MAX PARALLEL after server is up):
├── Task 2: Plan compliance audit [deep]
├── Task 3: Code quality review [unspecified-high]
├── Task 4: Visual QA — full scroll desktop + mobile [visual-engineering]
└── Task 5: Scope fidelity + deployment config check [unspecified-high]

-> Present consolidated results -> Get explicit user okay
```

### Dependency Matrix

| Task | Depends On | Blocks | Wave |
|------|-----------|--------|------|
| 1 | — | 2, 3, 4, 5 | 1 |
| 2 | 1 | — | 2 |
| 3 | 1 | — | 2 |
| 4 | 1 | — | 2 |
| 5 | 1 | — | 2 |

### Agent Dispatch Summary

- **Wave 1**: 1 task — T1 → `quick`
- **Wave 2**: 4 tasks — T2 → `deep`, T3 → `unspecified-high`, T4 → `visual-engineering` (+ `playwright` skill), T5 → `unspecified-high`

---

## TODOs

- [ ] 1. Revert Config + Start Dev Server

  **What to do**:
  - Run `git checkout -- next.config.ts` to discard the turbopack root change
  - Verify `npm run build` still passes (expect 0 errors)
  - Start dev server: `npx next dev -p 3005` in tmux session `lcl-dev`
  - Verify server responds: `curl -sI http://localhost:3005` returns 200
  - Leave server running for other tasks to QA against

  **Must NOT do**:
  - Do NOT make any other code changes
  - Do NOT install new packages

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: NO (must complete before Wave 2)
  - **Blocks**: Tasks 2, 3, 4, 5
  - **Blocked By**: None

  **References**:
  - `next.config.ts` — the file with uncommitted turbopack change to revert
  - Original committed version has `turbopack: {}` (empty object)

  **Acceptance Criteria**:

  **QA Scenarios:**

  ```
  Scenario: Config reverted and build passes
    Tool: Bash
    Steps:
      1. git checkout -- next.config.ts
      2. git status --short (expect clean working tree)
      3. npm run build 2>&1 | tail -5 (expect "Generating static pages" success)
    Expected Result: Exit code 0, no TypeScript errors, no uncommitted files
    Evidence: .sisyphus/evidence/final-espn/task-1-config-revert.txt

  Scenario: Dev server starts on port 3005
    Tool: interactive_bash (tmux)
    Steps:
      1. tmux new-session -d -s lcl-dev
      2. tmux send-keys -t lcl-dev "cd /Users/chikochingaya/Projects/launchcontrollabs.com && npx next dev -p 3005" Enter
      3. Wait 10s for compilation
      4. curl -sI http://localhost:3005 (expect HTTP 200)
    Expected Result: Server running, responds with 200 status
    Failure Indicators: EADDRINUSE, compilation hang >30s, non-200 response
    Evidence: .sisyphus/evidence/final-espn/task-1-server-start.txt
  ```

  **Commit**: NO

---

- [ ] 2. Plan Compliance Audit

  **What to do**:
  Read the original plan (`espn-visual-elevation.md`) end-to-end. For each "Must Have":
  - Verify implementation exists (read file, check component, grep for feature)
  - Pixar narrative arc (each section causes the next) — check section order + content
  - ESPN-scale typography (headlines at 13vw+) — grep for font-size values
  - 3D asset per section — verify each section loads a model
  - Bold monochromatic color per section — check CSS variables
  - Mobile-functional — verify device tier code exists
  - Single-canvas architecture — verify one Canvas component
  - Lazy-load secondary models — verify Suspense/lazy patterns
  - Dispose GPU resources — verify dispose calls on scroll exit

  For each "Must NOT Have":
  - No custom shaders — grep for `ShaderMaterial`, `RawShaderMaterial`
  - No new particle systems beyond hero — check for new particle components
  - No horizontal scroll — grep for `overflow-x: scroll`
  - No scroll hijacking — verify GSAP doesn't override native scroll
  - No CSS scroll-snap — grep for `scroll-snap`
  - No extra fonts beyond 4 declared — check next/font imports

  **Must NOT do**:
  - Do NOT fix issues found — just report them
  - Do NOT modify any files

  **Recommended Agent Profile**:
  - **Category**: `deep`
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES (Wave 2, with Tasks 3, 4, 5)
  - **Blocked By**: Task 1

  **References**:
  - `.sisyphus/plans/espn-visual-elevation.md` — the original plan with all Must Have / Must NOT Have
  - `src/components/3d/` — all 3D components
  - `src/app/page.tsx` — main page composition
  - `src/app/globals.css` — CSS variables and theme

  **Acceptance Criteria**:

  **QA Scenarios:**

  ```
  Scenario: All "Must Have" items verified present
    Tool: Bash (grep + read)
    Steps:
      1. Read espn-visual-elevation.md "Must Have" section
      2. For each item, grep/read codebase for evidence
      3. Produce checklist: ITEM | FILE:LINE | PASS/FAIL
    Expected Result: All items PASS (present in codebase)
    Evidence: .sisyphus/evidence/final-espn/task-2-must-have.txt

  Scenario: All "Must NOT Have" items verified absent
    Tool: Bash (grep)
    Steps:
      1. grep -r "ShaderMaterial\|RawShaderMaterial" src/ (expect 0 matches)
      2. grep -r "scroll-snap" src/ (expect 0 matches)
      3. grep -r "overflow-x.*scroll" src/ (expect 0 matches)
      4. Check font imports — only Anton, Space Grotesk, Inter, IBM Plex Mono
    Expected Result: Zero forbidden patterns found
    Failure Indicators: Any grep match = violation
    Evidence: .sisyphus/evidence/final-espn/task-2-must-not-have.txt
  ```

  **Commit**: NO

---

- [ ] 3. Code Quality Review

  **What to do**:
  - Run `npm run build` — confirm 0 errors
  - Run `npx tsc --noEmit` — confirm 0 TypeScript errors
  - Grep for AI slop patterns:
    - `as any` / `@ts-ignore` / `@ts-expect-error`
    - Empty catch blocks (`catch {}` or `catch (e) {}`)
    - `console.log` in production code (not commented)
    - Commented-out code blocks (>3 lines)
    - Unused imports (TypeScript will catch most)
  - Check for leftover debug artifacts from the crashed session
  - Verify no `.env` or secrets committed

  **Must NOT do**:
  - Do NOT fix issues — just report them
  - Do NOT run `npm install` or modify dependencies

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES (Wave 2, with Tasks 2, 4, 5)
  - **Blocked By**: Task 1

  **References**:
  - `src/` — all source files
  - `package.json` — dependencies and scripts
  - `tsconfig.json` — TypeScript config

  **Acceptance Criteria**:

  **QA Scenarios:**

  ```
  Scenario: Build and TypeScript pass cleanly
    Tool: Bash
    Steps:
      1. npm run build (expect exit 0)
      2. npx tsc --noEmit (expect exit 0)
    Expected Result: Zero errors on both commands
    Evidence: .sisyphus/evidence/final-espn/task-3-build.txt

  Scenario: No AI slop patterns in source
    Tool: Bash (grep)
    Steps:
      1. grep -rn "as any" src/ --include="*.ts" --include="*.tsx" | wc -l
      2. grep -rn "@ts-ignore\|@ts-expect-error" src/ | wc -l
      3. grep -rn "console\.log" src/ --include="*.ts" --include="*.tsx" | grep -v "// debug" | wc -l
      4. grep -rn "TODO\|FIXME\|HACK" src/ | wc -l
    Expected Result: as any=0, ts-ignore=0, console.log=0 (or minimal justified)
    Failure Indicators: >3 instances of any pattern = needs review
    Evidence: .sisyphus/evidence/final-espn/task-3-slop-check.txt
  ```

  **Commit**: NO

---

- [ ] 4. Visual QA — Full Scroll Desktop + Mobile

  **What to do**:
  - Open `http://localhost:3005` in Playwright (Chrome)
  - Wait for 3D canvas to render (wait for `canvas` element + 2s settle time)
  - Screenshot hero section (Section 1 "The Promise")
  - Scroll to Section 2 "The Problem" — screenshot
  - Scroll to Section 3 "The Guide" — screenshot
  - Scroll to Section 4 "The Proof" — screenshot
  - Scroll to Section 5 "The Authority" — screenshot
  - Scroll to Section 6 "The Orbit" — screenshot
  - Verify section navigation dots are visible and updating
  - Switch to iPhone 12 emulation (390x844)
  - Screenshot hero on mobile
  - Scroll through all sections on mobile — screenshot each
  - Verify no horizontal overflow on mobile
  - Check `prefers-reduced-motion` mode: set media feature, reload, screenshot hero

  **Must NOT do**:
  - Do NOT modify any files
  - Do NOT judge design taste — only verify rendering (no blank screens, no errors)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: `["playwright-e2e"]`

  **Parallelization**:
  - **Can Run In Parallel**: YES (Wave 2, with Tasks 2, 3, 5)
  - **Blocked By**: Task 1 (needs dev server running)

  **References**:
  - `src/app/page.tsx` — main page with section composition
  - `src/components/3d/ControlRoomScene.tsx` — hero 3D scene
  - Original plan section descriptions for expected content per section
  - Dev server at `http://localhost:3005`

  **Acceptance Criteria**:

  **QA Scenarios:**

  ```
  Scenario: All 6 sections render on desktop
    Tool: Playwright
    Preconditions: Dev server running on localhost:3005
    Steps:
      1. Navigate to http://localhost:3005
      2. Wait for selector "canvas" (timeout: 15s)
      3. Wait 3s for 3D to initialize
      4. Screenshot viewport → section-1-desktop.png
      5. Scroll down by window.innerHeight * 1.5
      6. Wait 2s → screenshot → section-2-desktop.png
      7. Repeat for sections 3-6
    Expected Result: 6 screenshots, each showing distinct section content (not blank)
    Failure Indicators: Blank canvas, error overlay, missing text, white screen
    Evidence: .sisyphus/evidence/final-espn/section-{1-6}-desktop.png

  Scenario: Mobile renders with graceful degradation
    Tool: Playwright (iPhone 12 emulation: 390x844)
    Steps:
      1. Set viewport to 390x844, device scale 3
      2. Navigate to http://localhost:3005
      3. Wait for content (may be static fallback on mobile)
      4. Screenshot hero → section-1-mobile.png
      5. Scroll through all sections, screenshot each
      6. Check document.documentElement.scrollWidth <= 390 (no horizontal overflow)
    Expected Result: All sections visible, no overflow, text readable
    Evidence: .sisyphus/evidence/final-espn/section-{1-6}-mobile.png

  Scenario: Reduced-motion shows static fallback
    Tool: Playwright
    Steps:
      1. Set prefers-reduced-motion: reduce
      2. Navigate to http://localhost:3005
      3. Wait 3s
      4. Screenshot → reduced-motion.png
      5. Verify no animation (static content visible)
    Expected Result: Static content renders without 3D animation
    Evidence: .sisyphus/evidence/final-espn/reduced-motion.png
  ```

  **Commit**: NO

---

- [ ] 5. Scope Fidelity + Deployment Config Check

  **What to do**:
  - Review all 20 git commits (`git log --oneline -20`)
  - For each commit: verify message matches actual diff (`git show --stat <sha>`)
  - Check no unrelated files were modified (only `src/`, `public/models/`, `.sisyphus/`, config files)
  - Verify deployment config:
    - `.github/workflows/` exists with deploy workflow
    - Workflow references correct branch and Porkbun settings
    - `output: 'export'` in `next.config.ts` (static export for Porkbun)
  - Verify `package.json` scripts still work: `build` command present
  - Check that no secrets/API keys are committed (grep for common patterns)

  **Must NOT do**:
  - Do NOT run deployment
  - Do NOT modify workflow files

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES (Wave 2, with Tasks 2, 3, 4)
  - **Blocked By**: Task 1

  **References**:
  - `git log --oneline -25` — full commit history for the elevation work
  - `.github/workflows/` — deployment config
  - `next.config.ts` — static export config
  - `package.json` — build scripts

  **Acceptance Criteria**:

  **QA Scenarios:**

  ```
  Scenario: All commits are scoped correctly
    Tool: Bash (git)
    Steps:
      1. git log --oneline -20 | list all commits
      2. For each: git show --stat <sha> — verify files are in expected directories
      3. Flag any commit touching files outside src/, public/models/, .sisyphus/, config
    Expected Result: All commits scoped to expected directories
    Failure Indicators: Commits modifying unrelated areas (e.g., node_modules, .env)
    Evidence: .sisyphus/evidence/final-espn/task-5-scope.txt

  Scenario: Deployment config is valid
    Tool: Bash (read + grep)
    Steps:
      1. ls .github/workflows/ — verify deploy workflow exists
      2. Read workflow file — check trigger branch, build command, deploy step
      3. Verify next.config.ts has output: 'export'
      4. grep -r "API_KEY\|SECRET\|PASSWORD\|TOKEN" src/ .github/ (expect 0 matches outside .env.example)
    Expected Result: Valid workflow, static export configured, no secrets
    Evidence: .sisyphus/evidence/final-espn/task-5-deploy-config.txt
  ```

  **Commit**: NO

---

## Final Verification Wave

> After ALL 5 tasks complete, present consolidated results to user.
> Wait for explicit "okay" before considering work complete.
> If ANY task reports a FAIL — list failures clearly and ask user how to proceed.

**Consolidated Report Format:**
```
## ESPN Final Verification Results

| Task | Verdict | Key Findings |
|------|---------|-------------|
| T1: Config Revert | PASS/FAIL | ... |
| T2: Plan Compliance | PASS/FAIL | Must Have: X/X, Must NOT Have: X/X |
| T3: Code Quality | PASS/FAIL | Build: ✅, TS: ✅, Slop: N issues |
| T4: Visual QA | PASS/FAIL | Desktop: X/6, Mobile: X/6 |
| T5: Scope + Deploy | PASS/FAIL | Commits: X clean, Deploy: configured |

**Overall**: READY / NOT READY for production

[If NOT READY]: Here are the specific issues to address...
```

---

## Commit Strategy

- **No commits in this plan** — this is verification only
- The one "change" (Task 1 config revert) restores the file to its committed state

---

## Success Criteria

### Verification Commands
```bash
git status            # Expected: clean working tree
npm run build         # Expected: exit 0, 0 errors
curl -sI localhost:3005  # Expected: HTTP 200
```

### Final Checklist
- [ ] Config reverted, build passes
- [ ] All "Must Have" from original plan verified present
- [ ] All "Must NOT Have" verified absent
- [ ] All 6 sections render visually (desktop + mobile screenshots)
- [ ] No AI slop or debug artifacts
- [ ] Deployment config valid
- [ ] User gives explicit "okay"
