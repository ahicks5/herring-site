# The Last City: Age of Darkness - Author Website

A dark, gothic single-page website for Chrislyn R. Herring's debut novel "The Last City: Age of Darkness".

Built with vanilla HTML, CSS, and JavaScript — no frameworks, no build tools required.

---

## Quick Start

### Preview Locally

Simply open `index.html` in your web browser:

1. Navigate to the `the-last-city-website` folder
2. Double-click `index.html` to open in your default browser
3. Or right-click → "Open with" → Choose your preferred browser

For development with live reload, you can use any simple HTTP server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (npx)
npx serve

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

---

## Deploy to Production

### Netlify (Drag & Drop)

1. Go to [netlify.com](https://netlify.com) and sign up/log in
2. From your dashboard, drag the entire `the-last-city-website` folder onto the deploy zone
3. Done! Your site will be live at a random Netlify subdomain
4. (Optional) Configure a custom domain in Site Settings → Domain Management

### Netlify (Git Integration)

1. Push this folder to a GitHub/GitLab/Bitbucket repository
2. In Netlify, click "Add new site" → "Import an existing project"
3. Connect your repository
4. Deploy settings:
   - Build command: (leave blank)
   - Publish directory: `./` or the folder name
5. Click "Deploy site"

### GitHub Pages

1. Create a new GitHub repository
2. Push all files to the `main` branch
3. Go to repository Settings → Pages
4. Under "Source", select "Deploy from a branch"
5. Select `main` branch and `/ (root)` folder
6. Click Save
7. Your site will be live at `https://yourusername.github.io/repository-name`

### Vercel

1. Push to a Git repository
2. Import the project at [vercel.com](https://vercel.com)
3. Framework preset: "Other"
4. Deploy

---

## Customization Guide

### Replace Images

Add your actual images to the `images/` folder:

| File | Recommended Size | Notes |
|------|-----------------|-------|
| `book-cover.jpg` | 600×900px (2:3 ratio) | High quality, optimized for web |
| `author-photo.jpg` | 600×800px (3:4 ratio) | Professional headshot |
| `favicon.png` | 32×32px or 64×64px | Square, simple design |

### Update Purchase URL

Search for `#` placeholders that link to the book purchase page:

**In `index.html`:**
```html
<!-- Find all instances of: -->
<a href="#" class="btn btn-primary

<!-- Replace "#" with your actual purchase URL, e.g.: -->
<a href="https://www.amazon.com/dp/YOUR_BOOK_ID" class="btn btn-primary
```

Locations to update:
- Hero section "Get Your Copy" button (line ~70)
- Book section "Order Now" button (line ~113)
- Modal "Claim Your Discount" button (line ~202)
- Nav "Get Your Copy" button (line ~45)

### Update Promo Code

**In `index.html`** (line ~198):
```html
<span class="code">LASTCITY10</span>
```

**In `script.js`** (line ~159):
```javascript
const code = 'LASTCITY10';
```

### Connect Newsletter Form

Replace the placeholder form action with your email service endpoint:

**In `index.html`**, find all instances of:
```html
action="#newsletter-signup"
```

Replace with your actual endpoint:

**Mailchimp:**
```html
action="https://YOUR_DC.list-manage.com/subscribe/post?u=YOUR_U&id=YOUR_ID"
```

**ConvertKit:**
```html
action="https://app.convertkit.com/forms/YOUR_FORM_ID/subscriptions"
```

**Note:** You may also need to update the form method and add hidden fields depending on your email service requirements.

### Update Social Media Links

Search for social media `href="#"` placeholders in `index.html`:

```html
<!-- Author section (~line 140-160) -->
<a href="#" class="social-link" aria-label="Instagram">
<a href="#" class="social-link" aria-label="TikTok">
<a href="#" class="social-link" aria-label="Goodreads">

<!-- Footer section (~line 235-245) -->
<!-- Same links repeated -->
```

Replace `#` with actual profile URLs:
```html
<a href="https://instagram.com/yourhandle" class="social-link" aria-label="Instagram">
<a href="https://tiktok.com/@yourhandle" class="social-link" aria-label="TikTok">
<a href="https://goodreads.com/author/show/YOUR_ID" class="social-link" aria-label="Goodreads">
```

### Customize Colors

All colors are defined as CSS custom properties at the top of `styles.css`:

```css
:root {
    /* Primary Backgrounds */
    --color-bg-primary: #1A1A1E;        /* Deep charcoal/near-black */
    --color-bg-secondary: #2C2C34;       /* Dark slate gray for cards */
    --color-bg-tertiary: #232328;        /* Slightly lighter for depth */

    /* Accents & Borders */
    --color-accent-subtle: #6B6B73;      /* Ash/stone gray */
    --color-border: #3A3A42;             /* Subtle borders */

    /* Text Colors */
    --color-text-heading: #E8E4DF;       /* Silver white - headings */
    --color-text-body: #D4CFC7;          /* Warm off-white - body */
    --color-text-muted: #9A9A9E;         /* Muted text */

    /* Accent Colors (Crimson) */
    --color-primary: #9B2335;            /* Crimson red - primary accent */
    --color-primary-hover: #B82E42;      /* Muted crimson - hover state */
    --color-primary-dark: #7A1C2A;       /* Darker crimson */
}
```

### Change Popup Timing

**In `script.js`** (line ~23):
```javascript
const CONFIG = {
    popupDelay: 3000,  // Change this value (in milliseconds)
    // ...
};
```

### Update Meta Tags / SEO

**In `index.html`** head section:
```html
<meta name="description" content="Your description here">
<meta property="og:title" content="Your OG title">
<meta property="og:description" content="Your OG description">
<meta property="og:image" content="images/book-cover.jpg">
<meta property="og:url" content="https://your-actual-url.com">
```

---

## File Structure

```
the-last-city-website/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js           # JavaScript functionality
├── favicon.png         # Browser tab icon (add your own)
├── README.md           # This file
└── images/
    ├── book-cover.jpg  # Book cover image (add your own)
    └── author-photo.jpg # Author photo (add your own)
```

---

## Features

- **Fully Responsive** — Mobile-first design that looks great on all devices
- **Smooth Scroll Navigation** — Fixed nav with transparent→solid transition
- **Mobile Hamburger Menu** — Touch-friendly navigation for small screens
- **Promo Popup Modal** — Timed popup with session storage (shows once per visit)
- **Bottom Ribbon Banner** — Persistent promo reminder after modal closes
- **Newsletter Forms** — Ready to connect to Mailchimp/ConvertKit
- **Lazy Loading Images** — Performance optimization for author photo
- **Scroll Animations** — Subtle fade-in effects as content enters viewport
- **Accessibility** — Semantic HTML, ARIA labels, keyboard navigation
- **Print Styles** — Clean output when printed
- **Reduced Motion** — Respects user preferences for reduced animations

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS 12+)
- Chrome for Android

---

## Performance Tips

1. **Optimize Images** — Compress book-cover.jpg and author-photo.jpg using tools like [TinyPNG](https://tinypng.com) or [Squoosh](https://squoosh.app)

2. **Add WebP Versions** — For better compression, create WebP versions of images:
   ```html
   <picture>
     <source srcset="images/book-cover.webp" type="image/webp">
     <img src="images/book-cover.jpg" alt="...">
   </picture>
   ```

3. **Minify CSS/JS** — For production, minify files using tools like [CSS Minifier](https://cssminifier.com) or [JSCompress](https://jscompress.com)

---

## License

This website template is provided for use by Chrislyn R. Herring. All book content, branding, and intellectual property remain the property of the author.

---

## Support

For questions about customization or deployment, refer to:
- [Netlify Documentation](https://docs.netlify.com)
- [GitHub Pages Documentation](https://docs.github.com/pages)
- [MDN Web Docs](https://developer.mozilla.org)

---

*Website crafted with care for "The Last City: Age of Darkness"*
