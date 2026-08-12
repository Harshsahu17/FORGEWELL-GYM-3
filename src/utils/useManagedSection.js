import { useEffect, useState } from 'react'
import { getSection as _getSection } from './dataManager'

export default function useManagedSection(key, fallback) {
  const [section, setSection] = useState(() => _getSection(key) || fallback)

  useEffect(() => {
    function onPreview(e) {
      if (!e.detail || e.detail.key !== key) return
      setSection(e.detail.value)
    }
    function onSaved(e) {
      if (!e.detail || e.detail.key !== key) return
      setSection(e.detail.value)
    }
    window.addEventListener('forgewell:section-preview', onPreview)
    window.addEventListener('forgewell:section-saved', onSaved)
    // also update if overrides in storage change in another tab
    function onStorage(e) {
      if (e.key && e.key.indexOf('forgewell_overrides') !== -1) {
        setSection(_getSection(key) || fallback)
      }
    }
    window.addEventListener('storage', onStorage)

    return () => {
      window.removeEventListener('forgewell:section-preview', onPreview)
      window.removeEventListener('forgewell:section-saved', onSaved)
      window.removeEventListener('storage', onStorage)
    }
  }, [key, fallback])

  return section
}
