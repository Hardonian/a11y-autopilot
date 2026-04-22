import puppeteer from 'puppeteer'
import { axe, AxeResults } from 'axe-core'

export interface A11yReport {
  url: string
  scannedAt: string
  violations: Violation[]
  passes: number
  incomplete: number
}

interface Violation {
  id: string
  description: string
  help: string
  impact: 'critical' | 'serious' | 'moderate' | 'minor'
  count: number
}

export async function scanUrl(url: string): Promise<A11yReport> {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  
  await page.goto(url, { waitUntil: 'networkidle2' })
  
  const results: AxeResults = await page.evaluate(() => {
    // @ts-ignore
    if (typeof axe === 'undefined') {
      throw new Error('axe-core not loaded')
    }
    // @ts-ignore
    return window.axe.run()
  })
  
  await browser.close()
  
  const violations: Violation[] = results.violations.map(v => ({
    id: v.id,
    description: v.description,
    help: v.help,
    impact: v.impact as Violation['impact'],
    count: v.nodes.length
  }))
  
  return {
    url,
    scannedAt: new Date().toISOString(),
    violations,
    passes: results.passes.length,
    incomplete: results.incomplete.length
  }
}
