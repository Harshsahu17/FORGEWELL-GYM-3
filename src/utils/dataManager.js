import defaultData from '../data/gymData.json'

export const STORAGE_KEY = 'forgewell_overrides_v1'
export const PUBLISH_KEY = 'forgewell_published_v1'

export const PREVIEW_EVENT = 'forgewell:section-preview'
export const SAVED_EVENT = 'forgewell:section-saved'
export const OPEN_EVENT = 'forgewell:open-customizer'
export const PUBLISH_EVENT = 'forgewell:publish-status-changed'

function isPlainObject(v) {
  return v && typeof v === 'object' && !Array.isArray(v)
}

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

export function saveSection(key, value) {
  const overrides = getOverrides()
  overrides[key] = value
  localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides))
  window.dispatchEvent(new CustomEvent(SAVED_EVENT, { detail: { key, value } }))
  return value
}

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

export function previewSection(key, value) {
  window.dispatchEvent(new CustomEvent(PREVIEW_EVENT, { detail: { key, value } }))
}

export function restoreSavedPreview(key) {
  previewSection(key, getSection(key))
}

export function openCustomizer(key) {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: { key } }))
}

export function resetAllOverrides() {
  localStorage.removeItem(STORAGE_KEY)
}

// ---- Publish status -------------------------------------------------
// A lightweight "is this vendor's site live" flag. Right now it's purely
// client-side (localStorage), so it only reflects intent — swap the body
// of publishSite/unpublishSite for a real API call once a backend exists,
// the calling components won't need to change.

export function getPublishStatus() {
  try {
    const raw = localStorage.getItem(PUBLISH_KEY)
    return raw ? JSON.parse(raw) : { published: false, publishedAt: null }
  } catch {
    return { published: false, publishedAt: null }
  }
}

export function publishSite() {
  const status = { published: true, publishedAt: new Date().toISOString() }
  localStorage.setItem(PUBLISH_KEY, JSON.stringify(status))
  window.dispatchEvent(new CustomEvent(PUBLISH_EVENT, { detail: status }))
  return status
}

export function unpublishSite() {
  const status = { published: false, publishedAt: null }
  localStorage.setItem(PUBLISH_KEY, JSON.stringify(status))
  window.dispatchEvent(new CustomEvent(PUBLISH_EVENT, { detail: status }))
  return status
}

export { defaultData }