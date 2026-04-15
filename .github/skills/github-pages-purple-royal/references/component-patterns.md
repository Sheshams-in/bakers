# Purple Royal Component Patterns

Ready-to-use CSS patterns for common website components. All use CSS variables for theming.

## Button Styles

### Primary Button (Main Action)
```html
<button class="btn btn-primary">Get Started</button>
```

```css
.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-primary {
  background-color: var(--color-primary);
  color: white;
}

.btn-primary:hover {
  background-color: var(--color-primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 8px 12px rgba(123, 58, 237, 0.3);
}

.btn-primary:active {
  transform: translateY(0);
}

.btn-primary:focus {
  outline: 2px solid var(--color-primary-dark);
  outline-offset: 2px;
}
```

### Secondary Button (Alternative Action)
```html
<button class="btn btn-secondary">Learn More</button>
```

```css
.btn-secondary {
  background-color: transparent;
  color: var(--color-primary);
  border: 2px solid var(--color-primary-light);
}

.btn-secondary:hover {
  background-color: var(--color-primary-light);
  border-color: var(--color-primary);
}

.btn-secondary:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

### Accent Button (Special CTA)
```html
<button class="btn btn-accent">Subscribe Now</button>
```

```css
.btn-accent {
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  color: white;
  font-weight: 600;
}

.btn-accent:hover {
  filter: brightness(1.1);
  box-shadow: 0 12px 24px rgba(123, 58, 237, 0.4);
}
```

## Card Component

```html
<div class="card">
  <img src="image.jpg" alt="Description" class="card-image">
  <div class="card-content">
    <h3 class="card-title">Card Title</h3>
    <p class="card-text">Card description text goes here.</p>
    <button class="btn btn-primary btn-sm">Read More</button>
  </div>
</div>
```

```css
.card {
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 
    0 2px 4px rgba(123, 58, 237, 0.08),
    0 8px 16px rgba(123, 58, 237, 0.12);
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid var(--color-border);
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 
    0 4px 8px rgba(123, 58, 237, 0.12),
    0 16px 32px rgba(123, 58, 237, 0.2);
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-content {
  padding: 1.5rem;
}

.card-title {
  margin: 0 0 0.5rem 0;
  color: var(--color-primary-dark);
  font-size: 1.25rem;
  font-weight: 600;
}

.card-text {
  color: var(--color-text-light);
  line-height: 1.6;
  margin: 0 0 1rem 0;
}
```

## Navigation Bar

```html
<nav class="navbar">
  <a href="/" class="navbar-logo">Brand</a>
  <ul class="navbar-menu">
    <li><a href="#home" class="navbar-link">Home</a></li>
    <li><a href="#about" class="navbar-link">About</a></li>
    <li><a href="#services" class="navbar-link">Services</a></li>
    <li><button class="btn btn-primary btn-sm">Contact</button></li>
  </ul>
</nav>
```

```css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: white;
  box-shadow: 0 2px 4px rgba(123, 58, 237, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar-logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-primary);
  text-decoration: none;
}

.navbar-menu {
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
}

.navbar-link {
  color: var(--color-text);
  text-decoration: none;
  font-weight: 500;
  position: relative;
  transition: color 200ms ease;
}

.navbar-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--color-primary);
  transition: width 300ms ease;
}

.navbar-link:hover {
  color: var(--color-primary);
}

.navbar-link:hover::after {
  width: 100%;
}

@media (max-width: 768px) {
  .navbar-menu {
    gap: 1rem;
    flex-direction: column;
  }
}
```

## Hero Section

```html
<section class="hero">
  <h1 class="hero-title">Welcome to Our Brand</h1>
  <p class="hero-subtitle">Create something amazing with us</p>
  <button class="btn btn-accent">Get Started</button>
</section>
```

```css
.hero {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  color: white;
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
  pointer-events: none;
}

.hero-title {
  font-size: clamp(2rem, 8vw, 4rem);
  font-weight: 700;
  margin: 0 0 1rem 0;
  position: relative;
  z-index: 1;
  letter-spacing: -1px;
}

.hero-subtitle {
  font-size: 1.5rem;
  font-weight: 300;
  margin: 0 0 2rem 0;
  max-width: 600px;
  position: relative;
  z-index: 1;
  opacity: 0.95;
}

.hero .btn {
  position: relative;
  z-index: 1;
}
```

## Feature Grid

```html
<section class="features">
  <div class="feature">
    <div class="feature-icon">🎨</div>
    <h3 class="feature-title">Beautiful Design</h3>
    <p class="feature-text">Crafted with elegance and attention to detail.</p>
  </div>
  <!-- Repeat for each feature -->
</section>
```

```css
.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  padding: 3rem 2rem;
}

.feature {
  text-align: center;
  padding: 2rem;
  border-radius: 12px;
  background-color: var(--color-bg-secondary);
  transition: all 300ms ease;
}

.feature:hover {
  background-color: var(--color-primary-light);
  transform: translateY(-4px);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-primary);
  margin: 0 0 0.5rem 0;
}

.feature-text {
  color: var(--color-text-light);
  line-height: 1.6;
  margin: 0;
}
```

## Footer

```html
<footer class="footer">
  <div class="footer-content">
    <div class="footer-section">
      <h4>Company</h4>
      <ul>
        <li><a href="#">About</a></li>
        <li><a href="#">Blog</a></li>
        <li><a href="#">Careers</a></li>
      </ul>
    </div>
    <div class="footer-section">
      <h4>Legal</h4>
      <ul>
        <li><a href="#">Privacy</a></li>
        <li><a href="#">Terms</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; 2024 Your Company. All rights reserved.</p>
  </div>
</footer>
```

```css
.footer {
  background: linear-gradient(to bottom, var(--color-primary-dark), var(--color-primary));
  color: white;
  padding: 3rem 2rem 1rem;
  margin-top: 4rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto 2rem;
}

.footer-section h4 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  opacity: 0.9;
}

.footer-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-section li {
  margin-bottom: 0.5rem;
}

.footer-section a {
  color: white;
  text-decoration: none;
  opacity: 0.7;
  transition: opacity 200ms ease;
}

.footer-section a:hover {
  opacity: 1;
  text-decoration: underline;
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.9rem;
  opacity: 0.7;
}
```

## Form Elements

```html
<form class="form">
  <div class="form-group">
    <label for="email" class="form-label">Email</label>
    <input type="email" id="email" class="form-input" placeholder="your@email.com" required>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

```css
.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  font-weight: 500;
  color: var(--color-text);
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid var(--color-border);
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  transition: all 200ms ease;
}

.form-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(123, 58, 237, 0.1);
}

.form-input::placeholder {
  color: var(--color-text-light);
}
```

## Usage Tips

1. **Copy-paste ready**: Each component is self-contained and can be used independently
2. **CSS variables**: All colors reference CSS variables for easy theming
3. **Responsive**: Components use flexbox/grid and `clamp()` for responsive sizing
4. **Accessibility**: Focus states, proper semantic HTML, color contrast compliant
5. **Performance**: Minimal animations, no external dependencies (fonts cached by browser)
