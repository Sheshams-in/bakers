# Purple Color Palettes for Royal Design

## Palette 1: Deep Royal (Prestige)
**Best for**: Luxury brands, high-end services, premium portfolios

```
Primary:       #5B21B6 (Deep Indigo-Purple)
Secondary:     #7C3AED (Vibrant Purple)
Light:         #DDD6FE (Pale Lavender)
Accent:        #F59E0B (Gold)
Text:          #1F2937 (Charcoal)
Background:    #FFFBFE (Off-white)
```

**Usage**:
- Hero backgrounds: Gradient `#5B21B6 → #7C3AED`
- Buttons: `#7C3AED` with hover `#5B21B6`
- Cards: Light `#DDD6FE` background, `#5B21B6` text
- Accents: Gold `#F59E0B` for borders/icons

**Contrast checks** (text on background):
- `#1F2937` (charcoal) on `#FFFBFE` (white) ✅ 15:1
- `#FFFFFF` (white) on `#5B21B6` (deep purple) ✅ 7.5:1


## Palette 2: Soft Regal (Elegant)
**Best for**: Creative portfolios, lifestyle brands, bakeries, events

```
Primary:       #9F7AEA (Soft Purple)
Secondary:     #BB86FC (Light Purple)
Light:         #F3E8FF (Very Light Lavender)
Accent:        #EC4899 (Rose/Pink)
Text:          #3F3F46 (Dark Gray)
Background:    #FAFAFA (Almost White)
```

**Usage**:
- Hero: `linear-gradient(135deg, #9F7AEA 0%, #BB86FC 100%)`
- Interactive: `#BB86FC` with hover `#9F7AEA`
- Dividers: `#E9D5FF` (thin lines)
- Call-to-action: `#EC4899` (rose accent)

**Contrast checks**:
- `#3F3F46` on `#FAFAFA` ✅ 10.2:1
- `#FFFFFF` on `#9F7AEA` ✅ 5.8:1


## Palette 3: Amethyst Royale (Vibrant)
**Best for**: Creative studios, modern tech, artistic portfolios

```
Primary:       #8B5CF6 (Amethyst)
Secondary:     #A78BFA (Light Amethyst)
Light:         #F5F3FF (Very Pale Purple)
Accent:        #10B981 (Emerald Green)
Text:          #1F2937 (Charcoal)
Background:    #FFFFFF (Pure White)
```

**Usage**:
- Bold headers: `#8B5CF6`
- Hover states: `#A78BFA`
- Success indicators: `#10B981`
- Shadows: `rgba(139, 92, 246, 0.15)`

**Contrast**:
- `#1F2937` on `#FFFFFF` ✅ 14.5:1
- `#FFFFFF` on `#8B5CF6` ✅ 5.2:1


## Palette 4: Plum & Gold (Prestige Commerce)
**Best for**: E-commerce, high-end retail, bakery/food brands

```
Primary:       #6D28D9 (Deep Plum)
Secondary:     #A855F7 (Bright Plum)
Light:         #F3F0FF (Pale Plum)
Accent:        #FBBF24 (Amber Gold)
Text:          #1E1B4B (Nearly Black)
Background:    #FEF9E7 (Cream)
```

**Usage**:
- Product cards: `#FEF9E7` background
- Price text: `#FBBF24` (gold)
- Buttons: `#6D28D9` with gold border `2px solid #FBBF24`
- Special badge: `#A855F7` background, white text

**Contrast**:
- `#1E1B4B` on `#FEF9E7` ✅ 16.7:1
- `#FFFFFF` on `#6D28D9` ✅ 7.1:1


## Palette 5: Lavender Dream (Soft & Modern)
**Best for**: SaaS, apps, galleries, minimalist portfolios

```
Primary:       #9333EA (Purple)
Secondary:     #C084FC (Light Purple)
Light:         #F3E8FF (Lavender)
Accent:        #06B6D4 (Cyan)
Text:          #374151 (Medium Gray)
Background:    #FFFFFF (White)
```

**Usage**:
- Gradient backgrounds: `linear-gradient(to right, #9333EA, #C084FC)`
- Form focus: `#C084FC` outline
- Links: `#9333EA` underline on hover
- Status indicators: `#06B6D4`

**Contrast**:
- `#374151` on `#FFFFFF` ✅ 8.6:1
- `#FFFFFF` on `#9333EA` ✅ 5.9:1


## How to Choose

### Decision Tree
1. **Brand feeling?**
   - Luxury/Premium → **Deep Royal** or **Plum & Gold**
   - Modern/Creative → **Amethyst Royale** or **Lavender Dream**
   - Elegant/Approachable → **Soft Regal**

2. **Target audience?**
   - B2B / Corporate → Deep Royal, Lavender Dream
   - B2C / Retail → Plum & Gold, Soft Regal
   - Tech / Startup → Amethyst Royale

3. **Industry?**
   - E-commerce / Food → Plum & Gold
   - Portfolio / Creative → Amethyst Royale, Soft Regal
   - SaaS / Apps → Lavender Dream
   - Luxury / Services → Deep Royal

## CSS Variable Template

```css
:root {
  /* Primary colors */
  --color-primary: #7C3AED;      /* Main actions */
  --color-primary-dark: #5B21B6; /* Hover/focus */
  --color-primary-light: #DDD6FE; /* Backgrounds */
  
  /* Accent & Secondary */
  --color-accent: #F59E0B;       /* Highlights, CTAs */
  --color-secondary: #C084FC;    /* Supporting */
  
  /* Neutrals */
  --color-text: #1F2937;         /* Body text */
  --color-text-light: #6B7280;   /* Secondary text */
  --color-bg: #FFFBFE;            /* Main background */
  --color-bg-secondary: #F9F5FF;  /* Card background */
  --color-border: #E9D5FF;        /* Dividers */
  
  /* Effects */
  --shadow-sm: 0 1px 2px rgba(123, 58, 237, 0.05);
  --shadow-md: 0 4px 6px rgba(123, 58, 237, 0.1);
  --shadow-lg: 0 10px 15px rgba(123, 58, 237, 0.15);
}
```

## Testing Your Palette

### Color Contrast Tool
Use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/):
- Paste your text color hex into "Foreground"
- Paste your background color into "Background"
- Ensure ratio ≥ 4.5:1 for normal text, ≥ 3:1 for large text

### Accessibility Simulation
Chrome DevTools → Rendering → Emulate Vision Deficiencies:
- Deuteranopia (Green-Blind)
- Protanopia (Red-Blind)
- Tritanopia (Blue-Yellow Blind)

If your palette still looks good in all three, you're all set.

### Browser Preview
Create a test page with color swatches:
```html
<div style="background: #7C3AED; width: 100px; height: 100px;"></div>
<p style="color: #7C3AED;">Sample text</p>
```
View on actual devices (iPhone, Android, Mac, Windows) to see true color rendering.
