import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Customizer from './components/Customizer'

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

  return (
    <>
      <Navbar />
      <div
        className="transition-all duration-300 ease-out min-w-0 overflow-hidden"
        style={{
          width: customizerOpen ? 'calc(100% - 480px)' : '100%',
          boxSizing: 'border-box',
          minWidth: 0,
          overflowX: 'hidden',
        }}
      >
        <Home />
      </div>
      <Customizer />
    </>
  )
}

export default App
