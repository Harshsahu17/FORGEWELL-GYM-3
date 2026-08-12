import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Customizer from './components/Customizer'
import { getSection } from './utils/dataManager'
import { applyTheme, DEFAULT_THEME } from './utils/theme'

function App() {
  const [customizerOpen, setCustomizerOpen] = useState(false)

  useEffect(() => {
    const onOpen = () => setCustomizerOpen(true)
    const onClose = () => setCustomizerOpen(false)

    window.addEventListener('forgewell:customizer-open', onOpen)
    window.addEventListener('forgewell:customizer-close', onClose)

    return () => {
      window.removeEventListener('forgewell:customizer-open', onOpen)
      window.removeEventListener('forgewell:customizer-close', onClose)
    }
  }, [])


  // component ke andar, existing useEffect ke neeche:
  useEffect(() => {
    applyTheme({ ...DEFAULT_THEME, ...(getSection('theme') || {}) })

    const onPreview = (e) => {
      if (e.detail?.key === 'theme') applyTheme({ ...DEFAULT_THEME, ...e.detail.value })
    }
    const onSaved = (e) => {
      if (e.detail?.key === 'theme') applyTheme({ ...DEFAULT_THEME, ...e.detail.value })
    }
    window.addEventListener('forgewell:section-preview', onPreview)
    window.addEventListener('forgewell:section-saved', onSaved)
    return () => {
      window.removeEventListener('forgewell:section-preview', onPreview)
      window.removeEventListener('forgewell:section-saved', onSaved)
    }
  }, [])

  return (
    <>
      <Navbar />
      <div
        className={`transition-all duration-300 ease-out min-w-0 w-full ${
          customizerOpen ? 'sm:w-[calc(100%-480px)]' : ''
        }`}
        style={{ boxSizing: 'border-box', minWidth: 0 }}
      >
        <Home />
      </div>
      <Customizer />
    </>
  )
}

export default App
