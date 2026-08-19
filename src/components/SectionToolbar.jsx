import { openCustomizer, resetAllOverrides } from '../utils/dataManager'

const IconEdit = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>
)

export default function SectionToolbar() {
  const handleReset = () => {
    resetAllOverrides()
    window.location.reload()
  }

  return (
    <div className="fixed inset-x-0 top-0 z-[70] flex h-10 items-center justify-end gap-2 border-b border-border bg-bg-primary px-5 print:hidden sm:px-8">
      <button
        type="button"
        onClick={() => openCustomizer()}
        className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-secondary transition-all duration-200 hover:border-accent hover:text-accent whitespace-nowrap"
        aria-label="Customize website"
      >
        <IconEdit />
        <span>Customize</span>
      </button>
      <button
        type="button"
        onClick={handleReset}
        className="rounded-full border border-border px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-secondary transition-all duration-200 hover:border-accent hover:text-accent"
      >
        Reset All
      </button>
    </div>
  )
}
