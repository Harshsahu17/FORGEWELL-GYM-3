import data from '../data/gymData.json'
import useManagedSection from '../utils/useManagedSection'
import { saveSection } from '../utils/dataManager'

function PlanCard({ plan }) {
  return (
    <div className="flex flex-col items-center text-center bg-bg-card border border-border rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50">
      {/* Billed per month */}
      <p className="text-ink-secondary text-sm mb-6">
        {data.membership.billedText || 'Billed per month'}
      </p>

      {/* Price */}
      <div className="flex items-start gap-1 mb-2">
        <span className="text-ink-primary text-xl font-display mt-2">
          {plan.price.replace(/[0-9,]+/, '')}
        </span>
        <span className="font-display text-5xl sm:text-6xl text-ink-primary leading-none">
          {plan.price.replace(/[^0-9,]/g, '')}
        </span>
      </div>

      {/* Plan name */}
      <h3 className="font-display text-2xl text-ink-primary mt-2">{plan.name}</h3>
      {/* Orange underline */}
      <div className="w-10 h-0.5 bg-accent mt-2 mb-5" />

      {/* Short description */}
      <p className="text-ink-secondary text-sm leading-relaxed mb-8 flex-1">
        {plan.shortDescription || plan.features.slice(0, 2).join(', ')}
      </p>

      {/* CTA button */}
      <a
        href="#contact"
        className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white
          transition-all duration-300 hover:bg-accent-hover hover:shadow-[0_10px_26px_-10px_rgb(var(--shadow)/0.7)]
          hover:-translate-y-0.5 w-full"
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
        {/* Customize / Save controls */}
        <div className="sticky top-[5.5rem] z-20 mb-8 flex flex-wrap items-center justify-end gap-2">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('forgewell:open-customizer', { detail: { key: 'membership' } }))}
            className="px-3 py-1 bg-[#222] text-sm rounded"
          >
            Customize
          </button>
          <button
            onClick={() => saveSection('membership', membership)}
            className="px-3 py-1 bg-accent text-white rounded text-sm font-semibold"
          >
            Save
          </button>
        </div>

        {/* Section header — centered */}
        <div className="text-center mb-14">
          <span className="text-ink-secondary text-sm tracking-widest uppercase">
            {membership.eyebrow}
          </span>
          <div className="w-10 h-0.5 bg-accent mx-auto mt-2 mb-6" />
          <h2 className="font-display text-4xl sm:text-5xl text-ink-primary">
            {membership.heading}{' '}
            <span className="text-accent">{membership.headingAccent}</span>{' '}
            {membership.headingSuffix}
          </h2>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {membership.plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  )
}
