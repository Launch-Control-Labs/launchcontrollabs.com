#!/usr/bin/env npx tsx
/**
 * Launch Control Labs — Design Anti-Slop Audit
 *
 * Scans source files for patterns that violate the LCL design identity.
 * Run: npx tsx scripts/design-audit.ts src/
 *
 * Exit codes:
 *   0 — no errors (warnings allowed)
 *   1 — errors found (build should fail)
 */

import { readFileSync, readdirSync, statSync } from 'fs'
import { join, relative, extname } from 'path'

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

type Severity = 'error' | 'warn'

interface Rule {
  id: string
  severity: Severity
  description: string
  pattern: RegExp
  fileTypes?: string[]
}

interface Violation {
  rule: Rule
  file: string
  line: number
  match: string
}

// ─────────────────────────────────────────────────────────────
// Rules (30+ anti-patterns)
// ─────────────────────────────────────────────────────────────

const rules: Rule[] = [
  // ── Typography violations ──
  {
    id: 'LCL-T01',
    severity: 'warn',
    description: 'Inter used as heading font — headings must use IBM Plex Mono',
    pattern: /font-family:\s*['"]?Inter[^;]*['"]?[^;]*;?\s*\/\*.*heading/i,
    fileTypes: ['.css'],
  },
  {
    id: 'LCL-T02',
    severity: 'warn',
    description: 'Inter in className for heading element — use mono for structural text',
    pattern: /<h[1-3][^>]*className=[^>]*font-sans/i,
    fileTypes: ['.tsx', '.jsx'],
  },
  {
    id: 'LCL-T03',
    severity: 'error',
    description: 'Wrong typeface family (Poppins/Nunito/Comic Sans/Roboto/Open Sans) — use IBM Plex Mono + Inter only',
    pattern: /(?:Poppins|Nunito|Comic\s*Sans|Roboto|Open\s*Sans|Montserrat|Raleway|Lato)/i,
  },

  // ── Color violations ──
  {
    id: 'LCL-C01',
    severity: 'error',
    description: 'Purple/violet gradient detected — AI slop indicator',
    pattern: /(?:from-purple|to-purple|from-violet|to-violet|purple-[4-9]00|violet-[4-9]00|(?:^|[\s;:])#(?:[89][0-5][0-9a-f]{2}[fF]{2}|[aA][0-5][0-5][fF]{3}))/i,
  },
  {
    id: 'LCL-C02',
    severity: 'error',
    description: 'Blue primary color (bg-blue-) — wrong palette, use LCL midnight + amber',
    pattern: /(?:bg-blue-[4-9]00|bg-indigo-[4-9]00|bg-sky-[4-9]00)/,
  },
  {
    id: 'LCL-C03',
    severity: 'error',
    description: 'Gradient text (bg-clip-text / text-transparent) — 2023 AI slop shorthand',
    pattern: /(?:bg-clip-text|text-transparent|background-clip:\s*text|-webkit-background-clip:\s*text)/,
  },
  {
    id: 'LCL-C04',
    severity: 'error',
    description: 'Generic gradient (from-X to-Y pattern) not using LCL palette',
    pattern: /bg-gradient-to-[rbl]\s+from-(?:purple|violet|pink|blue|indigo|cyan)/,
  },

  // ── Shape violations ──
  {
    id: 'LCL-S01',
    severity: 'warn',
    description: 'rounded-full on containers — bubbly, anti-operational (pills only)',
    pattern: /rounded-full(?!\s*(?:w-[1-3]|h-[1-3]|size-[1-3]))/,
  },
  {
    id: 'LCL-S02',
    severity: 'warn',
    description: 'rounded-3xl / rounded-2xl — excessive rounding, keep to radius-lg (16px) max',
    pattern: /rounded-[23]xl/,
  },
  {
    id: 'LCL-S03',
    severity: 'error',
    description: 'border-radius on 3D/canvas container — breaks WebGL rendering',
    pattern: /(?:<canvas|<Canvas|R3F|three)[^>]*(?:rounded|border-radius)/i,
  },

  // ── Copy violations ──
  {
    id: 'LCL-W01',
    severity: 'error',
    description: 'Corporate buzzword detected (Innovation/Synergy/Leverage/Cutting-edge/Next-gen/Disrupt)',
    pattern: /\b(?:Innovation|Synergy|Leverage|Cutting[- ]edge|Next[- ]gen|Disruptive?|Revolutioniz|Paradigm|Empower(?:ing|ment)?)\b/i,
  },
  {
    id: 'LCL-W02',
    severity: 'error',
    description: 'Lorem ipsum placeholder text — no placeholder copy allowed',
    pattern: /Lorem\s+ipsum/i,
  },
  {
    id: 'LCL-W03',
    severity: 'warn',
    description: 'Generic CTA text — LCL uses email links, not signup buttons',
    pattern: /["'](?:Get Started|Sign Up Today|Start Free Trial|Learn More|Book a Demo|Schedule a Call|Try It Free)["']/i,
  },
  {
    id: 'LCL-W04',
    severity: 'warn',
    description: '"Trust us" copy pattern — we show work, not ask for trust',
    pattern: /\b(?:Trusted by|As seen in|Featured in|Loved by|Join [\d,]+ (?:companies|teams|users))\b/i,
  },
  {
    id: 'LCL-W05',
    severity: 'error',
    description: 'Vanity metrics pattern (10,000+ users / 99.9% uptime claims) — not operational data',
    pattern: /(?:[\d,]+\+?\s*(?:happy\s+)?(?:users|customers|clients|companies))|(?:99\.9+%\s*uptime)/i,
  },

  // ── Asset violations ──
  {
    id: 'LCL-A01',
    severity: 'error',
    description: 'Stock photo URL (unsplash/pexels/shutterstock) — no stock imagery',
    pattern: /(?:unsplash\.com|pexels\.com|shutterstock|istockphoto|gettyimages|stock-photo)/i,
  },
  {
    id: 'LCL-A02',
    severity: 'warn',
    description: 'Heroicons import — default AI-generated UI indicator, use custom or system icons',
    pattern: /(?:@heroicons\/|heroicons)/,
  },

  // ── Layout violations ──
  {
    id: 'LCL-L01',
    severity: 'warn',
    description: 'shadow-xl / shadow-2xl — cheap depth trick, use border + background shift',
    pattern: /(?:shadow-xl|shadow-2xl|drop-shadow-xl|drop-shadow-2xl|box-shadow:\s*[^;]*(?:20px|25px|30px))/,
  },
  {
    id: 'LCL-L02',
    severity: 'warn',
    description: 'Feature grid pattern (grid-cols-3 with icon cards) — template marketplace layout',
    pattern: /grid-cols-3[^>]*>[^<]*(?:<[^>]*(?:Icon|icon|svg))/i,
  },
  {
    id: 'LCL-L03',
    severity: 'warn',
    description: 'flex-wrap on hero section — usually incorrect for LCL hero layout',
    pattern: /(?:Hero|hero)[^}]*flex-wrap/i,
  },
  {
    id: 'LCL-L04',
    severity: 'warn',
    description: 'Centered text block > likely multi-line (text-center with long content)',
    pattern: /text-center[^>]*>[^<]{100,}/,
  },
  {
    id: 'LCL-L05',
    severity: 'warn',
    description: 'Full-width hero image pattern — magazine layout, not terminal aesthetic',
    pattern: /(?:hero|Hero)[^}]*(?:w-full|w-screen)[^}]*(?:img|Image|background-image)/i,
  },

  // ── Component violations ──
  {
    id: 'LCL-K01',
    severity: 'warn',
    description: 'Testimonial carousel/slider pattern — social proof theater',
    pattern: /(?:testimonial|Testimonial)[^}]*(?:carousel|slider|swiper|Swiper)/i,
  },
  {
    id: 'LCL-K02',
    severity: 'warn',
    description: 'Animated counter / count-up pattern — vanity metrics, not operational',
    pattern: /(?:countUp|CountUp|count-up|useCountUp|animateNumber|animated.*counter)/i,
  },
  {
    id: 'LCL-K03',
    severity: 'warn',
    description: 'Particle/confetti/floating animation — decorative noise',
    pattern: /(?:particles|Particles|confetti|Confetti|tsparticles|react-particles)/i,
  },
  {
    id: 'LCL-K04',
    severity: 'warn',
    description: 'Generic footer with sitemap grid — use minimal terminal-style footer',
    pattern: /(?:footer|Footer)[^}]*grid-cols-[3-5]/i,
  },
  {
    id: 'LCL-K05',
    severity: 'warn',
    description: 'Accordion/FAQ section pattern — not control room UX',
    pattern: /(?:Accordion|FAQ|faq|frequently.asked)/i,
  },

  // ── Contrast & readability ──
  {
    id: 'LCL-R01',
    severity: 'warn',
    description: 'opacity-50 or lower on text — likely accessibility issue',
    pattern: /(?:opacity-(?:[1-4]0|[1-5])\b)[^>]*(?:text|<p|<span|<h[1-6])/i,
  },
  {
    id: 'LCL-R02',
    severity: 'warn',
    description: 'Low opacity on important content (opacity < 0.5 on text elements)',
    pattern: /opacity:\s*0\.[0-4]\d*[^>]*>[^<]*[A-Z]/,
  },

  // ── Motion violations ──
  {
    id: 'LCL-M01',
    severity: 'warn',
    description: 'Auto-playing carousel/slider — one animation max per viewport',
    pattern: /(?:autoplay|autoPlay|auto-play)(?:\s*[:=]\s*(?:true|{true}|"\d))/i,
  },
  {
    id: 'LCL-M02',
    severity: 'warn',
    description: 'Infinite animation loop (besides status pulse) — excessive motion',
    pattern: /animation:(?!.*status-pulse)[^;]*infinite/,
    fileTypes: ['.css'],
  },
  {
    id: 'LCL-M03',
    severity: 'warn',
    description: 'Hover scale transform > 1.05 — too dramatic for operational UI',
    pattern: /hover:.*scale-(?:1[1-9]|[2-9]\d|1[1-9]\d)/,
  },

  // ── Spacing violations ──
  {
    id: 'LCL-P01',
    severity: 'warn',
    description: 'py-20 / py-24 / py-32 — excessive vertical padding, breaks density',
    pattern: /(?:py-(?:2[0-9]|3[0-9]|[4-9]\d)|padding-(?:top|bottom):\s*(?:[5-9]|[1-9]\d)rem)/,
  },
  {
    id: 'LCL-P02',
    severity: 'warn',
    description: 'max-w-7xl / max-w-screen — too wide, LCL content-max is 900px',
    pattern: /max-w-(?:7xl|screen|full)|max-width:\s*(?:128|144|160)rem/,
  },

  // ── Anti-brand signals ──
  {
    id: 'LCL-B01',
    severity: 'error',
    description: 'Placeholder image (via.placeholder / placehold.it / placekitten)',
    pattern: /(?:via\.placeholder|placehold\.it|placekitten|placeholder\.com|dummyimage)/i,
  },
  {
    id: 'LCL-B02',
    severity: 'warn',
    description: 'Social media icon row (Twitter/X/LinkedIn/GitHub row) — minimal presence only',
    pattern: /(?:twitter|linkedin|github|facebook|instagram)[^<]*(?:twitter|linkedin|github|facebook|instagram)/i,
  },
  {
    id: 'LCL-B03',
    severity: 'warn',
    description: 'Cookie banner / popup overlay pattern — not mission-critical UI',
    pattern: /(?:cookie|Cookie)(?:Banner|Consent|Notice|Popup|Modal)/,
  },
]

// ─────────────────────────────────────────────────────────────
// Scanner
// ─────────────────────────────────────────────────────────────

const SCANNABLE_EXTENSIONS = new Set(['.tsx', '.ts', '.jsx', '.js', '.css', '.html', '.astro', '.svelte', '.vue'])

function collectFiles(dir: string): string[] {
  const results: string[] = []

  function walk(current: string) {
    const entries = readdirSync(current)
    for (const entry of entries) {
      if (entry.startsWith('.') || entry === 'node_modules' || entry === '.next' || entry === 'dist') continue
      const fullPath = join(current, entry)
      const stat = statSync(fullPath)
      if (stat.isDirectory()) {
        walk(fullPath)
      } else if (SCANNABLE_EXTENSIONS.has(extname(entry))) {
        results.push(fullPath)
      }
    }
  }

  walk(dir)
  return results
}

function scanFile(filePath: string, baseDir: string): Violation[] {
  const violations: Violation[] = []
  const ext = extname(filePath)
  const content = readFileSync(filePath, 'utf-8')
  const lines = content.split('\n')

  for (const rule of rules) {
    // Skip rules that don't apply to this file type
    if (rule.fileTypes && !rule.fileTypes.includes(ext)) continue

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      const match = line.match(rule.pattern)
      if (match) {
        violations.push({
          rule,
          file: relative(baseDir, filePath),
          line: i + 1,
          match: match[0].slice(0, 60),
        })
      }
    }
  }

  return violations
}

// ─────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────

function main() {
  const targetDir = process.argv[2]

  if (!targetDir) {
    console.error('Usage: npx tsx scripts/design-audit.ts <directory>')
    console.error('Example: npx tsx scripts/design-audit.ts src/')
    process.exit(2)
  }

  // Resolve relative paths
  const resolvedDir = join(process.cwd(), targetDir)

  let files: string[]
  try {
    files = collectFiles(resolvedDir)
  } catch (err) {
    console.error(`Error: Cannot read directory "${targetDir}"`)
    process.exit(2)
  }

  if (files.length === 0) {
    console.log(`No scannable files found in ${targetDir}`)
    process.exit(0)
  }

  // Scan all files
  const allViolations: Violation[] = []
  for (const file of files) {
    const violations = scanFile(file, resolvedDir)
    allViolations.push(...violations)
  }

  // Separate errors and warnings
  const errors = allViolations.filter((v) => v.rule.severity === 'error')
  const warnings = allViolations.filter((v) => v.rule.severity === 'warn')

  // Output
  console.log('')
  console.log('╔══════════════════════════════════════════════════════════════╗')
  console.log('║          LAUNCH CONTROL LABS — DESIGN AUDIT                 ║')
  console.log('╚══════════════════════════════════════════════════════════════╝')
  console.log('')
  console.log(`  Scanned: ${files.length} files in ${targetDir}`)
  console.log(`  Rules:   ${rules.length} checks active`)
  console.log('')

  if (allViolations.length === 0) {
    console.log('  ✓ No violations found. Design system compliance: PASS')
    console.log('')
    process.exit(0)
  }

  // Print violations grouped by severity
  if (errors.length > 0) {
    console.log('  ── ERRORS (must fix) ──────────────────────────────────────')
    console.log('')
    for (const v of errors) {
      console.log(`  ✗ ${v.rule.id} │ ${v.file}:${v.line}`)
      console.log(`    ${v.rule.description}`)
      console.log(`    matched: "${v.match}"`)
      console.log('')
    }
  }

  if (warnings.length > 0) {
    console.log('  ── WARNINGS (review) ─────────────────────────────────────')
    console.log('')
    for (const v of warnings) {
      console.log(`  ⚠ ${v.rule.id} │ ${v.file}:${v.line}`)
      console.log(`    ${v.rule.description}`)
      console.log(`    matched: "${v.match}"`)
      console.log('')
    }
  }

  // Summary
  console.log('  ── SUMMARY ───────────────────────────────────────────────')
  console.log('')
  console.log(`  ${errors.length} error(s), ${warnings.length} warning(s)`)
  console.log('')

  if (errors.length > 0) {
    console.log('  STATUS: FAIL — resolve errors before shipping')
    process.exit(1)
  } else {
    console.log('  STATUS: PASS (with warnings) — review flagged items')
    process.exit(0)
  }
}

main()
