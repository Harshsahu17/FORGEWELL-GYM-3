# Forgewell — Gym Website

A premium, single-page-feel gym website built with **React**, **Vite**, and **Tailwind CSS**, with a built-in **live content & theme customizer** that lets anyone edit copy, images, and the accent color directly in the browser — no code changes required, and changes persist across refreshes via `localStorage`.

No animation or scrolling libraries are used — every motion effect is a Tailwind utility or a hand-written CSS `@keyframes` block.

---

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Editing Content the Simple Way](#editing-content-the-simple-way)
- [The Live Customizer](#the-live-customizer)
- [Theme / Color Customization](#theme--color-customization)
- [Publish Status](#publish-status)
- [How Data Persistence Works](#how-data-persistence-works)
- [Sections & Pages Reference](#sections--pages-reference)
- [Styling System](#styling-system)
- [Known Limitations](#known-limitations)
- [Troubleshooting](#troubleshooting)

---

## Getting Started

```bash
npm install
npm run dev
```

Then open the printed local URL (default `http://localhost:5173`).

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
│   ├── Navbar.jsx          Fixed top navigation (sits just below the admin bar); mobile menu
│   ├── SectionToolbar.jsx  Global fixed admin bar: Customize / Reset All / Publish
│   ├── Hero.jsx            Hero section (headline, CTAs, stats, background image)
│   ├── About.jsx           About section (image, copy, highlights, stats, CTA)
│   ├── Services.jsx        Service cards grid
│   ├── Membership.jsx      Pricing / membership plan cards → link to /inquiry
│   ├── Testimonials.jsx    Auto-rotating testimonial carousel
│   ├── HowItWorks.jsx      Numbered step-by-step process
│   ├── ContactForm.jsx     Homepage contact section (separate from the /inquiry page)
│   ├── Footer.jsx          Footer: links, contact, social, hours — rendered on every route
│   ├── Customizer.jsx      Section picker + the live editing side panel
│   └── Icons.jsx           Hand-authored SVG icon set (no icon library)
├── hooks/
│   └── useManagedSection.js   Gives a component the "live" value for a data section
├── utils/
│   ├── dataManager.js          Reads/writes content overrides + publish status to localStorage
│   └── theme.js                 Default theme, hex⇄rgb helpers, applyTheme()
├── data/
│   └── gymData.json             Default site copy & images (theme colors live in theme.js, not here)
├── pages/
│   ├── Home.jsx                  Composes the homepage sections, handles #hash scrolling
│   └── InquiryForm.jsx           Standalone membership sign-up page (/inquiry?plan=...)
├── App.jsx                        Router + layout; mounts the admin bar and the Customizer
├── main.jsx
└── index.css                      CSS variables, base styles, animation utilities
index.html                          Inline script that pre-applies the saved theme before React loads
```

> There is no `Gallery` component or `gallery` data key in this project, and no `useReveal.js` hook — if you've seen either mentioned elsewhere, that documentation was stale.

---

## Editing Content the Simple Way

Everything text-based — nav links, hero copy, service descriptions, pricing, testimonials, steps, and footer details — lives in `src/data/gymData.json`. Editing this file changes the *default* site content (what a visitor sees before anyone has customized anything, or after `localStorage` is cleared).

This is the "developer" way to edit content. For a no-code way, use the **Live Customizer** described below.

---

## The Live Customizer

All editing is driven from **one global admin bar** fixed to the very top of the page (`SectionToolbar.jsx`, 40px tall, visible on every route) — there's no per-section floating toolbar.

| Control | What it does |
|---|---|
| **Customize** | Opens a right-hand drawer listing every editable section; picking one opens that section's edit form |
| **Reset All** | After a confirmation modal, wipes *all* saved overrides from `localStorage` and reloads the page |
| **Publish / Unpublish** | Toggles a published flag (with a confirmation modal); shows a pulsing **Live** badge in the bar when published |

### How editing a section works

1. Clicking **Customize** dispatches a `forgewell:open-customizer` event with no key, opening the **section picker** drawer (Hero/Nav/Theme, About, Services, Membership, Testimonials, How It Works, Contact, Inquiry Form).
2. Picking a section re-dispatches the same event with that section's key. `Customizer.jsx` loads the current merged data for it (via `getSection()`), swaps in that section's edit form, and smooth-scrolls the page to the matching section `id`.
3. As you edit a field, local component state updates **and** a `forgewell:section-preview` event fires — every component using `useManagedSection()` listens for this and re-renders instantly, which is why edits appear live *before* you save.
4. **Save** calls `saveSection()` / `saveSections()`, writing the section(s) into `localStorage` under `forgewell_overrides_v1`, firing a `forgewell:section-saved` event, and closing the panel.
5. **Reset** (inside the panel, per section) immediately restores that section's `gymData.json` defaults **and persists them** — this is not just a preview, unlike closing without saving.
6. Closing the drawer (✕ or clicking outside) without saving calls `restoreSavedPreview()`, reverting any live-previewed-but-unsaved edits back to the last saved value.

While a panel is open, `<body>` gets a `customizer-open` class that pushes the page content and the fixed `Navbar` left to make room for the 360px drawer (full-width on mobile instead).

### Special case: the Hero panel

Because the Hero section visually contains the navbar's logo/CTA and also owns the theme's accent color, the **Hero, Nav & Theme** panel loads three pieces of data into one form:

- `hero` — headline, description, CTAs, background image, stats
- `navbar` — logo text/image, nav CTA button text
- `theme` — currently just the accent color (see [Theme / Color Customization](#theme--color-customization))

Saving from this panel writes `hero`, `navbar`, and `theme` to `localStorage` as three separate top-level keys in one call.

### Editable sections

| Section key | Data source(s) | What's editable |
|---|---|---|
| `hero` | `hero` + `navbar` + `theme` | Headline, description, CTAs, background image, stats, logo, nav CTA text, **and accent color** |
| `about` | `about` | Eyebrow, heading, description, image, highlights, stats, CTA |
| `services` | `services` | Section header, each service's title/description/icon/image |
| `membership` | `membership` | Section header, each plan's name/price/duration/features/CTA/recommended flag |
| `testimonials` | `testimonials` | Section header, each testimonial's name/role/quote/rating/avatar |
| `howItWorks` | `howItWorks` | Section header, each numbered step |
| `contact` | `footer.contact` + `contactForm` | Contact image plus the homepage contact form's copy |
| `inquiry` | `inquiry` | The `/inquiry` page's copy, benefits list, and stats |
| `footer` | `footer` | Edit form exists, but has no button in the section picker — see [Known Limitations](#known-limitations) |

Image fields support file upload: files over **2MB are rejected**; accepted images are downscaled so their longest edge is ≤1600px and re-encoded as JPEG (quality 0.82) into a `data:image/...` URL before being stored.

---

## Theme / Color Customization

The **Hero, Nav & Theme** panel exposes **one** color picker — "Choose a primary color" — bound to `theme.accent`. Picking a color calls `createThemeFromAccent()` (in `src/utils/theme.js`), which derives a full nine-variable palette:

| Field | CSS variable | How it's derived |
|---|---|---|
| Accent Color | `--accent` | The color you picked |
| Accent Hover | `--accent-hover` | The accent mixed 16% toward white |
| Shadow Color | `--shadow` | Same value as the accent |
| Text Primary | `--ink-primary` | Black or white, chosen by the accent's relative luminance |
| Text Secondary | `--ink-secondary` | A muted black/white mix for light accents, or a fixed gray for dark ones |
| Background Primary/Secondary/Card, Border | `--bg-primary`, `--bg-secondary`, `--bg-card`, `--border` | **Not derived from your pick** — always reset to `DEFAULT_THEME`'s fixed values whenever the accent changes |

In other words, only the accent color (and everything mathematically derived from it) is actually editable in the current UI — backgrounds, card color, and borders can't be independently customized yet. `THEME_VAR_MAP` and `applyTheme()` in `theme.js` already support setting all nine variables, so adding a field for any of them is a matter of adding another `ColorField` in `Customizer.jsx`.

### Why colors don't flash back on refresh

Because React only mounts *after* the JS bundle loads, applying the saved theme purely from a `useEffect` would cause a visible "flash" of the default colors on every page load/refresh. To prevent this, `index.html` contains a small inline `<script>` in the `<head>` that reads `forgewell_overrides_v1` from `localStorage` and applies the saved theme **synchronously, before the page paints** — so there's no flash, and colors persist correctly across refreshes.

If you rename `dataManager.js`'s `STORAGE_KEY`, or add/rename a theme field, you must update **both**:
1. `src/utils/theme.js` (`DEFAULT_THEME` and `THEME_VAR_MAP`)
2. The inline script in `index.html`

...or the two will fall out of sync and the pre-paint script will silently do nothing.

### Known hardcoded colors (not yet theme-connected)

Two shades in `src/index.css` are hardcoded and untouched by the theme system:
- `::selection` and `.text-outline-accent`'s stroke both use a fixed `#e84118`
- The scrollbar-thumb hover color uses a different fixed `#E46E00`

Wire these to `rgb(var(--accent) / <alpha>)` if full-site consistency is needed, ideally once background/border pickers are added too.

---

## Publish Status

`SectionToolbar.jsx` also has a **Publish / Unpublish** control, backed by `getPublishStatus()`, `publishSite()`, and `unpublishSite()` in `dataManager.js`:

- Status is stored under its own `localStorage` key, **`forgewell_published_v1`**, as `{ published: boolean, publishedAt: ISO string | null }` — separate from content overrides.
- Both actions require confirming a modal first.
- When published, the admin bar shows a pulsing green **Live** badge.
- Per the comment in `dataManager.js`, this is currently a purely client-side flag with no real backend effect — a placeholder so the calling components won't need to change once a real publish API exists.

---

## How Data Persistence Works

Content overrides live in a single `localStorage` key: **`forgewell_overrides_v1`** (publish status is separate — see [Publish Status](#publish-status) above).

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
- `saveSection(key, value)` / `saveSections(entries)` overwrite the *entire* stored value for each section and fire a `forgewell:section-saved` event.
- Since it's `localStorage`, overrides are **per-browser** — clearing site data, or using a different browser or incognito window, resets everything back to `gymData.json` (and `DEFAULT_THEME`) defaults.

---

## Sections & Pages Reference

```
Home.jsx ("/") renders, in order:
  Hero → About → Services → Membership → Testimonials → HowItWorks → ContactForm

App.jsx always renders, on every route:
  Navbar → SectionToolbar (admin bar) → <page content> → Footer → Customizer (drawer, when open)
```

- **`/`** — the homepage above.
- **`/inquiry`** — `InquiryForm.jsx`, a standalone membership sign-up page (name, email, phone, gender, plan, joining date, interested services, message). Reached via any "Join Now" button on a Membership plan card, which links to `/inquiry?plan=<PlanName>` to preselect that plan.
- Anchor links (`#about`, `#services`, etc.) work from either route: `Navbar.jsx` prefixes hrefs with `/` when not already on `/`, and `Home.jsx` smooth-scrolls to the matching hash on mount/navigation.
- `ContactForm.jsx` (on the homepage) and `InquiryForm.jsx` (its own page) are **two different forms** — don't confuse them when editing copy. The Customizer's **Contact** section edits the homepage form (`contactForm` + `footer.contact.image`); **Inquiry Form** edits the `/inquiry` page (`inquiry`).

Each section pulls its data through `useManagedSection(key, fallback)`, which:
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

- **No backend** — all customizations and the publish flag live in the visiting browser's `localStorage`. There's no server-side database, so edits made by one visitor are invisible to others, and "Publish" doesn't yet make anything visible elsewhere.
- **No undo history** — saving overwrites the previous value with no version history, and a panel's per-section **Reset** persists immediately rather than just previewing.
- **Footer isn't reachable from the UI** — its edit form exists in `Customizer.jsx`, but `footer` isn't one of the options in the section picker, so today it can only be opened by dispatching `forgewell:open-customizer` with `{ key: 'footer' }` manually (e.g. from the console).
- **Background/card/border theme colors aren't user-editable** — only the accent color has a picker; the rest of the palette is either derived from it or silently reset to defaults (see [Theme / Color Customization](#theme--color-customization)).
- **Two color spots aren't theme-linked** (see above).
- File-upload images are stored as base64 `data:image/...` strings directly in `localStorage` (roughly a 5–10MB ceiling depending on browser). Uploads over 2MB are rejected outright, and several stored images can still approach that ceiling.

---

## Troubleshooting

**Colors reset after refresh:**
Check `localStorage.getItem('forgewell_overrides_v1')` in the browser console after saving — confirm a `theme` key is present with your chosen colors. If it's missing, the Customizer's `handleSave` isn't writing the theme section. If it's present but still resets on refresh, confirm the inline pre-paint script in `index.html`'s `<head>` matches the current `STORAGE_KEY` and theme field names exactly.

**The Navbar or page content overlaps the customizer drawer:**
The drawer's width comes from the `--customizer-width` CSS variable (360px), applied via the `customizer-open` class on `<body>` in `index.css`. If content isn't shifting out of the way while the drawer is open, confirm nothing between `<body>` and the header/page wrapper overrides `padding-right` or the header's `right` offset.

**A section's live preview isn't updating:**
Confirm the component uses `useManagedSection('sectionKey', data.sectionKey)` with the exact same key string used when the Customizer dispatches `forgewell:open-customizer`.

**Changing the accent color doesn't change the background:**
Expected with the current UI — see [Theme / Color Customization](#theme--color-customization). Background, card, and border colors always reset to their defaults whenever the accent changes, since there's no picker for them yet.

---

## Notes

- Colors, fonts, and animation keyframes are defined centrally in `tailwind.config.js`.
- `prefers-reduced-motion` is respected globally (see `src/index.css`).
- Swap all placeholder Unsplash/Pravatar image URLs in `gymData.json` for real photography before shipping.