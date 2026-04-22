# Architecture

## Scanning Pipeline

```
URL → Puppeteer → axe-core → Results → Claude → Fix Suggestions
```

## Components

### CLI
- Entry point for command-line usage
- Handles arguments and output formatting

### Scanner
- Launches headless browser
- Injects axe-core
- Collects violations

### Fix Generator
- Sends violations to Claude
- Receives fix suggestions
- Formats as code patches

## Flow

1. User provides URL
2. Puppeteer loads page
3. axe-core analyzes accessibility
4. Results sent to Claude
5. Claude generates fixes
6. Optional: PR created via GitHub API
