export const DEFAULT_THEME = {
  accent: '220 38 38',
  accentHover: '248 60 60',
  bgPrimary: '9 7 7',
  bgSecondary: '16 12 12',
  bgCard: '24 18 18',
  inkPrimary: '255 255 255',
  inkSecondary: '165 150 150',
  border: '42 32 32',
  shadow: '220 38 38',
}

// Maps theme keys (used in JS/forms) to the CSS custom property names
// declared in src/index.css. Keep this in sync with the inline pre-paint
// script in index.html — see README "Why colors don't flash back".
export const THEME_VAR_MAP = {
  accent: '--accent',
  accentHover: '--accent-hover',
  bgPrimary: '--bg-primary',
  bgSecondary: '--bg-secondary',
  bgCard: '--bg-card',
  inkPrimary: '--ink-primary',
  inkSecondary: '--ink-secondary',
  border: '--border',
  shadow: '--shadow',
}

// "220 38 38"  ->  "#dc2626"
export function rgbTripletToHex(triplet) {
  if (!triplet) return '#000000'
  const [r, g, b] = triplet.trim().split(/\s+/).map(Number)
  const toHex = (n) => Math.max(0, Math.min(255, n || 0)).toString(16).padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

// "#dc2626"  ->  "220 38 38"
export function hexToRgbTriplet(hex) {
  const clean = hex.replace('#', '')
  const r = parseInt(clean.substring(0, 2), 16)
  const g = parseInt(clean.substring(2, 4), 16)
  const b = parseInt(clean.substring(4, 6), 16)
  return `${r} ${g} ${b}`
}

function mixRgb(first, second, amount) {
  const a = first.trim().split(/\s+/).map(Number)
  const b = second.trim().split(/\s+/).map(Number)
  return a.map((value, index) => Math.round(value + (b[index] - value) * amount)).join(' ')
}

export function createThemeFromAccent(accent) {
  const white = '255 255 255'
  const black = '0 0 0'
  const luminance = accent.trim().split(/\s+/).map(Number).reduce((total, value, index) => {
    const weights = [0.2126, 0.7152, 0.0722]
    return total + value * weights[index]
  }, 0) / 255
  const backgroundBase = DEFAULT_THEME.bgPrimary

  return {
    accent,
    accentHover: mixRgb(accent, white, 0.16),
    shadow: accent,
    bgPrimary: backgroundBase,
    bgSecondary: DEFAULT_THEME.bgSecondary,
    bgCard: DEFAULT_THEME.bgCard,
    inkPrimary: luminance > 0.72 ? black : white,
    inkSecondary: luminance > 0.72 ? mixRgb(black, white, 0.48) : '165 150 150',
    border: DEFAULT_THEME.border,
  }
}

// Applies a theme object to <html>'s CSS custom properties, live.
export function applyTheme(theme) {
  const root = document.documentElement
  for (const key of Object.keys(THEME_VAR_MAP)) {
    if (theme && theme[key]) {
      root.style.setProperty(THEME_VAR_MAP[key], theme[key])
    }
  }
}
