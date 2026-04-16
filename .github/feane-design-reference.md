# Feane Design Reference Guide

Complete style mappings extracted from the Feane template for SheshamsBakers. Copy-paste ready code snippets.

## Table of Contents
- [Colors](#colors)
- [Typography](#typography)
- [Buttons](#buttons)
- [Navbar](#navbar)
- [Cards](#cards)
- [Sections](#sections)
- [Utilities](#utilities)

---

## Colors

### Color Palette
```css
:root {
  --color-gold: #ffbe33;
  --color-gold-dark: #e69c00;
  --color-dark: #222831;
  --color-light: #f1f2f3;
  --color-white: #ffffff;
  --color-text: #0c0c0c;
  --color-border: #999;
  --color-muted: #999999;
}
```

### Usage
- **CTA Buttons & Accents**: `#ffbe33` (gold)
- **Dark Backgrounds & Cards**: `#222831` (dark gray/black)
- **Light Backgrounds & Card Tops**: `#f1f2f3` (light gray)
- **Primary Text**: `#ffffff` (white on dark), `#0c0c0c` (on light)
- **Hover State**: `#e69c00` (darker gold)

---

## Typography

### Font Stack
```css
@import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&family=Open+Sans:wght@400;600;700&display=swap");

h1, h2, h3 {
  font-family: 'Dancing Script', cursive;
}

body, p, a, span, div {
  font-family: 'Open Sans', sans-serif;
}
```

### Heading Styles
```css
h1 {
  font-size: 3.5rem;
  font-weight: bold;
}

h2 {
  font-size: 2.5rem;
  font-weight: bold;
}

h3, h5 {
  font-weight: 600;
}

h2 span {
  color: #ffbe33;  /* Gold accent in headings */
}
```

### Body Text
```css
p {
  font-size: 14px;
  line-height: 1.6;
}

.muted-text {
  color: #999999;
}
```

---

## Buttons

### Standard Button (Full Width)
```css
.btn, .btn-primary {
  display: inline-block;
  padding: 10px 45px;
  background-color: #ffbe33;
  color: #ffffff;
  border-radius: 45px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  text-decoration: none;
}

.btn:hover, .btn-primary:hover {
  background-color: #e69c00;
}
```

### Icon Button (Circular, 40px)
```css
.btn-icon {
  width: 40px;
  height: 40px;
  padding: 0;
  border-radius: 100%;
  background: #ffbe33;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
}

.btn-icon svg, .btn-icon i {
  width: 18px;
  height: auto;
  fill: #ffffff;
  color: #ffffff;
}

.btn-icon:hover {
  background: #e69c00;
}
```

### Small Button (Order Online Style)
```css
.btn-small {
  padding: 8px 30px;
  background-color: #ffbe33;
  color: #ffffff;
  border-radius: 45px;
  border: none;
  transition: all 0.3s;
}

.btn-small:hover {
  background-color: #e69c00;
}
```

---

## Navbar

### Navbar Container
```css
.header_section {
  padding: 15px 0;
}

.header_section .container-fluid {
  padding-right: 25px;
  padding-left: 25px;
}

.custom_nav-container {
  padding: 0;
}

.navbar-brand span {
  font-weight: bold;
  font-size: 32px;
  color: #ffffff;
  font-family: 'Dancing Script', cursive;
}
```

### Navigation Links
```css
.custom_nav-container .navbar-nav {
  padding-left: 18%;
}

.custom_nav-container .navbar-nav .nav-item .nav-link {
  padding: 5px 20px;
  color: #ffffff;
  text-align: center;
  text-transform: uppercase;
  border-radius: 5px;
  transition: all 0.3s;
}

.custom_nav-container .navbar-nav .nav-item:hover .nav-link,
.custom_nav-container .navbar-nav .nav-item.active .nav-link {
  color: #ffbe33;
}
```

### Hamburger Menu
```css
.custom_nav-container .navbar-toggler {
  padding: 0;
  width: 37px;
  height: 42px;
  outline: none;
  background: none;
  border: none;
}

.custom_nav-container .navbar-toggler span {
  display: block;
  width: 35px;
  height: 4px;
  background-color: #ffffff;
  margin: 7px 0;
  border-radius: 5px;
  transition: all 0.3s;
}

.custom_nav-container .navbar-toggler span::before,
.custom_nav-container .navbar-toggler span::after {
  content: "";
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 5px;
  transition: all 0.3s;
}

.custom_nav-container .navbar-toggler span::before {
  top: -10px;
}

.custom_nav-container .navbar-toggler span::after {
  top: 10px;
}

.custom_nav-container .navbar-toggler[aria-expanded="true"] span {
  background-color: transparent;
  transform: rotate(45deg);
}

.custom_nav-container .navbar-toggler[aria-expanded="true"] span::before,
.custom_nav-container .navbar-toggler[aria-expanded="true"] span::after {
  top: 0;
  transform: rotate(90deg);
}
```

### User Options
```css
.user_option {
  display: flex;
  align-items: center;
}

.user_option a {
  margin: 0 10px;
  color: #ffffff;
  transition: all 0.3s;
}

.user_option a:hover {
  color: #ffbe33;
}

.user_option .cart_link svg,
.user_option .user_link i {
  fill: #ffffff;
  transition: all 0.3s;
}

.user_option a:hover svg,
.user_option a:hover i {
  fill: #ffbe33;
}

.user_option .order_online {
  display: inline-block;
  padding: 8px 30px;
  background-color: #ffbe33;
  color: #ffffff;
  border-radius: 45px;
  transition: all 0.3s;
  border: none;
  margin-left: 15px;
}

.user_option .order_online:hover {
  background-color: #e69c00;
}
```

---

## Cards

### Half White/Half Black Card (Signature Design)
```css
.food_section .box {
  position: relative;
  margin-top: 25px;
  background: linear-gradient(to bottom, #f1f2f3 25px, #222831 25px);
  border-radius: 15px;
  overflow: hidden;
  color: #ffffff;
  transition: all 0.3s;
}

.food_section .box .img-box {
  background: #f1f2f3;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 215px;
  border-radius: 0 0 0 45px;
  margin: -1px;
  padding: 25px;
}

.food_section .box .img-box img {
  max-width: 100%;
  max-height: 145px;
  transition: all 0.2s;
}

.food_section .box .detail-box {
  padding: 25px;
  color: #ffffff;
}

.food_section .box .detail-box h5 {
  font-weight: 600;
  margin: 0;
  font-family: 'Dancing Script', cursive;
  font-size: 24px;
}

.food_section .box .detail-box p {
  font-size: 15px;
  margin-top: 10px;
}

.food_section .box .detail-box h6 {
  margin-top: 10px;
  font-family: 'Dancing Script', cursive;
}

.food_section .box .detail-box h6 span {
  font-size: 2.5rem;
  font-weight: bold;
  color: #ffbe33;
}

.food_section .box .options {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.food_section .box .options a {
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background: #ffbe33;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
}

.food_section .box .options a svg,
.food_section .box .options a i {
  width: 18px;
  height: auto;
  fill: #ffffff;
  color: #ffffff;
}

.food_section .box:hover .img-box img {
  transform: scale(1.1);
}

.food_section .box:hover .options a {
  background: #e69c00;
}
```

### Offer Box Card (Dark with Circular Image)
```css
.offer_section .box {
  display: flex;
  align-items: center;
  margin-top: 45px;
  border-radius: 5px;
  padding: 20px 15px;
  background-color: #222831;
  color: #ffffff;
  transition: all 0.3s;
}

.offer_section .box .img-box {
  width: 175px;
  min-width: 175px;
  height: 175px;
  margin-right: 15px;
  position: relative;
  border-radius: 100%;
  border: 5px solid #ffbe33;
  overflow: hidden;
  background: #f1f2f3;
  display: flex;
  justify-content: center;
  align-items: center;
}

.offer_section .box .img-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.2s;
}

.offer_section .box .detail-box h5 {
  font-family: 'Dancing Script', cursive;
  font-size: 24px;
  margin: 0;
}

.offer_section .box .detail-box h6 {
  font-family: 'Dancing Script', cursive;
  margin: 10px 0;
}

.offer_section .box .detail-box h6 span {
  font-size: 2.5rem;
  font-weight: bold;
  color: #ffbe33;
}

.offer_section .box .detail-box a {
  display: inline-block;
  padding: 10px 30px;
  background-color: #ffbe33;
  color: #ffffff;
  border-radius: 45px;
  transition: all 0.3s;
  border: none;
  margin-top: 15px;
}

.offer_section .box .detail-box a:hover {
  background-color: #e69c00;
}

.offer_section .box:hover .img-box img {
  transform: scale(1.1);
}
```

---

## Sections

### Section with Padding Scale
```css
.layout_padding {
  padding: 90px 0;
}

.layout_padding2 {
  padding: 75px 0;
}

.layout_padding-top {
  padding-top: 90px;
}

.layout_padding-bottom {
  padding-bottom: 90px;
}

.layout_padding2-top {
  padding-top: 75px;
}

.layout_padding2-bottom {
  padding-bottom: 75px;
}
```

### Hero Section
```css
.hero_area {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.hero_area .bg-box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.hero_area .bg-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero_area > * {
  position: relative;
  z-index: 1;
}
```

### About Section (Dark Background)
```css
.about_section {
  background: #222831;
  color: #ffffff;
  padding: 75px 0;
}

.about_section .row {
  align-items: center;
}

.about_section .detail-box a {
  display: inline-block;
  padding: 10px 45px;
  background-color: #ffbe33;
  color: #ffffff;
  border-radius: 45px;
  transition: all 0.3s;
  border: none;
  margin-top: 15px;
}

.about_section .detail-box a:hover {
  background-color: #e69c00;
}
```

### Heading Container
```css
.heading_container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 25px;
}

.heading_container h2 {
  position: relative;
  margin-bottom: 0;
  font-size: 2.5rem;
  font-weight: bold;
}

.heading_container h2 span {
  color: #ffbe33;
}

.heading_container p {
  margin-top: 10px;
  margin-bottom: 0;
}

.heading_container.heading_center {
  align-items: center;
  text-align: center;
}
```

---

## Utilities

### Reset Styles
```css
a, a:hover, a:focus {
  text-decoration: none;
}

a:hover, a:focus {
  color: initial;
}

.btn, .btn:focus {
  outline: none !important;
  box-shadow: none;
}

button {
  border: none;
  outline: none;
}
```

### Flex Utilities
```css
.d-flex {
  display: flex;
}

.justify-center {
  justify-content: center;
}

.justify-between {
  justify-content: space-between;
}

.align-center {
  align-items: center;
}

.flex-column {
  flex-direction: column;
}
```

### Responsive Breakpoints
```css
/* Mobile first = no media query */

/* Tablet and above */
@media (min-width: 768px) {
  /* tablet styles */
}

/* Desktop and above */
@media (min-width: 1024px) {
  /* desktop styles */
}

/* Mobile overrides */
@media (max-width: 767px) {
  /* mobile-specific */
}
```

---

## Quick Copy-Paste Templates

### Product/Menu Card HTML
```html
<div class="food_section__box">
  <div class="img-box">
    <img src="image.jpg" alt="Product Name">
  </div>
  <div class="detail-box">
    <h5>Product Name</h5>
    <h6>$<span>12.99</span></h6>
    <p>Short description of the product</p>
    <div class="options">
      <a href="#" title="Add to cart" class="btn-icon">
        <i class="fa fa-shopping-cart"></i>
      </a>
      <a href="#" title="Quick view" class="btn-icon">
        <i class="fa fa-eye"></i>
      </a>
    </div>
  </div>
</div>
```

### Section Header HTML
```html
<div class="layout_padding">
  <div class="container">
    <div class="heading_container heading_center">
      <h2>
        Section Title
        <span>Highlight</span>
      </h2>
      <p>Subtitle or description goes here</p>
    </div>
  </div>
</div>
```

### Button States HTML
```html
<!-- Primary Button -->
<a href="#" class="btn btn-primary">Call to Action</a>

<!-- Small Button -->
<a href="#" class="btn btn-small">Order Now</a>

<!-- Icon Button -->
<a href="#" class="btn-icon" title="View">
  <i class="fa fa-eye"></i>
</a>
```

---

## Implementation Checklist

- [ ] Import Google Fonts (Dancing Script + Open Sans)
- [ ] Define color variables
- [ ] Update all button styles to gold + pill shape
- [ ] Convert cards to half white/half black gradient
- [ ] Update navbar with Feane styling
- [ ] Apply spacing scale classes
- [ ] Test hover transitions (0.3s smooth)
- [ ] Verify responsive breakpoints
- [ ] Check color contrast (WCAG AA minimum)
- [ ] Preserve SheshamsBakers branding and content
