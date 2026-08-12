# Forgewell — Gym Website

A premium, single-page gym website built with React, Vite, and Tailwind CSS. No animation or scrolling libraries — every motion effect is Tailwind utilities or hand-written CSS `@keyframes`, and scroll reveals run on the native `IntersectionObserver` API.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
├── components/       Navbar, Hero, About, Services, Membership,
│                      Testimonials, HowItWorks, Footer, Icons
├── hooks/
│   └── useReveal.js   IntersectionObserver scroll-reveal hook
├── data/
│   └── gymData.json   All site copy and content — edit this to
│                      rebrand or reword the site without touching JSX
├── pages/
│   └── Home.jsx       Composes the sections in order
├── App.jsx
├── main.jsx
└── index.css          Base styles, smooth scroll, reveal utilities
```

## Editing content

Everything text-based — nav links, hero copy, service descriptions, pricing,
testimonials, steps, and footer details — lives in `src/data/gymData.json`.
Update that file and the site content changes without touching component code.

## Notes

- Colors, fonts, and animation keyframes are defined centrally in `tailwind.config.js`.
- `prefers-reduced-motion` is respected globally (see `src/index.css`).
- Images are pulled from Unsplash/Pravatar URLs for placeholder content — swap
  the URLs in `gymData.json` for your own photography before shipping.
