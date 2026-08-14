export const DEFAULT_THEME = {
  accentColor: '#e84118',
  accentHover: '#d23710',
  shadowColor: '#e84118',
  bgPrimary: '#050505',
  bgSecondary: '#0D0D0D',
  bgCard: '#151515',
  textPrimary: '#FFFFFF',
  textSecondary: '#A3A3A3',
  border: '#242424',
}

const CSS_VAR_MAP = {
  accentColor: '--accent',
  accentHover: '--accent-hover',
  shadowColor: '--shadow',
  bgPrimary: '--bg-primary',
  bgSecondary: '--bg-secondary',
  bgCard: '--bg-card',
  textPrimary: '--ink-primary',
  textSecondary: '--ink-secondary',
  border: '--border',
}

export function hexToRgbString(hex) {
  if (!hex || typeof hex !== 'string') return null
  const clean = hex.replace('#', '').trim()
  const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean
  if (!/^[0-9a-fA-F]{6}$/.test(full)) return null
  const r = parseInt(full.slice(0, 2), 16)
  const g = parseInt(full.slice(2, 4), 16)
  const b = parseInt(full.slice(4, 6), 16)
  return `${r} ${g} ${b}`
}

export function applyTheme(theme) {
  if (!theme || typeof document === 'undefined') return
  const root = document.documentElement
  Object.keys(CSS_VAR_MAP).forEach((key) => {
    const rgb = hexToRgbString(theme[key])
    if (rgb) root.style.setProperty(CSS_VAR_MAP[key], rgb)
  })
}