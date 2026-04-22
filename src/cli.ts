#!/usr/bin/env node

import { scanUrl } from './scanner'

const url = process.argv[2]

if (!url) {
  console.log('Usage: npm run scan <url>')
  console.log('Example: npm run scan https://example.com')
  process.exit(1)
}

console.log(`Scanning ${url}...`)

scanUrl(url)
  .then(report => {
    console.log('\n=== Accessibility Report ===')
    console.log(`Violations found: ${report.violations.length}`)
    console.log('\nTop issues:')
    report.violations.slice(0, 5).forEach((v, i) => {
      console.log(`${i + 1}. ${v.id}: ${v.description}`)
    })
  })
  .catch(err => {
    console.error('Scan failed:', err.message)
    process.exit(1)
  })
