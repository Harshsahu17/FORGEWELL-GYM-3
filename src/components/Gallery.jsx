import { useEffect, useState } from 'react'
import data from '../data/gymData.json'
import useManagedSection from '../utils/useManagedSection'
import { saveSection } from '../utils/dataManager'

export default function Gallery() {
  const gallery = useManagedSection('gallery', data.gallery)
  const [openSrc, setOpenSrc] = useState(null)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpenSrc(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <section id="gallery" className="relative py-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="sticky top-[5.5rem] z-20 mb-8 flex flex-wrap items-center justify-end gap-2">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('forgewell:open-customizer', { detail: { key: 'gallery' } }))}
            className="px-3 py-1 bg-[#222] text-sm rounded"
          >
            Customize
          </button>
          <button
            onClick={() => saveSection('gallery', gallery)}
            className="px-3 py-1 bg-accent text-bg-primary rounded text-sm font-semibold"
          >
            Save
          </button>
        </div>

        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-display text-ink-primary">Gallery</h2>
          <p className="mt-3 text-ink-secondary">A few shots from our gym and community.</p>
        </div>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
          {gallery.map((src, i) => (
            <div key={i} className="overflow-hidden rounded-lg bg-bg-card">
              <img
                src={src}
                alt={`Gym photo ${i + 1}`}
                onClick={() => setOpenSrc(src)}
                className="w-full h-48 object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {openSrc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">
          <div className="relative max-w-5xl w-full">
            <button
              onClick={() => setOpenSrc(null)}
              className="absolute top-3 right-3 z-50 bg-black/50 text-white rounded-full p-2"
              aria-label="Close gallery image"
            >
              ✕
            </button>
            <img src={openSrc} alt="Enlarged" className="w-full h-auto rounded-lg shadow-2xl object-contain max-h-[80vh] mx-auto" />
          </div>
        </div>
      )}
    </section>
  )
}