import { useEffect, useState } from 'react'
import { getSection, STORAGE_KEY, PREVIEW_EVENT, SAVED_EVENT } from '../utils/dataManager'

// Gives a component the "live" value for a data section:
//   1. Starts from the saved override (or `fallback` — the JSON default)
//   2. Updates instantly while the Customizer panel is open (preview event)
//   3. Updates when any panel saves that section (saved event)
//   4. Updates when another browser tab changes localStorage (storage event)
export default function useManagedSection(key, fallback) {
  const [value, setValue] = useState(() => getSection(key) ?? fallback)

  useEffect(() => {
    const onPreview = (e) => {
      if (e.detail?.key === key) setValue(e.detail.value)
    }
    const onSaved = (e) => {
      if (e.detail?.key === key) setValue(e.detail.value)
    }
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) setValue(getSection(key) ?? fallback)
    }

    window.addEventListener(PREVIEW_EVENT, onPreview)
    window.addEventListener(SAVED_EVENT, onSaved)
    window.addEventListener('storage', onStorage)
    return () => {
      window.removeEventListener(PREVIEW_EVENT, onPreview)
      window.removeEventListener(SAVED_EVENT, onSaved)
      window.removeEventListener('storage', onStorage)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  return value
}
