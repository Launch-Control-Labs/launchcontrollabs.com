import { chromium } from 'playwright'
import * as fs from 'fs'
import * as path from 'path'

async function captureScreenshots() {
  const browser = await chromium.launch()
  const context = await browser.createBrowserContext()
  const page = await context.newPage()

  const baseUrl = 'http://localhost:3000/spike/fonts'
  const viewports = [
    { width: 1440, height: 900, name: '1440px' },
    { width: 768, height: 1024, name: '768px' },
    { width: 375, height: 812, name: '375px' },
  ]

  const evidenceDir = path.join(process.cwd(), '.sisyphus', 'evidence')
  if (!fs.existsSync(evidenceDir)) {
    fs.mkdirSync(evidenceDir, { recursive: true })
  }

  for (const viewport of viewports) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height })
    await page.goto(baseUrl, { waitUntil: 'networkidle' })

    const screenshotPath = path.join(evidenceDir, `font-comparison-${viewport.name}.png`)
    await page.screenshot({ path: screenshotPath, fullPage: true })
    console.log(`✓ Screenshot saved: ${screenshotPath}`)
  }

  await browser.close()
}

captureScreenshots().catch(console.error)
