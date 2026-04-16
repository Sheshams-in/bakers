# Playwright MCP Setup

## Installation ✅

**Playwright MCP Server** is installed globally and configured for this workspace.

- **Package**: `@playwright/mcp` v0.0.70
- **Location**: `/opt/homebrew/lib/node_modules/@playwright/mcp`
- **Executable**: `playwright-mcp`
- **Config**: [.mcprc](.mcprc)

## What is MCP?

MCP (Model Context Protocol) enables AI assistants like Claude/Copilot to:
- ✅ Launch and control browsers
- ✅ Navigate web pages
- ✅ Extract data from web content
- ✅ Perform automated interactions
- ✅ Take screenshots and perform visual analysis

## Prerequisites

Before using Playwright MCP with Claude/Copilot:

1. **Configure VS Code Copilot**
   - Open VS Code Settings (Cmd+,)
   - Search for "copilot" and find MCP settings
   - Add Playwright MCP server configuration

2. **Browser Requirements**
   - Chromium, Firefox, and WebKit are already installed
   - Located in: `~/.cache/ms-playwright/`

## Usage Examples

### Claude Can Now:

**Take a screenshot of your site:**
```
@Copilot Take a screenshot of the homepage at http://localhost:3000
```

**Extract data from a page:**
```
@Copilot Navigate to http://localhost:3000/gallery and list all gallery items
```

**Fill forms and interact:**
```
@Copilot Go to http://localhost:3000/contact, fill the contact form, and submit it
```

**Validate page structure:**
```
@Copilot Check if all menu items are present on http://localhost:3000/menu
```

## Local Testing Setup

To test Playwright MCP with your local dev server:

1. **Start the dev server:**
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:3000`

2. **Available URLs:**
   - Homepage: `http://localhost:3000/`
   - Menu: `http://localhost:3000/menu`
   - Gallery: `http://localhost:3000/gallery`
   - About: `http://localhost:3000/about`
   - Contact: `http://localhost:3000/contact`

## Playwright MCP Commands

When using Claude/Copilot with this MCP server, available tools include:

- **navigate(url)** — Navigate to a URL
- **goBack()** — Go back to previous page
- **goForward()** — Go forward
- **screenshot()** — Capture page screenshot
- **click(selector)** — Click an element
- **fill(selector, text)** — Fill form input
- **getText(selector)** — Extract text content
- **getHTML()** — Get page HTML
- **evaluate(script)** — Execute JavaScript
- **waitForSelector(selector)** — Wait for element
- And many more...

## Integration with Tests

Files already set up:
- [playwright.config.ts](playwright.config.ts) — Configuration
- [tests/example.spec.ts](tests/example.spec.ts) — Sample tests

Run tests:
```bash
npm test              # Run all tests
npm run test:ui       # Interactive UI
npm run test:debug    # Debugging mode
```

## Next Steps

1. **Test with VS Code Copilot** - Ask Copilot to interact with your site
2. **Extend MCP Commands** - Create custom Playwright scripts
3. **Integrate with CI/CD** - Add Playwright tests to deployment pipeline
4. **Visual Testing** - Use screenshots for regression testing

## Troubleshooting

**MCP server not connecting?**
- Verify installation: `playwright-mcp --version`
- Check configuration: `cat .mcprc`
- Restart VS Code

**Browsers not found?**
- Reinstall browsers: `npx playwright install`
- Check cache: `ls ~/.cache/ms-playwright/`

**Tests failing?**
- Ensure dev server is running: `npm run dev`
- Check baseURL in [playwright.config.ts](playwright.config.ts)

## Documentation

- [Playwright Docs](https://playwright.dev)
- [MCP Protocol Spec](https://modelcontextprotocol.io)
- [Playwright MCP Package](https://npm.im/@playwright/mcp)
