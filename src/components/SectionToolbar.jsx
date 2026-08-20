import { useEffect, useState } from 'react'
import {
  openCustomizer,
  resetAllOverrides,
  getPublishStatus,
  publishSite,
  unpublishSite,
} from '../utils/dataManager'

const IconEdit = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>
)

const IconRefresh = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 0115.3-6.4L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 01-15.3 6.4L3 16" />
    <path d="M3 21v-5h5" />
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

const IconRocket = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" />
    <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
)

const IconCheckCircle = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M9 12l2 2 4-4" />
  </svg>
)

function ConfirmModal({ icon, eyebrow, title, note, confirmLabel, confirmClass, onCancel, onConfirm }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onCancel()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onCancel])

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-5">
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm opacity-0 animate-fade-in"
        style={{ animationDuration: '0.25s' }}
        onClick={onCancel}
      />
      <div
        className="relative w-full max-w-sm rounded-3xl border border-border bg-bg-secondary p-7 sm:p-8 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] overflow-hidden opacity-0 animate-scale-in"
        style={{ animationDuration: '0.3s' }}
      >
        <div className="absolute -top-20 -left-20 w-56 h-56 bg-accent/15 blur-[90px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-20 -right-16 w-48 h-48 bg-accent/10 blur-[80px] rounded-full pointer-events-none" />

        <button
          type="button"
          onClick={onCancel}
          aria-label="Close"
          className="absolute top-4 right-4 text-ink-secondary hover:text-accent transition-colors"
        >
          <IconClose />
        </button>

        <div className="relative">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-accent/15 ring-1 ring-accent/30 text-accent mb-5">
            {icon}
          </div>

          <span className="text-accent font-mono text-xs tracking-[0.25em] uppercase">{eyebrow}</span>
          <h3 className="mt-2 font-display text-2xl sm:text-3xl leading-tight text-ink-primary">{title}</h3>
          {note && <p className="mt-2 text-xs font-semibold text-accent/90 uppercase tracking-wide">{note}</p>}

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
              className={`flex-1 rounded-full py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 ${confirmClass}`}
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Toast({ message }) {
  return (
    // Centering is done via `flex justify-center` on this full-width wrapper
    // (not via left-1/2 + translate-x) because `animate-fade-up`'s keyframe
    // sets its own `transform: translateY(...)`, which would otherwise wipe
    // out a translateX(-50%) applied on the same animated element.
    <div className="fixed inset-x-0 top-10 z-[200] flex justify-center px-5 pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-bg-secondary border border-border px-5 py-3 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)] opacity-0 animate-fade-up">
        <span className="text-emerald-400"><IconCheckCircle /></span>
        <span className="text-sm font-semibold text-ink-primary">{message}</span>
      </div>
    </div>
  )
}

export default function SectionToolbar() {
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [showPublishConfirm, setShowPublishConfirm] = useState(false)
  const [showUnpublishConfirm, setShowUnpublishConfirm] = useState(false)
  const [publishStatus, setPublishStatus] = useState(() => getPublishStatus())
  const [toast, setToast] = useState('')
  // Tracks whether the Customizer panel / section picker is currently open,
  // by watching the `customizer-open` class that Customizer.jsx toggles on
  // <body>. Used to hide only the "Customize" button while the panel is
  // open — Reset/Publish stay visible and clickable.
  const [formOpen, setFormOpen] = useState(
    () => typeof document !== 'undefined' && document.body.classList.contains('customizer-open')
  )

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setFormOpen(document.body.classList.contains('customizer-open'))
    })
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(''), 3000)
    return () => clearTimeout(t)
  }, [toast])

  const handleResetClick = () => setShowResetConfirm(true)

  const handleConfirmReset = () => {
    resetAllOverrides()
    window.location.reload()
  }

  const handleConfirmPublish = () => {
    const status = publishSite()
    setPublishStatus(status)
    setShowPublishConfirm(false)
    setToast('Site is now live')
  }

  const handleConfirmUnpublish = () => {
    const status = unpublishSite()
    setPublishStatus(status)
    setShowUnpublishConfirm(false)
    setToast('Site taken offline')
  }

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[70] h-10 border-b border-border/60 bg-neutral-600 backdrop-blur-md shadow-[0_4px_20px_-8px_rgba(0,0,0,0.6)] print:hidden">
        <div className="flex h-full items-center justify-between gap-3 px-5 sm:px-8">
          {/* Left: mode indicator */}
          <div className="hidden sm:flex items-center gap-2 min-w-0">
            <img
              src='/images/admin-logo.avif'
              alt="Forgewell logo"
              className="w-7 h-7 sm:w-7 sm:h-7  rounded-full object-cover flex-shrink-0"
            />
            <span className="text-[11px] ml-2 font-semibold uppercase tracking-[0.2em] text-white truncate">
              Vendor Preview
            </span>
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-2 ml-auto">
            {publishStatus.published && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-400">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                </span>
                Live
              </span>
            )}

            {!formOpen && (
              <button
                type="button"
                onClick={() => openCustomizer()}
                className="inline-flex items-center gap-1.5 rounded-full border border-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white transition-all duration-200 hover:bg-accent hover:text-white hover:border-accent whitespace-nowrap"
                aria-label="Customize website"
              >
                <IconEdit />
                <span>Customize</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleResetClick}
              className="inline-flex items-center gap-1.5 rounded-full border border-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white transition-all duration-200 hover:bg-accent hover:text-white hover:border-accent whitespace-nowrap"
            >
              <IconRefresh />
              <span className="hidden xs:inline">Reset All</span>
              <span className="xs:hidden">Reset</span>
            </button>

            {publishStatus.published ? (
              <button
                type="button"
                onClick={() => setShowUnpublishConfirm(true)}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-bg-card px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-primary transition-all duration-200 hover:border-red-400/50 hover:text-red-400 whitespace-nowrap"
              >
                <IconRocket />
                <span>Unpublish</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setShowPublishConfirm(true)}
                className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white transition-all duration-200 hover:bg-emerald-500 hover:shadow-[0_6px_18px_-6px_rgba(16,185,129,0.7)] whitespace-nowrap"
              >
                <IconRocket />
                <span>Publish</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {showResetConfirm && (
        <ConfirmModal
          icon={<IconAlert />}
          eyebrow="Warning"
          title="Are You Sure To Reset Everything?"
          note="This action cannot be undone"
          confirmLabel="Yes, Reset"
          confirmClass="bg-accent hover:bg-accent-hover hover:shadow-[0_10px_26px_-10px_rgb(var(--shadow)/0.7)]"
          onCancel={() => setShowResetConfirm(false)}
          onConfirm={handleConfirmReset}
        />
      )}

      {showPublishConfirm && (
        <ConfirmModal
          icon={<IconRocket />}
          eyebrow="Go Live"
          title="Publish This Site?"
          note="Visitors will see your latest saved content"
          confirmLabel="Yes, Publish"
          confirmClass="bg-emerald-600 hover:bg-emerald-500"
          onCancel={() => setShowPublishConfirm(false)}
          onConfirm={handleConfirmPublish}
        />
      )}

      {showUnpublishConfirm && (
        <ConfirmModal
          icon={<IconAlert />}
          eyebrow="Take Offline"
          title="Unpublish This Site?"
          note="Visitors won't be able to see it live"
          confirmLabel="Yes, Unpublish"
          confirmClass="bg-accent hover:bg-accent-hover hover:shadow-[0_10px_26px_-10px_rgb(var(--shadow)/0.7)]"
          onCancel={() => setShowUnpublishConfirm(false)}
          onConfirm={handleConfirmUnpublish}
        />
      )}

      {toast && <Toast message={toast} />}
    </>
  )
}