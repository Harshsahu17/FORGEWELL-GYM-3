import baseData from '../../src/data/gymData.json'

const STORAGE_KEY = 'forgewell_overrides_v1'

function loadOverrides() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch (e) {
    return {}
  }
}

function saveOverrides(obj) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(obj))
  } catch (e) {
    // ignore
  }
}

export function getAllData() {
  const overrides = loadOverrides()
  return deepMerge(JSON.parse(JSON.stringify(baseData)), overrides)
}

export function getSection(key) {
  const data = getAllData()
  return data[key]
}

export function saveSection(key, value) {
  const overrides = loadOverrides()
  overrides[key] = value
  saveOverrides(overrides)
  // notify other parts of the app
  try {
    window.dispatchEvent(new CustomEvent('forgewell:section-saved', { detail: { key, value } }))
  } catch (e) {}
}

function deepMerge(target, source) {
  if (!source) return target
  for (const k of Object.keys(source)) {
    if (isPlainObject(source[k]) && isPlainObject(target[k])) {
      target[k] = deepMerge(target[k], source[k])
    } else {
      target[k] = source[k]
    }
  }
  return target
}

function isPlainObject(v) {
  return v && typeof v === 'object' && !Array.isArray(v)
}
