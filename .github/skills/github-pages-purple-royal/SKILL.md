---
name: github-pages-purple-royal
description: 'Design rich, royal websites with purple aesthetics for free GitHub Pages hosting. Use for creating elegant, premium-feeling pages with purple color schemes, luxury typography, and sophisticated layouts. Covers color theory, component patterns, accessibility, and performance optimization.'
argument-hint: 'Describe your design goal (e.g., "elegant gallery", "luxury retail", "portfolio showcase")'
---

# GitHub Pages Purple Royal Design

## When to Use

Create stylish, premium-feeling websites on GitHub Pages with:
- **Royal purple color schemes** (deep, regal, sophisticated)
- **Rich typography and spacing** (luxury feel without extra assets)
- **Component patterns** (cards, buttons, headers with purple themes)
- **Full responsiveness** (mobile-first, CSS Grid/Flexbox)
- **Performance optimization** (free hosting constraints)
- **Accessibility standards** (WCAG AA compliance)

## Quick Start

### 1. Choose Your Purple Palette
Start with [color-palettes.md](./references/color-palettes.md) and select a palette that matches your brand:
- **Deep Royal**: Dark purples (#5B21B6, #7C3AED) for luxury/premium
- **Soft Regal**: Medium purples (#9F7AEA, #BB86FC) for elegance
- **Amethyst Royale**: Vibrant purples (#C084FC) for creativity
- **Plum & Gold**: Purple with metallic accents for prestige

### 2. Set Up CSS Variables
Create `variables.css` with your palette:
```css
:root {
  --purple-primary: #7C3AED;    /* Main brand color */
  --purple-dark: #5B21B6;       /* Focus states, depth */
  --purple-light: #DDD6FE;      /* Backgrounds */
  --accent-gold: #F59E0B;       /* Optional: luxury accent */
}
```

Copy the [purple-palette.css](./assets/purple-palette.css) template as your starting point.

### 3. Apply Component Patterns
Reference [component-patterns.md](./references/component-patterns.md) to implement:
- **Hero sections** (full-width, gradient backgrounds)
- **Cards** (elevated, hover effects, shadow depth)
- **Navigation** (sticky, subtle purple highlights)
- **Call-to-action buttons** (purple primary, contrasting secondary)
- **Grid layouts** (responsive, golden ratio spacing)

### 4. Typography for Royal Feel
Use system fonts for performance, but style them elegantly:
```css
/* Display: Headers */
font-family: 'Georgia', 'Garamond', serif;
letter-spacing: -0.5px;  /* Luxury tightness */

/* Body: Readability */
font-family: -apple-system, 'Segoe UI', sans-serif;
line-height: 1.7;  /* Generous spacing */
```

### 5. Test & Optimize
- **Color contrast**: Check [WebAIM](https://webaim.org/resources/contrastchecker/) (WCAG AA minimum 4.5:1)
- **Performance**: Limit CSS to <50KB for GitHub Pages free tier
- **Responsive**: Test at 375px, 768px, 1440px breakpoints
- **Print styles**: Often neglected but adds polish

## Design Principles

### Depth & Elevation
Simulate 3D using **shadows and layers**:
- Subtle shadows for "floating" effect
- Light-to-dark purple gradients
- Strategic transparency (rgba)

```css
.card {
  box-shadow: 
    0 2px 4px rgba(91, 33, 182, 0.1),
    0 8px 16px rgba(91, 33, 182, 0.15);
  transition: box-shadow 200ms ease;
}

.card:hover {
  box-shadow: 
    0 4px 8px rgba(91, 33, 182, 0.15),
    0 16px 32px rgba(91, 33, 182, 0.25);
}
```

### Color Hierarchy
- **Primary (Purple)**: Main actions, focus points (~20% of design)
- **Secondary (Light Purple/Gray)**: Backgrounds, dividers (~50%)
- **Accent (Gold/White)**: Highlights, microcopy (~5%)
- **Neutral (Black/Dark Gray)**: Text, structure (~25%)

### Whitespace for Elegance
Don't fill every space. Breathing room signals **luxury**:
- Padding: Minimum 1.5rem on cards, 2rem on sections
- Line-height: 1.6–1.8 for body text
- Gap: 2rem between layout sections

### Micro-interactions
Small animations add refinement:
```css
button {
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(124, 58, 237, 0.3);
}
```

## Performance on GitHub Pages

### CSS Strategy
1. **Single main stylesheet** (~30–40KB gzipped)
2. **CSS variables** for theming (no build tool needed)
3. **Mobile-first media queries** (lighter base CSS)
4. **Utility classes** sparingly (avoid duplicate bloat)

Example structure:
```
assets/css/
├── variables.css      (theme colors, spacing, fonts)
├── base.css           (reset, typography, grid)
├── components.css     (buttons, cards, nav)
└── responsive.css     (breakpoints)
```

### Image Optimization
- Use `.webp` with `.png` fallback
- Lazy-load below-fold images
- Compress hero images to <200KB
- Use CSS gradients instead of image backgrounds when possible

## Accessibility Checklist

- ✅ Color contrast: 4.5:1 for text (white text on purple)
- ✅ Focus states: Visible outline or background change
- ✅ Semantic HTML: `<button>`, `<nav>`, `<h1>-<h6>` proper hierarchy
- ✅ Alt text: Every image has descriptive alt attribute
- ✅ Keyboard navigation: Tab through all interactive elements
- ✅ Screen reader: Proper label associations (`for=` on form inputs)

Example accessible button:
```html
<button class="btn btn-primary" aria-label="Subscribe to newsletter">
  Join Our Community
  <span aria-hidden="true">→</span>
</button>
```

## Real-World Example

View [royal-theme-sample.html](./assets/royal-theme-sample.html) for a complete, working example of:
- Hero section with gradient
- Feature cards with hover effects
- Navigation with scroll effects
- Footer with vertical rhythm

## Next Steps

1. **Audit your current design**: Take a screenshot of a key page
2. **Pick 3 colors**: Primary purple, light background, accent (see color palettes)
3. **Test contrast**: Use WebAIM for accessibility
4. **Implement gradually**: Start with variables.css, then update one component at a time
5. **Solicit feedback**: Share with 1–2 people before full deployment

## Related Resources

- [color-palettes.md](./references/color-palettes.md) — 20+ purple combinations with use cases
- [component-patterns.md](./references/component-patterns.md) — CSS code for 10+ components
- [purple-palette.css](./assets/purple-palette.css) — Ready-to-use CSS variables file
- [royal-theme-sample.html](./assets/royal-theme-sample.html) — Complete HTML demo

## Troubleshooting

**Purple looks too dark/light**
→ Check `--purple-primary` against `background`. Adjust lightness by 10–15% in HSL.

**Text hard to read on purple**
→ Use white or `#F3F4F6` text, verify 4.5:1 contrast ratio with WebAIM.

**Shadows don't show**
→ Ensure parent container has `overflow: visible` (not `hidden`). Use `box-shadow` on element itself.

**Mobile colors incorrect**
→ Test in Chrome DevTools device mode. Check for media query overrides. Use `em` units for breakpoints (e.g., `@media (min-width: 48em)`).
