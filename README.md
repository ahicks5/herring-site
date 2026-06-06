# Chrislyn R. Herring — Author Website

A clean, literary single-page website for dark fantasy author **Chrislyn R. Herring**, with her
upcoming debut novel featured prominently.

Aesthetic: *forest whimsical* — cream base, forest-green accent, elegant serif headings (Playfair
Display) over a simple sans-serif body (Raleway).

Built with vanilla HTML, CSS, and JavaScript — no frameworks, no build tools required.

---

## Structure

Single page, anchor-based navigation (same deploy model as before — nothing about hosting changes):

| Section | Anchor | Purpose |
|---------|--------|---------|
| **Home** | `#home` | Author intro hero + name, tagline, primary CTAs |
| **Countdown** | `#countdown` | Featured upcoming book + live release countdown |
| **Books** | `#books` | The book: cover, full synopsis, genre, characters, "coming soon" |
| **The Author** | `#author` | Bio + headshot |
| **Connect** | `#connect` | Newsletter signup (the #1 CTA) + TikTok / Instagram |

Newsletter signup is the primary goal — it appears in the Connect section, in the timed popup
modal, and via the persistent bottom ribbon.

---

## Quick Start

Open `index.html` in your browser, or run any static server:

```bash
python -m http.server 8000     # then visit http://localhost:8000
# or: npx serve
```

---

## File Structure

```
HerringWebsite/
├── index.html          # Single page (all sections)
├── styles.css          # All styles ("forest whimsical" theme)
├── script.js           # Vanilla JS (nav, countdown, carousel, cards, modal)
├── README.md           # This file
├── ref/                # Design references (logo, palette, headshot source)
└── images/
    ├── logo.png        # CR / HERRING monogram (transparent)
    ├── author.png      # Author headshot
    └── book-cover.jfif # Book cover
```

---

## Customization — Placeholders (easy to swap)

| What | Where |
|------|-------|
| **Book title** | `index.html` — countdown section, Books `<h2>`, modal text |
| **Release date** | `index.html` (`countdown-date`, `book-status`) **and** `script.js` → `CONFIG.launchDate` |
| **Cover image** | replace `images/book-cover.jfif` (update the `src` if renamed) |
| **Synopsis** | `index.html` → `.synopsis` |
| **Author bio** | `index.html` → `.author-bio` |
| **Headshot** | replace `images/author.png` |
| **Logo** | replace `images/logo.png` (use a transparent PNG) |
| **Instagram URL** | `index.html` — currently `https://instagram.com/c.r.herring` (3 places) |
| **TikTok URL** | `index.html` — currently `href="#"` (3 places: author, connect, footer) |

### Change the accent color (one-line swap)

All theming lives in CSS custom properties at the top of `styles.css`. The primary green is a
single variable:

```css
:root {
    --color-forest: #34503D;   /* <- change this to re-tint the whole site */
    /* supporting tones: --color-jade, --color-sage, --color-bg-primary (cream) ... */
}
```

The palette references the provided green range (mint → forest → emerald). `--color-forest` is
deliberately a refined forest, not heavily saturated.

### Fonts

Headings use **Playfair Display** (echoes the high-contrast serif of the CR monogram); body/UI use
**Raleway**. Both load from Google Fonts in `index.html`. Swap the `<link>` and the
`--font-heading` / `--font-body` variables to change them.

### Connect the newsletter form

The forms currently fake a success state in `script.js` (`handleFormSubmit`). To make them live,
point the `action` of the `.newsletter-form` and `.modal-form` at your provider (Mailchimp,
ConvertKit, etc.) and remove/adjust the JS handler.

### Popup timing

`script.js` → `CONFIG.popupDelay` (milliseconds). The newsletter popup shows once per session
(`sessionStorage`); after it's dismissed, the bottom ribbon stays as a persistent reminder.

---

## Deploy

Plain static files — deploy to **GitHub Pages** (current setup), Netlify, or Vercel. No build step.
For GitHub Pages: push to your branch and serve from the repo root.

---

*Crafted for Chrislyn R. Herring.*
