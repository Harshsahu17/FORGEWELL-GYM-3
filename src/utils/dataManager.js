import defaultData from '../data/gymData.json'

export const STORAGE_KEY = 'forgewell_overrides_v1'

export const PREVIEW_EVENT = 'forgewell:section-preview'
export const SAVED_EVENT = 'forgewell:section-saved'
export const OPEN_EVENT = 'forgewell:open-customizer'

function isPlainObject(v) {
  return v && typeof v === 'object' && !Array.isArray(v)
}

// Deep-merges `source` on top of `target`. Arrays and primitives in `source`
// fully replace the value in `target` (arrays are NOT merged item-by-item —
// this matches how the customizer saves a section: it always writes the
// section's complete current state).
function deepMerge(target, source) {
  if (!isPlainObject(target) || !isPlainObject(source)) return source ?? target
  const result = { ...target }
  for (const key of Object.keys(source)) {
    if (isPlainObject(source[key]) && isPlainObject(target[key])) {
      result[key] = deepMerge(target[key], source[key])
    } else {
      result[key] = source[key]
    }
  }
  return result
}

export function getOverrides() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function getAllData() {
  const overrides = getOverrides()
  const merged = { ...defaultData }
  for (const key of Object.keys(overrides)) {
    merged[key] = deepMerge(defaultData[key], overrides[key])
  }
  return merged
}

export function getSection(key) {
  return getAllData()[key]
}

// Persists a section's full value, notifies every mounted instance of that
// section (across the whole app) so they stay in sync without a reload.
export function saveSection(key, value) {
  const overrides = getOverrides()
  overrides[key] = value
  localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides))
  window.dispatchEvent(new CustomEvent(SAVED_EVENT, { detail: { key, value } }))
  return value
}

// Saves several sections at once (used by the Hero panel, which also owns
// the navbar and theme data) and fires one saved-event per section.
export function saveSections(entries) {
  const overrides = getOverrides()
  for (const [key, value] of Object.entries(entries)) {
    overrides[key] = value
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides))
  for (const [key, value] of Object.entries(entries)) {
    window.dispatchEvent(new CustomEvent(SAVED_EVENT, { detail: { key, value } }))
  }
}

// Broadcasts a live, unsaved edit so every <SectionKey /> instance on the
// page re-renders immediately with the in-progress value.
export function previewSection(key, value) {
  window.dispatchEvent(new CustomEvent(PREVIEW_EVENT, { detail: { key, value } }))
}

// Re-broadcasts the last *saved* value for a section — used when the
// customizer panel is closed without saving, so unsaved edits revert.
export function restoreSavedPreview(key) {
  previewSection(key, getSection(key))
}

export function openCustomizer(key) {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: { key } }))
}

export function resetAllOverrides() {
  localStorage.removeItem(STORAGE_KEY)
}

export { defaultData }
