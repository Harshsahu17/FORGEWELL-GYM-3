import { Link } from 'react-router-dom'
import defaultData from '../data/gymData.json'
import useManagedSection from '../hooks/useManagedSection'
import { IconCheck } from './Icons'

// Splits a price string like "₹1,499" or "$1,499.99" into a leading
// currency symbol and the numeric amount — robust to decimals, unlike a
// naive regex-replace split (which breaks on "." in the price).
function splitPrice(price) {
  const match = String(price || '').match(/^([^\d]*)([\d.,]+)([^\d]*)$/)
  if (!match) return { symbol: '', amount: price || '' }
  return { symbol: match[1], amount: match[2] + match[3] }
}

function PlanCard({ plan, badgeLabel, billedText }) {
  const { symbol, amount } = splitPrice(plan.price)

  return (
    <div
      className={`relative flex flex-col items-center text-center bg-bg-card border rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 ${
        plan.recommended
          ? 'border-accent shadow-[0_20px_50px_-20px_rgb(var(--shadow)/0.6)]'
          : 'border-border hover:border-accent/50'
      }`}
    >
      {plan.recommended && badgeLabel && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white shadow-[0_8px_20px_-6px_rgb(var(--shadow)/0.7)] max-w-[85%] truncate">
          {badgeLabel}
        </span>
      )}

      <p className="text-ink-secondary text-sm mb-6 break-words">
        {billedText || 'Billed per month'}
      </p>

      <div className="flex items-start justify-center gap-1 mb-2 flex-wrap">
        <span className="text-ink-primary text-xl font-display mt-2 break-words">
          {symbol}
        </span>
        <span className="font-display text-4xl sm:text-5xl text-ink-primary leading-none break-words">
          {amount}
        </span>
        {plan.duration && (
          <span className="text-ink-secondary text-sm self-end mb-1 break-words">{plan.duration}</span>
        )}
      </div>

      <h3 className="font-display text-2xl text-ink-primary mt-2 break-words">{plan.name}</h3>
      <div className="w-10 h-0.5 bg-accent mt-2 mb-5" />

      <p className="text-ink-secondary text-sm leading-relaxed mb-6 break-words">
        {plan.shortDescription}
      </p>

      {plan.features && plan.features.length > 0 && (
        <ul className="w-full space-y-3 mb-8 text-left flex-1">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center">
                <IconCheck className="w-3 h-3 text-accent" />
              </span>
              <span className="text-sm text-ink-secondary break-words">{feature}</span>
            </li>
          ))}
        </ul>
      )}

      <Link
        to={`/inquiry?plan=${encodeURIComponent(plan.name)}`}
        className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white
          transition-all duration-300 hover:bg-accent-hover hover:shadow-[0_10px_26px_-10px_rgb(var(--shadow)/0.7)]
          hover:-translate-y-0.5 w-full text-center break-words"
      >
        {plan.cta}
      </Link>
    </div>
  )
}

export default function Membership() {
  const membership = useManagedSection('membership', defaultData.membership)

  return (
    <section id="membership" className="relative bg-bg-secondary py-16 sm:py-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-14">
          <span className="text-ink-secondary text-sm tracking-widest uppercase break-words">
            {membership.eyebrow}
          </span>
          <div className="w-10 h-0.5 bg-accent mx-auto mt-2 mb-6" />
          <h2 className="font-display text-4xl sm:text-5xl text-ink-primary break-words max-w-3xl mx-auto">
            {membership.heading}{' '}
            <span className="text-accent">{membership.headingAccent}</span>{' '}
            {membership.headingSuffix}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {membership.plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} badgeLabel={membership.badgeLabel} billedText={membership.billedText} />
          ))}
        </div>
      </div>
    </section>
  )
}