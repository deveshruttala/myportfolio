# Devesh Ruttala — Portfolio

A modern, editorial-style personal portfolio with bento layout, custom cursor, lime accent and zero frameworks.

## Tech
- **Pure HTML, CSS and vanilla JavaScript**. No build step.
- `Space Grotesk` (display) + `Instrument Serif` italic (accent) + `JetBrains Mono` (meta).
- Real brand SVG icons (simple-icons CDN + inline SVG for AWS / GCP / OCI) + Unsplash imagery.

## Features
- Big editorial typography with serif-italic accents in lime.
- Bento grid about section (story · 9.4 CGPA · 500+ LeetCode · data-center photo · *now playing* · location with live IST clock · DSA bar chart · pull quote).
- Editorial experience layout (year on the left, hover-color, lime arrow bullets).
- Image-rich projects bento (QR code phone, server rack, terminal `sudo`, analytics dashboard).
- Tool grid with real brand logos (Go, Python, AWS, GCP, OCI, K8s, Docker, Terraform, …).
- Auto-scrolling tech marquee.
- Custom mix-blend cursor + magnetic hover on the "Let's talk" CTA.
- CSS-driven text reveal on the hero, IntersectionObserver reveals lower down.
- Mobile-first responsive (320 → 4K), hamburger drawer below 768px.
- Honours `prefers-reduced-motion`.

## Structure
```
myportfolio/
├── index.html
├── styles.css
├── script.js
├── README.md
└── assets/
    └── profile.png
```

## Run
```bash
cd myportfolio
python3 -m http.server 8000
# → http://localhost:8000
```

Or just open `index.html` in a browser.

## Deploy
Drop the `myportfolio/` folder onto:
- **Vercel** / **Netlify** / **Cloudflare Pages** — drag-and-drop or `git push`.
- **GitHub Pages** — push to `gh-pages` branch.
- Any static host. Nothing to build.

## Edit
All copy lives in `index.html`. Sections are labelled with comments:
```
<!-- ============ HERO ============ -->
<!-- ============ MARQUEE ============ -->
<!-- ============ ABOUT (Bento) ============ -->
<!-- ============ WORK ============ -->
<!-- ============ PROJECTS ============ -->
<!-- ============ STACK ============ -->
<!-- ============ CONTACT ============ -->
```

Want to swap the accent colour? Change `--acc` in `styles.css`:
```css
:root { --acc: #d4ff45; }  /* lime — try #ffb86c amber, #7afcff cyan, etc. */
```
