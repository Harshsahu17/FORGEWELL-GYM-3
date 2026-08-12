# Forgewell — Gym Website

A premium, single-page gym website built with **React**, **Vite**, and **Tailwind CSS**, with a built-in **live content & theme customizer** that lets anyone edit copy, images, and colors directly in the browser — no code changes required, and changes persist across refreshes via `localStorage`.

No animation or scrolling libraries are used — every motion effect is a Tailwind utility or a hand-written CSS `@keyframes` block, and scroll reveals run on the native `IntersectionObserver` API.

---

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Editing Content the Simple Way](#editing-content-the-simple-way)
- [The Live Customizer](#the-live-customizer)
- [Theme / Color Customization](#theme--color-customization)
- [How Data Persistence Works](#how-data-persistence-works)
- [Sections Reference](#sections-reference)
- [Styling System](#styling-system)
- [Known Limitations](#known-limitations)
- [Troubleshooting](#troubleshooting)

---

## Getting Started

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

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx        Sticky top navigation, mobile menu
│   ├── Hero.jsx           Hero section (headline, CTAs, stats)
│   ├── About.jsx          About section (image, copy, stats)
│   ├── Services.jsx       Service cards grid
│   ├── Membership.jsx     Pricing / membership plan cards
│   ├── Gallery.jsx        Image grid + lightbox
│   ├── HowItWorks.jsx     Numbered step-by-step process
│   ├── Footer.jsx         Footer: links, contact, social, hours
│   ├── Customizer.jsx     The live editing side-panel (all sections)
│   └── Icons.jsx          Hand-authored SVG icon set (no icon library)
├── hooks/
│   └── useReveal.js        IntersectionObserver scroll-reveal hook
├── utils/
│   ├── dataManager.js       Reads/writes content overrides to localStorage
│   ├── useManagedSection.js React hook that gives components "live" data
│   └── theme.js              Converts + applies theme colors to CSS variables
├── data/
│   └── gymData.json          Default site copy, images, AND default theme colors
├── pages/
│   └── Home.jsx               Composes all sections in order
├── App.jsx                     Root layout, customizer panel toggle, theme bootstrap
├── main.jsx
└── index.css                   CSS variables, base styles, animation utilities
index.html                       Inline script that pre-applies saved theme before React loads
```

---

## Editing Content the Simple Way

Everything text-based — nav links, hero copy, service descriptions, pricing, testimonials, steps, and footer details — lives in `src/data/gymData.json`. Editing this file changes the *default* site content (what a visitor sees before they've customized anything, or after they clear their browser data).

This is the "developer" way to edit content. For a no-code way, use the **Live Customizer** described below.

---

## The Live Customizer

Every section of the site has a small floating toolbar (top-right, sticky within that section) with two buttons:

| Button | What it does |
|---|---|
| **Customize** | Opens a right-hand side panel with a form for that section's content (text, images, plan details, etc.) |
| **Save** | Persists the section's *current* state (including any live-previewed edits) to the browser's `localStorage` |

### How it works under the hood

1. Clicking **Customize** dispatches a `forgewell:open-customizer` event with the section's key (e.g. `hero`, `about`, `services`).
2. `Customizer.jsx` listens for this event, loads the current data for that section (via `getSection()`), and renders the matching form.
3. As you type/select in the form, `updateField()` updates local component state **and** dispatches a `forgewell:section-preview` event — every component using `useManagedSection()` listens for this and re-renders instantly. This is why edits appear live on the page *before* you save.
4. Clicking **Save** calls `saveSection()`, which writes the section into `localStorage` under the key `forgewell_overrides_v1` and fires a `forgewell:section-saved` event.
5. Closing the panel **without** saving calls `restoreSavedPreview()`, which re-broadcasts the last *saved* value — so unsaved edits are discarded and the page reverts.

### Special case: the Hero panel

Because the Hero section visually contains the navbar's logo/CTA and also owns the theme colors, opening the **Hero** customizer loads three pieces of data at once into one form:

- `hero` (headline, description, stats, background image)
- `navbar` (logo text, logo image, nav CTA button)
- `theme` (site-wide color palette — see below)

Saving from the Hero panel writes `navbar`, `theme`, and `hero` to `localStorage` as three separate top-level keys.

### Editable sections

| Section key | Customize button location | What's editable |
|---|---|---|
| `hero` | Hero section | Headline, description, CTAs, background image, stats, **+ navbar & theme** |
| `about` | About section | Eyebrow, heading, description, image, stats, CTA |
| `services` | Services section | Section header, each service's title/description/icon |
| `membership` | Membership section | Section header, each plan's name/price/features/CTA |
| `howItWorks` | How It Works section | Section header, each numbered step |
| `gallery` | Gallery section | Each gallery image (URL or file upload) |
| `footer` | *(not directly wired to a button by default)* | Branding, contact info, quick links, social platforms, copyright |

Image fields support both a direct URL/path *and* a file upload (auto-resized/compressed to a `data:image/...` URL and stored in `localStorage`).

---

## Theme / Color Customization

The **Hero** customizer panel includes a **Theme Colors** section with color pickers for the entire site's palette — not just the hero. Changing these updates CSS custom properties on `<html>`, and because every component's colors are built from those variables (via `tailwind.config.js`), the whole site re-themes instantly.

### Editable theme fields

| Field | CSS variable | Used for |
|---|---|---|
| Accent Color | `--accent` | Primary brand color — buttons, links, highlights |
| Accent Hover | `--accent-hover` | Hover state of accent-colored buttons |
| Shadow Color | `--shadow` | Glow/shadow effects (navbar top glow, card hover glow, CTA hover glow) |
| Background Primary | `--bg-primary` | Main page background |
| Background Secondary | `--bg-secondary` | Alternating section background |
| Card Background | `--bg-card` | Service cards, membership cards, gallery tiles |
| Text Primary | `--ink-primary` | Headings and primary text |
| Text Secondary | `--ink-secondary` | Body copy, secondary/muted text |
| Border Color | `--border` | Card borders, dividers |

### Why colors don't flash back on refresh

Because React only mounts *after* the JS bundle loads, applying the saved theme purely from a `useEffect` would cause a visible "flash" of the default colors on every page load/refresh. To prevent this, `index.html` contains a small inline `<script>` in the `<head>` that reads `forgewell_overrides_v1` from `localStorage` and applies the saved theme **synchronously, before the page paints** — so there's no flash, and colors persist correctly across refreshes.

If you rename `dataManager.js`'s `STORAGE_KEY`, or add/rename a theme field, you must update **both**:
1. `src/utils/theme.js` (`DEFAULT_THEME` and the internal variable map)
2. The inline script in `index.html`

...or the two will fall out of sync and the pre-paint script will silently do nothing.

### Known hardcoded colors (not yet theme-connected)

A couple of visual details are intentionally *not* wired to the theme system yet:
- `::selection` highlight color and the scrollbar-thumb hover color (`index.css`)
- `.text-outline-accent`'s stroke color, used for the "How It Works" step numbers (`index.css`)

These use a fixed `#E46E00` regardless of the chosen accent color. Wire them to `rgb(var(--accent) / <alpha>)` if full-site consistency is needed.

---

## How Data Persistence Works

All customizer edits are stored in a single `localStorage` key: **`forgewell_overrides_v1`**.

```
forgewell_overrides_v1 → {
  "navbar": { ... },
  "hero": { ... },
  "theme": { ... },
  "about": { ... },
  ...
}
```

- `getAllData()` deep-merges these overrides on top of the defaults from `gymData.json`, so a partial edit (e.g. only changing one hero field) doesn't wipe out the rest of the section's defaults.
- `getSection(key)` returns just one section's merged data.
- `saveSection(key, value)` overwrites the *entire* section's stored value and notifies the app via a `forgewell:section-saved` event.
- Since it's `localStorage`, overrides are **per-browser** — clearing site data / using a different browser or incognito window resets everything back to `gymData.json` defaults.

---

## Sections Reference

```
Home.jsx renders, in order:
  Hero → About → Services → Membership → Gallery → HowItWorks → Footer
```

Each section (except Footer) pulls its data through `useManagedSection(key, fallback)`, which:
1. Initializes state from any saved override (or the JSON default if none exists)
2. Listens for live preview events while the Customizer is open
3. Listens for save events so all instances of a section stay in sync
4. Listens for the browser's native `storage` event, so edits made in **another tab** also sync live

---

## Styling System

- Colors are defined as CSS custom properties in `src/index.css` (`:root`) and consumed through `tailwind.config.js`'s `rgb(var(--x) / <alpha-value>)` pattern — this is what makes runtime theme switching possible without rebuilding Tailwind.
- Fonts: `Anton` (display/headings), `Manrope` (body), `JetBrains Mono` (eyebrows/labels).
- Animation keyframes (`fade-up`, `fade-down`, `slide-left`, `scale-in`, `image-reveal`, `float`, `marquee`, etc.) are centrally defined in `tailwind.config.js`.
- `prefers-reduced-motion` is respected globally — see the media query in `index.css`.
- Images are pulled from Unsplash/Pravatar URLs as placeholder content by default — replace the paths in `gymData.json` (or via the Customizer's image upload) before shipping to production.

---

## Known Limitations

- **No backend** — all customizations live in the visiting browser's `localStorage`. There is no server-side database, so edits made by one visitor are invisible to others. This is a prototyping/demo pattern, not a production CMS.
- **No undo history** — saving a section overwrites the previous saved value with no version history.
- **Footer isn't wired to a Customize button** by default in the current section list, even though its form exists in `Customizer.jsx`.
- **Two color spots aren't theme-linked** (see [Theme / Color Customization](#theme--color-customization) above).
- File-upload images are stored as base64 `data:image/...` strings directly in `localStorage`, which has a small size ceiling (~5–10MB depending on browser) — very large or many uploaded images can hit that limit.

---

## Troubleshooting

**Colors reset after refresh:**
Check `localStorage.getItem('forgewell_overrides_v1')` in the browser console after saving — confirm a `theme` key is present with your chosen colors. If it's missing, the Customizer's `handleSave` isn't writing the theme section. If it's present but still resets on refresh, confirm the inline pre-paint script in `index.html`'s `<head>` matches the current `STORAGE_KEY` and theme field names exactly.

**Customize/Save buttons don't stay stuck while scrolling:**
`position: sticky` breaks if *any* ancestor element has `overflow: hidden`, `auto`, or `scroll` — even if that ancestor isn't the one scrolling. Check `App.jsx`'s content wrapper `div` doesn't have `overflow-hidden` or an inline `overflowX: hidden` style.

**A section's live preview isn't updating:**
Confirm the component uses `useManagedSection('sectionKey', data.sectionKey)` with the exact same key string used when the Customizer dispatches `forgewell:open-customizer`.

---

## Notes

- Colors, fonts, and animation keyframes are defined centrally in `tailwind.config.js`.
- `prefers-reduced-motion` is respected globally (see `src/index.css`).
- Swap all placeholder Unsplash/Pravatar image URLs in `gymData.json` for real photography before shipping.
