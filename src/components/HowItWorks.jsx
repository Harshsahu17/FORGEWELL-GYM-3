import data from '../data/gymData.json'

function Step({ step, isLast }) {
  return (
    <div className="relative flex-1 ">
      <div className="flex items-center gap-4 lg:block">
        <span className="font-display text-5xl sm:text-6xl text-outline lg:text-outline-accent leading-none">
          {step.number}
        </span>
        <div className="lg:mt-6">
          <h3 className="font-display text-xl sm:text-2xl text-ink-primary tracking-wide">{step.title}</h3>
        </div>
      </div>
      <p className="mt-4 text-sm text-ink-secondary leading-relaxed lg:max-w-xs">{step.description}</p>
    </div>
  )
}

export default function HowItWorks() {
  const howItWorks = data.howItWorks

  return (
    <section id="how-it-works" className="bg-bg-secondary py-16 sm:py-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-col items-center">
        <div className="max-w-2xl flex flex-col items-center">
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