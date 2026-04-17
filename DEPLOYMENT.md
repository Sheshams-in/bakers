# Deployment Guide - SheshamsBakers

This site is built with **Eleventy** and configured to work across multiple deployment scenarios without code changes.

## Current Setup (GitHub Pages Project)

**URL:** https://sheshams-in.github.io/bakers/  
**Environment Variable:** `ELEVENTY_PATH_PREFIX=/bakers/` (default)

```bash
npm run build  # Builds to _site/ with /bakers/ prefix
```

---

## Deploying to Different Scenarios

### Scenario 1: Custom Domain (Root)
**URL:** https://sheshams-bakers.com/ or https://yourdomain.com/

Build with:
```bash
export ELEVENTY_PATH_PREFIX="/"
npm run build
```

Or as a one-liner:
```bash
ELEVENTY_PATH_PREFIX="/" npm run build
```

No code changes needed—the `| url` filter and `window.basePath` will automatically adapt.

---

### Scenario 2: Subdirectory on Custom Domain
**URL:** https://yourdomain.com/shop/ or https://yourdomain.com/cakes/

Build with:
```bash
export ELEVENTY_PATH_PREFIX="/shop/"
npm run build
```

Or:
```bash
ELEVENTY_PATH_PREFIX="/shop/" npm run build
```

---

### Scenario 3: Deploy to Netlify
**URL:** https://sheshams-bakers.netlify.app/ (or custom domain)

**Netlify Site Settings:**
- Build command: `npm run build`
- Publish directory: `_site`
- Environment variables: `ELEVENTY_PATH_PREFIX="/"` (Netlify deploys at root by default)

---

### Scenario 4: Deploy to Vercel
**URL:** https://sheshams-bakers.vercel.app

**vercel.json:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "_site"
}
```

**Environment:** `ELEVENTY_PATH_PREFIX="/"`

---

## How It Works

### 1. **Eleventy's `pathPrefix` Configuration** (`.eleventy.js`)
```javascript
const pathPrefix = process.env.ELEVENTY_PATH_PREFIX || '/bakers/';
```
- Sets the prefix for the `| url` filter in templates
- Defaults to `/bakers/` (GitHub Pages project)
- Override with `ELEVENTY_PATH_PREFIX` environment variable

### 2. **Template Asset Links** (HTML)
```nunjucks
<link href="{{ '/assets/css/style.css' | url }}" rel="stylesheet" />
<script src="{{ '/assets/js/main.js' | url }}"></script>
```
- The `| url` filter automatically adds the `pathPrefix`
- On GitHub Pages: becomes `/bakers/assets/css/style.css`
- On custom domain root: becomes `/assets/css/style.css`

### 3. **JavaScript Dynamic Paths** (`base.njk`)
```javascript
window.basePath = /* auto-detected from current URL */
fetch(window.basePath + '/posts/instagram-feed.json')
```
- `window.basePath` is auto-detected by analyzing `window.location.pathname`
- Works across all deployment scenarios
- Used by `theme-switcher.js`, `menu-search.js`, `gallery.js`

---

## Quick Reference: Different Hosting Scenarios

| Hosting | URL | Build Command | Notes |
|---------|-----|---|---|
| **GitHub Pages (current)** | `sheshams-in.github.io/bakers/` | `npm run build` | Default, no env var needed |
| **Custom domain at root** | `sheshams-bakers.com/` | `ELEVENTY_PATH_PREFIX="/" npm run build` | Most common upgrade |
| **Subdirectory** | `example.com/cakes/` | `ELEVENTY_PATH_PREFIX="/cakes/" npm run build` | Rare but supported |
| **Netlify** | `yourdomain.netlify.app/` | Set env var in Netlify UI | Easy migration path |
| **Vercel** | `yourdomain.vercel.app/` | Use `vercel.json` | Similar to Netlify |
| **Local development** | `localhost:3000/` | `npm run dev` | Automatically `pathPrefix="/"` |

---

## Migrating to a New Domain

### Step 1: Update Repository (Optional)
Change DNS or GitHub Pages settings as needed.

### Step 2: Rebuild with New Path Prefix
```bash
# For custom domain root:
ELEVENTY_PATH_PREFIX="/" npm run build

# Or update .eleventy.js if permanent:
export ELEVENTY_PATH_PREFIX="/"
```

### Step 3: Deploy
No code changes needed—just push the rebuilt `_site/` or follow your hosting platform's deployment process.

---

## Testing Different Deployments Locally

### Test as if deployed to root:
```bash
ELEVENTY_PATH_PREFIX="/" npm run build
# Open a local HTTP server pointing to _site/
```

### Test as if deployed to /bakers/:
```bash
npm run build  # Default uses /bakers/
# Serve from _site/ at yourlocalserver:8000/bakers/
```

---

## Troubleshooting

### Assets Return 404 After Migration
**Problem:** Files not loading after domain change.  
**Cause:** `ELEVENTY_PATH_PREFIX` not set correctly for new deployment path.  
**Solution:** Rebuild with correct prefix and redeploy.

```bash
ELEVENTY_PATH_PREFIX="/new-path/" npm run build
```

### Links Broken After Migration
**Problem:** Internal links like `/about/` no longer work.  
**Cause:** Template links not using `| url` filter.  
**Solution:** Ensure all internal links in templates use:

```nunjucks
<a href="{{ '/about/' | url }}">About</a>
```

### JavaScript Resources Missing
**Problem:** Theme CSS or menu data not loading.  
**Cause:** `window.basePath` not detecting correctly or scripts using hardcoded paths.  
**Solution:** Check browser console for detected basePath and verify scripts use `window.basePath`.

---

## Environment Variables Summary

| Variable | Default | Example | Purpose |
|---|---|---|---|
| `ELEVENTY_PATH_PREFIX` | `/bakers/` | `/`, `/shop/`, `/bakers/` | Controls URL prefix for all assets & links |

---

## Future Checklist When Migrating

- [ ] Update `ELEVENTY_PATH_PREFIX` environment variable
- [ ] Rebuild: `ELEVENTY_PATH_PREFIX="..." npm run build`
- [ ] Test asset loading in browser DevTools (should see correct paths)
- [ ] Verify `window.basePath` is set correctly (check console)
- [ ] Test theme switcher, menu search, gallery
- [ ] Test all internal navigation links
- [ ] Verify favicon and social media images load
- [ ] Check no hardcoded absolute URLs remain (should be none)

---

For questions or issues, check the console for the detected `basePath` and verify your `ELEVENTY_PATH_PREFIX` matches your deployment location.
