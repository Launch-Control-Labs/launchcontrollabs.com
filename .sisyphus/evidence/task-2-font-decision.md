# Task 2: Font Validation Decision

**Date:** May 27, 2026  
**Spike:** Font Comparison at ESPN Editorial Scale (13vw)  
**Status:** ✅ COMPLETE

---

## Executive Summary

Validation spike created at `/spike/fonts` comparing **Space Grotesk (Bold 700)**, **Anton (Regular 400)**, and **Bebas Neue (Current)** at ESPN-scale display sizing (`clamp(4.5rem, 13vw, 13rem)`).

**Key Finding:** Space Grotesk Bold is **insufficient** for hero-scale display. **Anton** is the clear winner for primary display typography.

---

## Validation Results

### 1. Space Grotesk (Bold 700)
- **Geometry:** Geometric, space-themed DNA ✓
- **Weight at 13vw:** Adequate but **noticeably lighter** than competitors
- **Presence:** Good for subheads/section headers, **insufficient for hero scale**
- **Verdict:** ❌ **NOT suitable as primary display font**
- **Use Case:** Secondary display, section headers, editorial subheads

### 2. Anton (Regular 400)
- **Geometry:** Ultra-bold condensed, maximum impact
- **Weight at 13vw:** **DOMINATES the screen** — exactly what ESPN demands
- **Presence:** Unmatched visual authority at any scale
- **Verdict:** ✅ **IDEAL for primary display font**
- **Use Case:** Hero headlines, mission-critical messaging, primary display

### 3. Bebas Neue (Current Baseline)
- **Geometry:** Strong presence, dated feel
- **Weight at 13vw:** Comparable to Anton, but visually tired
- **Presence:** Good, but needs replacement
- **Verdict:** ⚠️ **Needs replacement** — outdated aesthetic

---

## Viewport Scale Verification

| Viewport | 13vw Calculation | Actual Size |
|----------|------------------|-------------|
| 1440px   | 1440 × 0.13      | ~187px      |
| 768px    | 768 × 0.13       | ~100px      |
| 375px    | 375 × 0.13       | ~49px       |

All fonts tested at `clamp(4.5rem, 13vw, 13rem)` with:
- **Background:** #080810 (Alpine palette)
- **Text:** #E5EBF2 (light)
- **Letter-spacing:** -0.02em (tight)
- **Line-height:** 1.1 (compact)

---

## Recommendation for Task 4 (Typography System)

### Primary Display Font: **ANTON**
- Use for: Hero headlines, mission-critical messaging, primary display
- Weight: Regular 400 (only weight available)
- Scale: `clamp(4.5rem, 13vw, 13rem)` for hero, `clamp(2rem, 6vw, 4rem)` for section headers
- Fallback: Impact, sans-serif

### Secondary Display Font: **SPACE GROTESK**
- Use for: Section headers, editorial subheads, accent typography
- Weight: Bold 700 (for presence), Regular 400 (for lighter touch)
- Scale: `clamp(1.5rem, 4vw, 2.5rem)` for subheads
- Benefit: Variable font allows weight flexibility, space-themed aesthetic

### Body Font: **INTER** (keep current)
- No changes needed — Inter performs well at body scale

---

## Implementation Notes for Task 4

1. **Import both fonts in layout.tsx:**
   ```typescript
   import { Anton, Space_Grotesk } from 'next/font/google'
   
   const anton = Anton({
     subsets: ['latin'],
     weight: ['400'],
     variable: '--font-anton',
   })
   
   const spaceGrotesk = Space_Grotesk({
     subsets: ['latin'],
     weight: ['400', '700'],
     variable: '--font-space-grotesk',
   })
   ```

2. **Update CSS variables in globals.css:**
   ```css
   --font-display: var(--font-anton), 'Impact', sans-serif;
   --font-display-secondary: var(--font-space-grotesk), 'Trebuchet MS', sans-serif;
   ```

3. **Remove Bebas Neue from Google Fonts import** in globals.css

4. **Test at all three viewport widths** before shipping

---

## Evidence

- **Spike Page:** `/spike/fonts` (live at http://localhost:3005/spike/fonts)
- **Test Texts:** "LAUNCH CONTROL", "MISSION COMPLETE", "FROM IDEA TO ORBIT"
- **Viewports Tested:** 1440px, 768px, 375px
- **Background:** #080810 (Alpine palette)

---

## Next Steps

1. ✅ Task 2 complete — font validation done
2. → Task 4: Implement typography system with Anton + Space Grotesk
3. → Task 5: Apply typography to editorial redesign
4. → Task 6: Visual elevation review

---

**Decision:** Proceed with **Anton** as primary display font and **Space Grotesk** as secondary display font. Remove Bebas Neue.
