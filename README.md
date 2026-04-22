# A11y Autopilot

**AI-powered WCAG accessibility scanner that generates auto-fix PRs.**

## Features

- WCAG 2.2 AA compliance scanning
- AI-generated fix suggestions
- Auto PR creation for common issues
- Built with FlexibleAccessible components

## Quick Start

```bash
npm install
npm run scan https://example.com
```

## CLI Usage

```bash
npm run scan <url>          # Scan a URL
npm run scan <url> --fix    # Generate fix PR
npm run scan <url> --json   # JSON output
```

## Tech Stack

- Node.js
- Puppeteer + axe-core
- Claude API (fix generation)
- GitHub API (PR creation)

## License

MIT
