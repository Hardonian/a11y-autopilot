# A11y Autopilot

**AI-powered WCAG accessibility scanner that generates auto-fix PRs.**

![A11y](https://img.shields.io/badge/Accessibility-WCAG%202.2-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## Features

- 🔍 **Deep Scanning** — Uses axe-core for comprehensive WCAG analysis
- 🤖 **AI Fixes** — Claude-powered fix suggestions
- 📝 **Auto PRs** — Generate fix PRs directly to GitHub
- 📊 **Reports** — Exportable HTML/JSON reports
- 🎯 **Targeted** — Focus on critical/serious violations first

## Installation

```bash
npm install -g a11y-autopilot
```

## Usage

```bash
# Scan a URL
a11y scan https://example.com

# Generate fix PR
a11y scan https://example.com --fix --repo owner/repo

# JSON output
a11y scan https://example.com --json

# Help
a11y --help
```

## API

```typescript
import { scanUrl } from 'a11y-autopilot'

const report = await scanUrl('https://example.com')
console.log(`Found ${report.violations.length} violations`)
```

## Tech Stack

- [axe-core](https://github.com/dequelabs/axe-core) — Accessibility testing
- [Puppeteer](https://github.com/puppeteer/puppeteer) — Browser automation
- [Anthropic Claude](https://anthropic.com) — AI fix generation
- [GitHub API](https://docs.github.com/rest) — PR creation

## License

MIT © Scott Hardie
