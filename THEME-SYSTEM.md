# Color Theme System Guide

## Overview

I've created a **CSS Variable-based theming system** that makes it easy to switch between color schemes without modifying HTML or inline styles. This is much cleaner than hardcoding colors.

## How It Works

### 1. **Theme Files** (Choose ONE to load)

- **`assets/css/theme-gold.css`** - Default gold theme (#ffbe33)
- **`assets/css/theme-purple.css`** - Purple theme (#4a03b6)

Each theme file defines CSS custom properties (variables) for all colors used throughout the site.

### 2. **CSS Variables** 

All colors are defined as variables in the `:root` selector:

```css
--primary-color: #ffbe33;           /* Main accent color */
--primary-color-dark: #e69c00;      /* Hover state */
--section-green: #6bc34a;           /* Section colors */
--section-orange: #ff6f00;
/* etc. */
```

### 3. **How to Use Variables in Inline Styles**

Replace hardcoded colors with `var()` function:

**Before (hardcoded):**
```html
<button style="background-color: #ffbe33; color: white;">Click Me</button>
```

**After (using variables):**
```html
<button style="background-color: var(--primary-color); color: white;">Click Me</button>
```

---

## Implementation Steps

### Step 1: Add Theme Stylesheet Link to `_includes/layouts/base.njk`

In the `<head>` section of your base layout, add:

```html
<!-- Default theme - change file path to switch themes -->
<link id="theme-stylesheet" rel="stylesheet" href="/assets/css/theme-gold.css">
```

**The `id="theme-stylesheet"` is important** — it allows JavaScript to swap themes dynamically.

### Step 2: Add Theme Switcher JavaScript (Optional)

In the same `<head>`, add:

```html
<script src="/assets/js/theme-switcher.js"></script>
```

This enables runtime theme switching via:
- `switchTheme('purple')` - Switch to purple
- `switchTheme('gold')` - Switch back to gold

### Step 3: Update Inline Styles to Use Variables

Find all hardcoded color values and replace them with CSS variables:

**Example - "Why Choose" section:**

```html
<!-- Before -->
<div style="background: linear-gradient(135deg, #ffbe33 0%, #f5b530 100%);"></div>

<!-- After -->
<div style="background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-color-light) 100%);"></div>
```

**Example - "How to Order" section:**

```html
<!-- Before - Green -->
<div style="background: linear-gradient(135deg, #6bc34a 0%, #558b2f 100%);"></div>

<!-- After -->
<div style="background: linear-gradient(135deg, var(--section-green) 0%, var(--section-green-dark) 100%);"></div>
```

---

## Quick Switching Methods

### Method 1: **Static Switching** (Simple)
Change the stylesheet link in `base.njk`:
```html
<!-- Switch to purple -->
<link id="theme-stylesheet" rel="stylesheet" href="/assets/css/theme-purple.css">
```

### Method 2: **JavaScript Switching** (Dynamic)
Add a theme switcher UI and use:
```js
// In browser console or attached to buttons
switchTheme('purple');
switchTheme('gold');
```

### Method 3: **Theme Toggle Button** (User Choice)
```html
<button onclick="switchTheme('purple')">Purple Theme</button>
<button onclick="switchTheme('gold')">Gold Theme</button>
```

---

## Available CSS Variables

### Primary Colors
- `--primary-color` — Main accent (gold/purple)
- `--primary-color-dark` — Darker version (hover state)
- `--primary-color-light` — Lighter version

### Section Colors (for 3-column sections)
- `--section-green` — Left/first section
- `--section-green-dark` — Darker green
- `--section-dark` — Middle/dark section
- `--section-dark-darker` — Darker version
- `--section-orange` — Right/third section
- `--section-orange-dark` — Darker orange

### Supporting Colors
- `--secondary-dark` — Dark UI elements (#222831)
- `--secondary-light` — Light backgrounds (#f1f2f3)
- `--accent-pink` — Pink accents (#FF1493)

---

## Creating a New Theme

1. Duplicate `theme-gold.css` and name it `theme-yourname.css`
2. Update all color values in `:root { }`
3. Add a link in `base.njk` or register it in `theme-switcher.js`:

```js
const themeMap = {
  gold: '/assets/css/theme-gold.css',
  purple: '/assets/css/theme-purple.css',
  'your-new-theme': '/assets/css/theme-yourname.css',  // Add here
};
```

---

## Example: Complete Update for One Section

### "Why Choose Us" section - Before:
```html
<div style="background: linear-gradient(135deg, #ffbe33 0%, #f5b530 100%);"></div>
```

### After:
```html
<div style="background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-color-light) 100%);"></div>
```

---

## Pros of This Approach

✅ **Single point of change** — Update one CSS file, all colors change  
✅ **Easy to add themes** — Create new theme files in seconds  
✅ **No hardcoding** — Colors are defined once, used everywhere  
✅ **User preference** — Can save theme choice to localStorage  
✅ **Runtime switching** — Change themes without page reload  
✅ **Maintainable** — Future developers understand the system  

---

## Next Steps

1. Add `<link id="theme-stylesheet" href="/assets/css/theme-gold.css">` to `base.njk`
2. Add `<script src="/assets/js/theme-switcher.js"></script>` to `base.njk`
3. Gradually update inline styles to use CSS variables
4. Test theme switching with `switchTheme('purple')` in browser console

---

## Questions?

The system is designed to be simple and extensible. Start with the static approach (just change the theme link), then add JavaScript switching if you want runtime flexibility.
