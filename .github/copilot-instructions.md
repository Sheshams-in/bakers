# SheshamsBakers Project Guidelines

## Code Style

### CSS Naming & Organization
- Use **`snake_case`** for CSS classes: `.hero_area`, `.food_section`, `.layout_padding`
- Section-specific prefixes help group related styles: `.featured__card`, `.testimonial_card`
- **Spacing scale** (standardized):
  - `.layout_padding`: 90px vertical (major sections)
  - `.layout_padding2`: 75px vertical
  - Variants: `-top`, `-bottom`, `2`, `2-top`, `2-bottom`

### Typography System
- **Headings** (h1, h2, h3): `'Dancing Script'` (cursive) — premium, decorative feel
- **Body text**: `'Open Sans'` (sans-serif) — readable, clean
- Font weights: Regular (400), Bold (700) for emphasis

### Color Scheme & Variables
- **Primary gold**: `#ffbe33` (accents, highlights, CTAs)
- **Dark gray**: `#222831` (backgrounds, text on light)
- **Purple**: `#9D5FD9` (featured sections, premium accent)
- **Pink**: `#FF1493` (card accents, hover states)
- Light gray: `#f1f2f3`, `#f9f9f9` (background sections)

### Components & Hover Effects
- Cards have **smooth 0.3s transitions** on all interactive elements
- Hover transforms typically: `translateY(-8px)` to `-12px` (subtle lift effect)
- **Glass-morphism** pattern: `backdrop-filter: blur()` + transparency for modern effect
- Shadows escalate on hover: `box-shadow` deepens for depth

---

## Architecture

**11ty static site generator** with these key layers:

### Page Organization
- **Pages** (`./pages/*.njk`): Top-level routes (About, Contact, Gallery, Menu) as Nunjucks templates
- **Layouts** (`_includes/layouts/base.njk`): Master template with meta, CSS/JS includes, `{% block content %}` for page content
- **Components** (`_includes/*.njk`): Reusable pieces (header, footer, gallery, menu, post-card)
- **Data** (`_data/*.json`): Structured data like cake categories

### Output & Asset Management
- **Build output**: `_site/` directory (auto-generated, check git ignore)
- **Static assets**: `assets/` folder with `css/`, `js/`, `images/`, `fonts/` (passthrough copied to `_site/`)
- **Image optimization**: 11ty generates responsive versions (300px, 600px, 1200px) with WebP + JPEG formats

### Template Inheritance
```nunjucks
---
layout: base.njk
title: Page Title
permalink: /page/
---
{% block content %}
  <h1>{{ title }}</h1>
  {# Page-specific content #}
{% endblock %}
```

---

## Build and Test

### Development Workflow
```bash
npm install              # Install dependencies
npm run dev              # Local dev server (localhost:3000, live reload)
npm run build            # Generate static _site/
npm test                 # Run Playwright tests (all browsers)
npm run test:ui          # Playwright UI mode (interactive debugging)
npm run test:debug       # Step through tests
```

### Testing Setup
- **Framework**: Playwright (cross-browser: Chromium, Firefox, WebKit)
- **Test directory**: `./tests/`
- **Config**: [playwright.config.ts](playwright.config.ts)
- **Auto server**: Tests automatically spin up dev server before running
- **Patterns**: Page load checks, navigation verification, section visibility, component integration

### Instagram Integration
- `scripts/sync-instagram.js` syncs Instagram feed data
- Feed data stored in `posts/instagram-feed.json`
- Displayed on Gallery page via `_includes/gallery.njk`

---

## Conventions

### CSS Responsive Breakpoints
- **Mobile first**: No media query = mobile styles
- **Tablet+**: `@media (min-width: 768px)` — tablets and desktops
- **Mobile-specific**: `@media (max-width: 768px)` for overrides
- **Grid pattern**: 1 col mobile → 2 col tablet → 3 col desktop (cards, sections)

### Page Structure Pattern
Every page follows this section hierarchy:
1. Hero/Title section
2. Feature cards or content grid
3. Promotional/CTA sections
4. Testimonials or social proof
5. Final CTA ("Order Now on WhatsApp")
6. Footer

### Links & Navigation
- Use **absolute paths**: `/about/`, `/menu/`, `/contact/` (not relative)
- Active nav state in [_includes/header.njk](_includes/header.njk): `{% if page.url == '/about/' %}`
- WhatsApp CTA link available globally (header + footer)

### File Naming
- **Markdown templates** (content pages): `index.md` (home) or page name in `pages/`
- **Nunjucks layouts**: Files in `_includes/` with descriptive names (`header.njk`, `base.njk`)
- **CSS files**: Purpose-named (`style.css`, `responsive.css`, etc.)
- **JavaScript**: Functional names (`gallery.js`, `menu-search.js`)

### Development Gotchas
- **Eleventy watch issue**: If `dev` doesn't auto-reload, restart the server
- **Asset links**: Always use `/assets/...` (absolute) in templates, not relative paths
- **Image optimization**: Large images slow builds; keep source images ~1920px max width
- **Nunjucks syntax**: Use `{% %}` (not `{{ }}`) for control flow; `{{ }}` only for output

---

## Key Files by Purpose

| File | Purpose |
|------|---------|
| [.eleventy.js](.eleventy.js) | Build config: image optimization, markdown setup, collections |
| [_includes/layouts/base.njk](_includes/layouts/base.njk) | Master template: meta tags, CSS/JS includes, block structure |
| [_includes/header.njk](_includes/header.njk) | Navigation bar with active state logic |
| [assets/css/style.css](assets/css/style.css) | Main styles: typography, spacing scale, components, responsive breakpoints |
| [pages/about.njk](pages/about.njk) | Example page: template index.md pattern, section grid, responsive layout |
| [_data/categories.json](_data/categories.json) | Structured data for cake categories |
| [tests/example.spec.ts](tests/example.spec.ts) | Example Playwright test: page load, navigation, section visibility |
| [playwright.config.ts](playwright.config.ts) | Test runner config: base URL, browser list, auto-server setup |

---

## Recent Design Direction (2026)

The site is being modernized with the **Feane dining template** aesthetic:
- Professional restaurant-style layout with premium positioning
- Gold accent color + dark gray + purple/pink accents for premium feel
- Modern glass-morphism and smooth transitions
- Feature sections: Offers, Menu with Pricing, Testimonials
- Maintained brand identity: Vegetarian/Eggless emphasis, WhatsApp CTA, Custom cakes focus

See [plan.md](plan.md) and [STYLE-FIX-REPORT.md](STYLE-FIX-REPORT.md) for ongoing design work.
