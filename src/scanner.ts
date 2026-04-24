import puppeteer from 'puppeteer'

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
  const browser = await puppeteer.launch({ headless: 'new' })
  const page = await browser.newPage()
  
  // Inject axe-core
  await page.addScriptTag({ path: require.resolve('axe-core/axe.min.js') })
  
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 })
  
  const results = await page.evaluate(async () => {
    // @ts-ignore
    return await window.axe.run()
  })
  
  await browser.close()
  
  const violations: Violation[] = results.violations.map((v: any) => ({
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
