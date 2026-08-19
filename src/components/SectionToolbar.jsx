import { useEffect, useState } from 'react'
import { openCustomizer, resetAllOverrides } from '../utils/dataManager'

const IconEdit = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>
)

const IconAlert = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
)

const IconClose = () => (
  <svg viewBox="0 0 24 24" className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
)

function ResetConfirmModal({ onCancel, onConfirm }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onCancel()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onCancel])

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-5">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm opacity-0 animate-fade-in"
        style={{ animationDuration: '0.25s' }}
        onClick={onCancel}
      />

      {/* Card */}
      <div
        className="relative w-full max-w-sm rounded-3xl border border-border bg-bg-secondary p-7 sm:p-8 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] overflow-hidden opacity-0 animate-scale-in"
        style={{ animationDuration: '0.3s' }}
      >
        {/* Ambient glow accents, matches InquiryForm panel style */}
        <div className="absolute -top-20 -left-20 w-56 h-56 bg-accent/15 blur-[90px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-20 -right-16 w-48 h-48 bg-accent/10 blur-[80px] rounded-full pointer-events-none" />

        {/* Close button */}
        <button
          type="button"
          onClick={onCancel}
          aria-label="Close"
          className="absolute top-4 right-4 text-ink-secondary hover:text-accent transition-colors"
        >
          <IconClose />
        </button>

        <div className="relative">
          {/* Icon badge */}
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-accent/15 ring-1 ring-accent/30 text-accent mb-5">
            <IconAlert />
          </div>

          <span className="text-accent font-mono text-xs tracking-[0.25em] uppercase">
            Warning
          </span>
          <h3 className="mt-2 font-display text-2xl sm:text-3xl leading-tight text-ink-primary">
            Are You Sure To Reset Everything?
          </h3>
          <p className="mt-2 text-xs font-semibold text-accent/90 uppercase tracking-wide">
            This action cannot be undone
          </p>

          <div className="mt-7 flex gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 rounded-full border border-border py-3 text-sm font-semibold text-ink-secondary transition-all duration-300 hover:text-ink-primary hover:border-ink-secondary"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="flex-1 rounded-full bg-accent py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-hover hover:-translate-y-0.5 hover:shadow-[0_10px_26px_-10px_rgb(var(--shadow)/0.7)]"
            >
              Yes, Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SectionToolbar() {
  const [showConfirm, setShowConfirm] = useState(false)

  const handleResetClick = () => setShowConfirm(true)

  const handleConfirmReset = () => {
    resetAllOverrides()
    window.location.reload()
  }

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[70] flex h-10 items-center justify-end gap-2 bg-amber-600 backdrop-blur-sm px-5  print:hidden sm:px-8">
        <button
          type="button"
          onClick={() => openCustomizer()}
          className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-black transition-all duration-200 hover:bg-white whitespace-nowrap"
          aria-label="Customize website"
        >
          <IconEdit />
          <span>Customize</span>
        </button>
        <button
          type="button"
          onClick={handleResetClick}
          className="rounded-full border border-border px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-black transition-all duration-200 hover:bg-white"
        >
          Reset All
        </button>
      </div>

      {showConfirm && (
        <ResetConfirmModal
          onCancel={() => setShowConfirm(false)}
          onConfirm={handleConfirmReset}
        />
      )}
    </>
  )
}