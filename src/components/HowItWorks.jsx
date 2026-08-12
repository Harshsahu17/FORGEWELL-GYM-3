import data from '../data/gymData.json'
import useManagedSection from '../utils/useManagedSection'
import { saveSection } from '../utils/dataManager'

function Step({ step, isLast }) {
  return (
    <div className="relative flex-1">
      <div className="flex items-center gap-4 lg:block">
        <span className="font-display text-5xl sm:text-6xl text-outline lg:text-outline-accent leading-none">
          {step.number}
        </span>
        <div className="lg:mt-6">
          <h3 className="font-display text-xl sm:text-2xl text-ink-primary tracking-wide">{step.title}</h3>
        </div>
      </div>
      <p className="mt-4 text-sm text-ink-secondary leading-relaxed lg:max-w-xs">{step.description}</p>

      {!isLast && (
        <div className="hidden lg:block absolute top-7 left-[calc(100%-1.5rem)] w-[calc(100%-2rem)] h-px bg-border">
          <div className="h-full bg-accent w-0 group-hover:w-full transition-all duration-700" />
        </div>
      )}
    </div>
  )
}

export default function HowItWorks() {
  const howItWorks = useManagedSection('howItWorks', data.howItWorks)

  return (
    <section id="how-it-works" className="bg-bg-secondary py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="sticky top-[5.5rem] z-20 mb-8 flex flex-wrap items-center justify-end gap-2">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('forgewell:open-customizer', { detail: { key: 'howItWorks' } }))}
            className="px-3 py-1 bg-[#222] text-sm rounded"
          >
            Customize
          </button>
          <button
            onClick={() => saveSection('howItWorks', howItWorks)}
            className="px-3 py-1 bg-accent text-bg-primary rounded text-sm font-semibold"
          >
            Save
          </button>
        </div>

        <div className="max-w-2xl">
          <span className="text-accent font-mono text-xs sm:text-sm tracking-[0.25em] uppercase">
            {howItWorks.eyebrow}
          </span>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl text-ink-primary">{howItWorks.heading}</h2>
        </div>

        <div className="mt-16 flex flex-col lg:flex-row gap-12 lg:gap-8">
          {howItWorks.steps.map((step, i) => (
            <Step key={step.number} step={step} isLast={i === howItWorks.steps.length - 1} />
          ))}
        </div>
      </div>
    </section>
  )
}