import data from '../data/gymData.json'
import useManagedSection from '../utils/useManagedSection'
import { saveSection } from '../utils/dataManager'
import { IconCheck } from './Icons'

function PlanCard({ plan }) {
  return (
    <div
      className={`relative flex flex-col rounded-sm p-8 transition-all duration-400 ease-in-out ${
        plan.recommended
          ? 'bg-bg-card border-2 border-accent lg:-translate-y-4 shadow-[0_24px_50px_-24px_rgba(255,212,0,0.55)]'
          : 'bg-bg-card border border-border hover:border-accent/50 hover:-translate-y-2'
      }`}
    >
      {plan.recommended && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-sm bg-accent px-4 py-1 text-xs font-semibold uppercase tracking-wide text-bg-primary">
          Most Popular
        </span>
      )}

      <h3 className="font-display text-2xl tracking-wide text-ink-primary">{plan.name}</h3>
      <div className="mt-4 flex items-baseline gap-1">
        <span className="font-display text-4xl sm:text-5xl text-ink-primary">{plan.price}</span>
        <span className="text-ink-secondary text-sm">{plan.duration}</span>
      </div>

      <ul className="mt-8 flex-1 space-y-4">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm text-ink-secondary">
            <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-accent/15 text-accent flex items-center justify-center">
              <IconCheck className="w-3 h-3" />
            </span>
            {feature}
          </li>
        ))}
      </ul>

      <a
        href="#contact"
        className={`mt-9 text-center rounded-sm px-6 py-3.5 text-sm font-semibold uppercase tracking-wide transition-all duration-300 ${
          plan.recommended
            ? 'bg-accent text-bg-primary hover:bg-accent-hover hover:-translate-y-0.5 hover:shadow-[0_10px_26px_-10px_rgba(255,212,0,0.75)]'
            : 'border border-border text-ink-primary hover:border-accent hover:text-accent'
        }`}
      >
        {plan.cta}
      </a>
    </div>
  )
}

export default function Membership() {
  const membership = useManagedSection('membership', data.membership)

  return (
    <section id="membership" className="bg-bg-secondary py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="sticky top-[5.5rem] z-20">
          <div className="relative mx-auto pb-8">
            <div className="sticky top-[5.5rem] z-20 flex flex-wrap items-center justify-end gap-2">
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('forgewell:open-customizer', { detail: { key: 'membership' } }))}
                className="px-3 py-1 bg-[#222] text-sm rounded"
              >
                Customize
              </button>
              <button
                onClick={() => saveSection('membership', membership)}
                className="px-3 py-1 bg-accent text-bg-primary rounded text-sm font-semibold"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-accent font-mono text-xs sm:text-sm tracking-[0.25em] uppercase">
            {membership.eyebrow}
          </span>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl text-ink-primary">{membership.heading}</h2>
          <p className="mt-4 text-ink-secondary">{membership.description}</p>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8 lg:gap-6 max-w-5xl mx-auto">
          {membership.plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  )
}
