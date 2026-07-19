# Chrislyn R. Herring — Author Website

A clean, literary multi-page website for dark fantasy author **Chrislyn R. Herring**, with her
debut novel featured prominently.

Aesthetic: *forest whimsical* — cream base, forest-green accent, elegant serif headings
(Cormorant Garamond) over a simple sans-serif body (Raleway). The book page gets its own
dark/crimson treatment.

Built with vanilla HTML, CSS, and JavaScript — no frameworks, no build tools required.

Live at: https://www.chrislynrherring.com/

---

## Structure

Four pages sharing one stylesheet and one script:

| Page | File | Purpose |
|------|------|---------|
| **Home** | `index.html` | Hero (name, tagline, CTAs) + released-book highlight with buy links |
| **Books** | `books.html` | The book: cover, synopsis, genre tags, release meta, buy links |
| **About** | `about.html` | Bio + headshot + social links |
| **Connect** | `connect.html` | Newsletter signup (the #1 CTA) + Instagram |

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
├── index.html              # Home
├── books.html              # The book (dark/crimson theme)
├── about.html              # Author bio
├── connect.html            # Newsletter signup
├── 404.html                # GitHub Pages not-found page (uses absolute root paths)
├── styles.css              # All styles ("forest whimsical" theme + book-page dark theme)
├── script.js               # Vanilla JS (nav, mobile menu, countdown, reveal, form placeholder)
├── robots.txt / sitemap.xml
├── README.md               # This file
├── ref/                    # Design references (logo, palette, headshot source)
└── images/
    ├── logo.png            # CR / HERRING monogram (transparent)
    ├── favicon.png         # Square 512×512 favicon (from logo)
    ├── apple-touch-icon.png
    ├── author.jpg          # Author headshot
    └── book-cover.jpg      # Book cover
```

The header, footer, and `<head>` meta are duplicated in each HTML file — a change to the nav or
footer means editing all four pages (plus `404.html` for shared styles).

---

## Customization — Placeholders (easy to swap)

| What | Where |
|------|-------|
| **Book title** | `index.html` (highlight section), `books.html` (title, synopsis, JSON-LD), meta tags |
| **Buy links** | retailer buttons in the `.buylinks` row on `index.html` (highlight) and `books.html` (cover column). Add a store by dropping another `<a class="btn buylink">` (home) or `<a class="btn btn--crimson btn--block">` (book page) into the `.buylinks__row` / `.buylinks--stack` |
| **Cover image** | replace `images/book-cover.jpg` (update `src` + `og:image` if renamed) |
| **Synopsis** | `books.html` → `.release__body` |
| **Author bio** | `about.html` → `.about__text` |
| **Headshot** | replace `images/author.jpg` (keep the `width`/`height` attributes accurate) |
| **Logo / favicon** | replace `images/logo.png`, then regenerate `favicon.png` (square) and `apple-touch-icon.png` |
| **Instagram URL** | `about.html` + `connect.html` — currently `https://instagram.com/c.r.herring` |
| **TikTok** | removed until the account exists — re-add an `.iconbtn` link in `about.html` / `connect.html` |
| **Site URL** | `og:url`, `canonical`, JSON-LD, `sitemap.xml`, `robots.txt`, `404.html` all hardcode `https://www.chrislynrherring.com/` — update everywhere if the domain changes |

### Change the accent color (one-line swap)

All theming lives in CSS custom properties at the top of `styles.css`:

```css
:root {
    --forest: #2f4634;   /* <- PRIMARY accent — change this to re-tint the whole site */
    /* supporting tones: --jade, --moss, --sage, --mint, --cream ... */
}
```

The book page's dark/crimson palette is scoped separately under `.release` (`--r-crimson` etc.).

### Fonts

Headings use **Cormorant Garamond**; body/UI use **Raleway**. Both load from Google Fonts in each
page's `<head>`. Swap the `<link>` and the `--serif` / `--sans` variables in `styles.css` to change them.

### Countdown (unused — book is released)

The book is now out, so no countdown runs on the live pages. The countdown handler still lives in
`script.js` (guarded, so it's inert when no `.countdown[data-launch]` element is present). To reuse it
for a future release, add a `.countdown` block with a `data-launch` attribute; when the date passes it
is replaced with "Out now" and any `.highlight__date` / `.release__date` line switches to "Available now".

### Connect the newsletter form (not yet wired)

The form in `connect.html` currently fakes a success state in `script.js` — **it does not collect
emails yet**. To make it live, point it at a provider (Formspree, Buttondown, Mailchimp,
MailerLite, …) and replace the placeholder submit handler.

---

## Deploy

Plain static files — deployed to **GitHub Pages** from the repo root (`ahicks5/herring-site`,
`master` branch) with the custom domain `www.chrislynrherring.com` (set via `CNAME`). Push and
it's live; no build step. Also works on Netlify or Vercel (update the hardcoded URLs listed
above if the domain changes).

---

*Crafted for Chrislyn R. Herring.*
