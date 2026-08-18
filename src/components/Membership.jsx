import { Link } from 'react-router-dom'
import data from '../data/gymData.json'
import { IconCheck } from './Icons'

function PlanCard({ plan, badgeLabel }) {
  return (
    <div
      className={`relative flex flex-col items-center text-center bg-bg-card border rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 ${
        plan.recommended
          ? 'border-accent shadow-[0_20px_50px_-20px_rgb(var(--shadow)/0.6)]'
          : 'border-border hover:border-accent/50'
      }`}
    >
      {plan.recommended && badgeLabel && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white shadow-[0_8px_20px_-6px_rgb(var(--shadow)/0.7)]">
          {badgeLabel}
        </span>
      )}

      <p className="text-ink-secondary text-sm mb-6">
        {data.membership.billedText || 'Billed per month'}
      </p>

      <div className="flex items-start gap-1 mb-2">
        <span className="text-ink-primary text-xl font-display mt-2">
          {plan.price.replace(/[0-9,]+/, '')}
        </span>
        <span className="font-display text-5xl sm:text-6xl text-ink-primary leading-none">
          {plan.price.replace(/[^0-9,]/g, '')}
        </span>
        {plan.duration && (
          <span className="text-ink-secondary text-sm self-end mb-1">{plan.duration}</span>
        )}
      </div>

      <h3 className="font-display text-2xl text-ink-primary mt-2">{plan.name}</h3>
      <div className="w-10 h-0.5 bg-accent mt-2 mb-5" />

      <p className="text-ink-secondary text-sm leading-relaxed mb-6">
        {plan.shortDescription}
      </p>

      {plan.features && plan.features.length > 0 && (
        <ul className="w-full space-y-3 mb-8 text-left flex-1">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center">
                <IconCheck className="w-3 h-3 text-accent" />
              </span>
              <span className="text-sm text-ink-secondary">{feature}</span>
            </li>
          ))}
        </ul>
      )}

      <Link
        to={`/inquiry?plan=${encodeURIComponent(plan.name)}`}
        className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white
          transition-all duration-300 hover:bg-accent-hover hover:shadow-[0_10px_26px_-10px_rgb(var(--shadow)/0.7)]
          hover:-translate-y-0.5 w-full text-center"
      >
        {plan.cta}
      </Link>
    </div>
  )
}

export default function Membership() {
  const membership = data.membership

  return (
    <section id="membership" className="bg-bg-secondary py-16 sm:py-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
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

        <div className="grid md:grid-cols-3 gap-8">
          {membership.plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} badgeLabel={membership.badgeLabel} />
          ))}
        </div>
      </div>
    </section>
  )
}
