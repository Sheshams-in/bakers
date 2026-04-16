# Sheshams Bakers Redesign with Feane Template

## Overview
Redesign Sheshams Bakers website using Feane restaurant template's design system and layout patterns. Keep all Sheshams content (custom cakes, vegetarian/eggless USPs, WhatsApp CTAs) but apply Feane's professional styling. Menu page becomes the Instagram feed gallery (no separate gallery page). Remove all booking functionality.

---

## Phase 1: Design System Setup 🎨

- [ ] Create CSS variables for Feane color scheme: `#ffbe33` (gold), `#222831` (dark), `#f1f2f3` (light gray)
- [ ] Import Feane fonts: `'Dancing Script'` (headings), `'Open Sans'` (body) from Google Fonts
- [ ] Extract and document all Feane utility classes (`.layout_padding`, `.heading_container`, `.detail-box`, `.img-box`, `.options`, `.box`)
- [ ] Set up standardized spacing system (90px section padding matching Feane)
- [ ] Update [_includes/layouts/base.njk](/_includes/layouts/base.njk) to support Feane layout structure
- [ ] Update [_includes/header.njk](/_includes/header.njk) with Feane navbar (keep Sheshams nav text: Home, Menu, About, Contact, Gallery)
- [ ] Update [_includes/footer.njk](/_includes/footer.njk) to Feane's dark footer style

---

## Phase 2: Homepage Redesign 🏠

### 2.1: Hero Section
- [ ] Build Bootstrap carousel hero section (Feane pattern)
- [ ] Set hero area: min-height 100vh, flexbox column layout
- [ ] Create slider carousel with `#customCarousel1` (Feane's carousel ID)
- [ ] Add hero detail-box with:
  - [ ] Pre-title: "Premium Artisan Bakery"
  - [ ] Main h1: "Shesh Am's Bakers" (3.5rem font-size, Dancing Script)
  - [ ] Subtitle: "100% Vegetarian • Entirely Eggless • Handcrafted Daily"
  - [ ] Description text from current site
  - [ ] Two CTAs: "🎂 Order Now on WhatsApp" (primary), "📸 View Our Menu" (secondary)
- [ ] Add carousel indicators (12px white dots, 20px for active, gold background)
- [ ] Style with Feane's hero background and flexbox layout

### 2.2: Remove "Our Menu" Section
- [ ] Delete entire "Our Celebrated Creations" section from index.md
- [ ] Verify no menu showcase on homepage

### 2.3: "Why Choose Sheshams Bakers?" Section
- [ ] Create 3-card grid layout using Feane's `.box` + `.img-box` + `.detail-box` pattern
- [ ] Card 1 - 100% Vegetarian (icon: 🌱)
- [ ] Card 2 - Entirely Eggless (icon: ✨)
- [ ] Card 3 - Expert Craftsmanship (icon: 👨‍🍳)
- [ ] Apply Feane styling:
  - [ ] Dark background (#222831), white text
  - [ ] 175px circular image with 5px gold border
  - [ ] Hover effect: image scales to 1.1x
  - [ ] Gold accent (#ffbe33) on highlights
- [ ] Responsive: 1 col mobile, 2 tablet, 3 desktop

### 2.4: "Our Specialities" Section
- [ ] Create 4-item layout (3 in grid, 1 full-width) with Feane's `.food_section` styling
- [ ] Card 1: Custom Cakes (icon: 🎂) + "View Examples →" link
- [ ] Card 2: Premium Cupcakes (icon: 🧁) + "View Examples →" link
- [ ] Card 3: Artistic Designs (icon: ✨) + "View Examples →" link
- [ ] Card 4: Specialty Items & Custom Orders (icon: 🍰, full-width) + "Explore All →" link
- [ ] Apply Feane food card design:
  - [ ] Use `.box` structure
  - [ ] `.img-box` with circular emoji/icon (175px)
  - [ ] `.detail-box` with title, description
  - [ ] Hover: scale image 1.1x
  - [ ] Link styling with arrow icon

### 2.5: "How to Order Your Cake" Section (3-Step Process)
- [ ] Create 3-step timeline/process section (Feane's process card styling)
- [ ] Step 1: Message Us (icon: 💬)
  - [ ] Description: "Reach out on WhatsApp with your cake ideas, preferences, budget, and occasion date"
- [ ] Step 2: Consultation & Quote (icon: 📋)
  - [ ] Description: "We discuss design, flavors, ingredients, dietary needs, and provide you with pricing"
- [ ] Step 3: Creation (icon: 🎨)
  - [ ] Description: "Our expert bakers craft your cake with premium ingredients and artistic precision"
- [ ] No delivery step
- [ ] Style with Feane's card/number styling (dark backgrounds, gold accents)
- [ ] Add CTA button: "💬 Start Your Order" (WhatsApp link)

---

## Phase 3: Menu Page (Instagram Feed Gallery) 🍰

### 3.1: Create menu.html Page
- [ ] Create new file: [menu.html](menu.html)
- [ ] Use Feane's menu.html as reference
- [ ] Add `body class="sub_page"` (shorter hero area)
- [ ] Navigation: Same header as homepage, "Menu" nav-item is `.active`
- [ ] Page title: "Our Cakes"

### 3.2: Menu Filtering System
- [ ] Create `.filters_menu` with filter buttons from [_data/categories.json](_data/categories.json)
- [ ] Generate buttons:
  - [ ] "All" button (data-filter="*", active by default)
  - [ ] One button per category (Birthday, Cupcakes, Tresletches, Fondant, Speciality, Whipped Cream, Butter cream)
  - [ ] Button structure: `data-filter=".category-name-lowercase"`
- [ ] Style buttons with Feane's filter menu styling (gold active state, dark background)

### 3.3: Search Bar
- [ ] Add search input field above `.filters_menu`
- [ ] Placeholder text: "Search cakes, flavors, tags..."
- [ ] Create [assets/js/menu-search.js](assets/js/menu-search.js) for search functionality
- [ ] Search logic:
  - [ ] Filter by product title/name
  - [ ] Filter by caption/description text
  - [ ] Filter by tags from instagram-feed.json (all metadata)
  - [ ] Real-time filtering as user types
  - [ ] Display result counter: "X cakes found"
  - [ ] Case-insensitive matching

### 3.4: Menu Grid Layout
- [ ] Create grid container with Isotope.js for filtering animations
- [ ] Grid layout:
  - [ ] Desktop: 3 columns (col-lg-4)
  - [ ] Tablet: 2 columns (col-md-6)
  - [ ] Mobile: 1 column (col-sm-6)
- [ ] Each grid item class structure: `col-sm-6 col-md-6 col-lg-4 all [category-lowercase]`

### 3.5: Menu Item Cards
- [ ] Populate from [posts/instagram-feed.json](posts/instagram-feed.json)
- [ ] Each card structure using Feane's `.box` pattern:
  - [ ] `.img-box`: Image from instagram-feed.json path
  - [ ] `.detail-box`:
    - [ ] h5: Product title (from caption or metadata)
    - [ ] p: Description (from caption)
    - [ ] `.options` row:
      - [ ] Link to Instagram post (if available)
      - [ ] WhatsApp order button
- [ ] Add category classes dynamically from metadata (e.g., `class="all birthday cupcakes"`)
- [ ] Apply Feane food card hover effect (image scales 1.1x)

### 3.6: Isotope Integration
- [ ] Include Isotope.js library (Feane's reference)
- [ ] Initialize on page load
- [ ] Filter animations smooth (fade/scale)
- [ ] Update grid layout when items appear/disappear

---

## Phase 4: About Page 📖

### 4.1: Create about.html Page
- [ ] Create new file: [about.html](about.html)
- [ ] Use Feane's about.html as reference
- [ ] Add `body class="sub_page"` (shorter hero area)
- [ ] Navigation: "About" nav-item is `.active`

### 4.2: About Content (Two-Column Layout)
- [ ] Left column: Image (Sheshams Bakers logo or bakery image)
- [ ] Right column (Feane's `.detail-box` style):
  - [ ] h2: "We Are Sheshams Bakers"
  - [ ] Paragraph 1: "Welcome to Sheshams Bakers, where passion for baking meets artistic creativity. We specialize in creating beautiful, delicious custom cakes for every celebration."
  - [ ] Paragraph 2: "Each cake is handcrafted with care, using quality ingredients and innovative designs to make your special moment even more memorable."
  - [ ] h3: "What We Offer"
  - [ ] Bulleted list with emojis:
    - [ ] 🎂 Custom Cake Design
    - [ ] 🎉 Birthday Cakes
    - [ ] 💍 Wedding Cakes
    - [ ] 🧁 Cupcakes
    - [ ] ✨ Specialty Desserts
    - [ ] 🌱 Dietary Options (Vegan, Eggless)
  - [ ] CTA button: "📞 Order via WhatsApp" (WhatsApp link)

### 4.3: Apply Feane Styling
- [ ] Use two-column layout with flexbox (image left, content right)
- [ ] Dark background (#222831) for content area
- [ ] White text, gold accents for highlights
- [ ] Responsive: Stack on mobile (image above content)
- [ ] CTA button: Gold background (#ffbe33), Dark text

---

## Phase 5: Navigation & Structure Update 🔗

### 5.1: Header Navigation
- [ ] Remove "Book a Table" nav link from all pages
- [ ] Update nav links order: Home, Menu, About, Contact, Gallery-link
- [ ] Update nav link for Gallery: Points to separate gallery page (keep existing)
- [ ] Maintain WhatsApp icon in navbar
- [ ] Update all active state highlighting

### 5.2: Footer Update
- [ ] Apply Feane footer styling (dark background #222831, white text)
- [ ] Three-column layout:
  - [ ] Column 1: Contact info (address, phone, email)
  - [ ] Column 2: Logo + About tagline + Social icons
  - [ ] Column 3: Opening hours + Links
- [ ] Update social icons to FontAwesome (Feane's reference)
- [ ] Footer links: Home, About, Contact, Gallery, etc.
- [ ] Copyright: "© 2026 Sheshams Bakers. All rights reserved."

### 5.3: Remove Booking References
- [ ] Delete [pages/book.md](pages/book.md) file (if exists)
- [ ] Remove all book.html references from site
- [ ] Remove "Book a Table" CTA buttons from all pages

---

## Phase 6: CSS & Styling 💻

### 6.1: Create Feane-Based Style System
- [ ] Replace [assets/css/style.css](assets/css/style.css) with Feane's system
- [ ] Include all Feane CSS patterns:
  - [ ] `.hero_area` - Min 100vh, flexbox layout
  - [ ] `.slider_section` - Flex grows to fill space
  - [ ] `.carousel-indicators` - 12px white dots, gold active
  - [ ] `.layout_padding` - 90px vertical padding
  - [ ] `.layout_padding-bottom` - 90px bottom padding
  - [ ] `.heading_container` - Flex column, left-aligned
  - [ ] `.heading_container.heading_center` - Center-aligned
  - [ ] `.box` - Card container
  - [ ] `.img-box` - Image container (circular images: 175px, 5px gold border)
  - [ ] `.detail-box` - Content container (dark bg, white text)
  - [ ] `.options` - Flex row (price + cart)

### 6.2: Typography Setup
- [ ] Import Google Fonts: Dancing Script (headings), Open Sans (body)
- [ ] h1: 3.5rem, Dancing Script
- [ ] h2: 2.5rem, Dancing Script
- [ ] h5: Item titles (medium size)
- [ ] h6: Prices, subtitles
- [ ] p: Body text, Open Sans

### 6.3: Color Variables
- [ ] Primary gold: `#ffbe33` (buttons, accents, active states)
- [ ] Dark background: `#222831` (sections, cards)
- [ ] Light gray: `#f1f2f3` (food item backgrounds)
- [ ] White: `#ffffff` (text on dark)
- [ ] Black: `#0c0c0c` (main text)
- [ ] Dark gray: `#999` (borders, secondary)

### 6.4: Responsive Breakpoints
- [ ] Desktop: Full width
- [ ] Tablet (≤992px): Nav changes, offers flex vertically
- [ ] Small tablet (≤767px): About/sections stack
- [ ] Phone (≤576px): Single column layouts
- [ ] Small phone (≤480px): Offer section changes
- [ ] Extra small (≤430px): Additional responsive adjustments
- [ ] Very small (≤376px): Hero h1 reduces

### 6.5: Hover Effects & Animations
- [ ] Image hover: Scale 1.1x smoothly (no excessive movement)
- [ ] Button hover: Color transitions smooth
- [ ] Card hover: Box shadow increases
- [ ] Carousel indicators: Smooth transition
- [ ] All animations disabled on `prefers-reduced-motion`

### 6.6: Bootstrap Integration
- [ ] Ensure Bootstrap 4 grid system is available
- [ ] Column classes: `col-sm-6`, `col-md-6`, `col-lg-4`
- [ ] Responsive utilities working

---

## Phase 7: JavaScript & Interactivity 🔧

### 7.1: Update Main JavaScript
- [ ] Copy Feane's [assets/js/main.js](assets/js/main.js) as base
- [ ] Update mobile menu toggle functionality for Feane patterns
- [ ] Smooth scroll for anchor links
- [ ] Active nav state highlighting based on current page
- [ ] Mobile hamburger menu collapse on link click

### 7.2: Create Menu Search JavaScript
- [ ] Create [assets/js/menu-search.js](assets/js/menu-search.js)
- [ ] Function: Real-time search and filter
  - [ ] Listen to search input (keyup event)
  - [ ] Filter items by:
    - [ ] Product title
    - [ ] Caption/description
    - [ ] Tags (all metadata fields)
  - [ ] Hide/show items dynamically
  - [ ] Update result counter
  - [ ] Maintain active category filter integration
- [ ] Combine search + category filters seamlessly

### 7.3: Isotope Gallery Integration
- [ ] Include Isotope.js library (Feane's reference: 3.0.4)
- [ ] Initialize on menu.html page load
- [ ] Configure for category filtering
- [ ] Smooth animations on filter change
- [ ] Update layout when items change

### 7.4: Include Required Libraries
- [ ] jQuery 3.4.1
- [ ] Bootstrap 4 JS
- [ ] Owl Carousel 2.3.4 (if testimonials added later)
- [ ] Isotope Layout 3.0.4
- [ ] jQuery Nice Select 1.1.0 (for dropdowns)

### 7.5: Gallery.js Compatibility
- [ ] Ensure existing [assets/js/gallery.js](assets/js/gallery.js) still works for gallery page
- [ ] No conflicts with new menu search functionality
- [ ] Both can coexist on their respective pages

---

## Phase 8: Data Integration 📊

### 8.1: Categories Integration
- [ ] Read [_data/categories.json](_data/categories.json)
- [ ] Map categories to `.filters_menu` buttons
- [ ] Dynamic button generation from JSON
- [ ] Category classes: Lowercase, no spaces (e.g., "birthday" from "Birthday")

### 8.2: Instagram Feed Integration
- [ ] Read [posts/instagram-feed.json](posts/instagram-feed.json)
- [ ] Populate menu.html items from feed:
  - [ ] Image path: `/assets/images/instagram/[image-name]`
  - [ ] Title: From caption or metadata field
  - [ ] Description: From caption
  - [ ] Tags: Parse from caption or metadata
  - [ ] Instagram link: From instagram_link field
  - [ ] Category classes: From categories metadata
- [ ] Ensure all tags map to filter categories
- [ ] Handle missing fields gracefully

### 8.3: WhatsApp Integration
- [ ] Ensure all CTAs use WhatsApp links (format: `https://wa.me/[phone-number]`)
- [ ] Global phone number variable: Use from config/data file
- [ ] CTA buttons on: Hero, Why Choose cards, Specialities cards, Order Process, About page
- [ ] Link text: "💬 Order via WhatsApp", "🎂 Order Now on WhatsApp", etc.

---

## Phase 9: File Cleanup & Deletion 🗑️

- [ ] Delete or archive [sample/feane-1.0.0/](sample/feane-1.0.0/) folder (no longer needed after copying patterns)
- [ ] Remove [pages/book.md](pages/book.md) if exists
- [ ] Remove any redundant CSS files (backup copies, old versions)
- [ ] Ensure no broken asset paths remain
- [ ] Clean up any temporary files

---

## Phase 10: Testing & Verification ✅

### 10.1: Homepage Verification
- [ ] Hero carousel displays and functions
- [ ] CTAs direct to WhatsApp and menu correctly
- [ ] "Why Choose" 3-card section styled with Feane design
- [ ] "Our Specialities" 4-item section styled with Feane design
- [ ] "How to Order" 3-step process displays (no delivery step)
- [ ] No "Our Menu" section visible
- [ ] Responsive on mobile/tablet/desktop
- [ ] All fonts loaded (Dancing Script, Open Sans)
- [ ] Colors applied (gold, dark, light gray)

### 10.2: Menu Page Verification
- [ ] Menu page loads at menu.html
- [ ] Page title "Our Cakes" displays
- [ ] Filter buttons functional (click category → shows matching items)
- [ ] "All" button active by default
- [ ] Search bar visible and functional
- [ ] Search filters by name, caption, tags in real-time
- [ ] Result counter updates correctly
- [ ] Grid responsive: 3 cols → 2 → 1
- [ ] Isotope animations smooth
- [ ] Menu items load from instagram-feed.json
- [ ] Images display correctly
- [ ] WhatsApp CTA buttons present
- [ ] Instagram links functional (if available)

### 10.3: About Page Verification
- [ ] About page loads at about.html
- [ ] Two-column layout: image left, content right
- [ ] Heading "We Are Sheshams Bakers" displays
- [ ] Story content shows correctly
- [ ] "What We Offer" list with emojis displays
- [ ] CTA button functional (WhatsApp link)
- [ ] Feane styling applied (dark bg, white text, gold accents)
- [ ] Responsive: Stacks on mobile (image above content)

### 10.4: Navigation & Structure Verification
- [ ] "Book a Table" nav link removed from all pages
- [ ] Active nav items highlight correctly on each page
- [ ] All nav links functional (Home, Menu, About, Contact, Gallery)
- [ ] Mobile hamburger menu works
- [ ] Footer displays with Feane dark theme
- [ ] Footer links functional
- [ ] WhatsApp icon present in header
- [ ] Social icons in footer styled with FontAwesome

### 10.5: Design System Verification
- [ ] Gold (#ffbe33) applied to buttons, accents, active states
- [ ] Dark (#222831) applied to section backgrounds and cards
- [ ] Light gray (#f1f2f3) applied to backgrounds
- [ ] Dancing Script font loaded and applied to headings
- [ ] Open Sans font loaded and applied to body text
- [ ] Spacing: 90px section padding applied consistently
- [ ] Card images: Circular, 175px, 5px gold border
- [ ] Hover effects: Image scale 1.1x, smooth transitions
- [ ] All animations work on desktop
- [ ] Animations disabled on prefers-reduced-motion

### 10.6: Cross-Device Testing
- [ ] Desktop (1920px): Full layout, all elements visible
- [ ] Desktop (1440px): All elements visible
- [ ] Tablet (768px): Grid 2 cols, nav responsive
- [ ] Mobile (420px): Grid 1 col, stacked layout, hamburger menu
- [ ] Mobile (375px): All text readable, no horizontal scroll
- [ ] Mobile (320px): Extremely small phone, layout functional
- [ ] All breakpoints: No overlapping text, readable fonts

### 10.7: Functionality Testing
- [ ] Hero carousel auto-rotates (if enabled in Feane pattern)
- [ ] Carousel indicators work (click dot → slide to position)
- [ ] Filter buttons work (live filtering without page reload)
- [ ] Search bar filters in real-time (no lag)
- [ ] Combined filter + search works (e.g., "Birthday" category + search "chocolate")
- [ ] WhatsApp links open WhatsApp app/web
- [ ] Instagram links open in new tab
- [ ] All CTAs functional
- [ ] Form submissions work (if any forms present)

### 10.8: Browser Compatibility
- [ ] Chrome/Chromium: All features work
- [ ] Firefox: All features work
- [ ] Safari: All features work
- [ ] Edge: All features work
- [ ] Mobile browsers (Chrome, Safari): Responsive and functional

### 10.9: Performance Check
- [ ] Page loads quickly (< 3s on 4G)
- [ ] Images optimized (not oversized)
- [ ] CSS/JS minified (if applicable)
- [ ] No console errors
- [ ] No broken asset paths
- [ ] Lighthouse accessibility score acceptable

### 10.10: Content Accuracy
- [ ] All Sheshams content preserved (text, images, links)
- [ ] Categories match Sheshams' current offerings
- [ ] Instagram feed items display correctly
- [ ] WhatsApp phone number correct
- [ ] Social media links accurate
- [ ] About page content authentic to Sheshams

---

## Phase 11: Final Deployment Checks 🚀

- [ ] All files committed to version control
- [ ] Build process successful (npm run dev, npm run build)
- [ ] No console errors or warnings
- [ ] .env variables correct
- [ ] API keys/secrets not exposed in code
- [ ] Site runs locally without issues
- [ ] Ready for production deployment

---

## Notes

**Current Implementation Details:**
- Site uses Eleventy + Nunjucks templating
- Instagram feed synced via `scripts/sync-instagram.js`
- Categories defined in `_data/categories.json`
- Current nav: Home, Cakes, Gallery, About, Contact, WhatsApp

**Feane Reference:**
- Bootstrap 4 grid system
- Dance Script + Open Sans fonts
- Isotope.js for filtering
- jQuery Nice Select for dropdowns
- Color scheme: Gold (#ffbe33), Dark (#222831), Light (#f1f2f3)

**Key Changes:**
1. Homepage gets hero carousel + "Why Choose" + "Specialities" + 3-step order process (no "Our Menu" showcase)
2. Menu page becomes Instagram feed gallery with category filters + search
3. About page created with Feane's two-column layout
4. "Book a Table" completely removed
5. All styling updated to match Feane's design system

---

**Status**: Ready for implementation
**Last Updated**: April 15, 2026
