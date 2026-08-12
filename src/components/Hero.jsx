import data from '../data/gymData.json'
import useManagedSection from '../utils/useManagedSection'
import { saveSection } from '../utils/dataManager'
import { IconArrowRight } from './Icons'

export default function Hero() {
  const hero = useManagedSection('hero', data.hero)
  const navbar = useManagedSection('navbar', data.navbar)

  return (
    <section id="home" className="relative isolate min-h-screen flex items-center overflow-visible pt-28 pb-16">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={hero.backgroundImage}
          alt="Athlete training under gym lighting"
          className="w-full h-full object-cover animate-image-reveal"
        />
        <div className="absolute inset-0 bg-bg-primary/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/35 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/85 via-bg-primary/35 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full">
        <div className="sticky top-[5.5rem] z-20 mb-8 flex flex-wrap items-center justify-end gap-2">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('forgewell:open-customizer', { detail: { key: 'hero' } }))}
            className="px-3 py-1 bg-[#222] text-sm rounded"
          >
            Customize
          </button>
          <button
            onClick={() => {
              saveSection('hero', hero)
              saveSection('navbar', navbar)
            }}
            className="px-3 py-1 bg-accent text-bg-primary rounded text-sm font-semibold"
          >
            Save
          </button>
        </div>

        <div className="max-w-3xl">
          <span
            className="inline-block opacity-0 animate-fade-down text-accent font-mono text-xs sm:text-sm tracking-[0.25em] uppercase"
            style={{ animationDelay: '0.1s' }}
          >
            {hero.eyebrow}
          </span>

          <h1 className="mt-5 font-display text-[13vw] sm:text-6xl md:text-7xl xl:text-8xl leading-[0.95] tracking-wide text-ink-primary">
            <span className="block opacity-0 animate-fade-up" style={{ animationDelay: '0.25s' }}>
              {hero.headlineTop}
            </span>
            <span className="block opacity-0 animate-fade-up text-accent" style={{ animationDelay: '0.4s' }}>
              {hero.headlineBottom}
            </span>
          </h1>

          <p
            className="mt-6 max-w-xl text-base sm:text-lg text-ink-secondary opacity-0 animate-fade-up"
            style={{ animationDelay: '0.55s' }}
          >
            {hero.description}
          </p>

          <div
            className="mt-9 flex flex-col sm:flex-row items-start sm:items-center gap-4 opacity-0 animate-fade-up"
            style={{ animationDelay: '0.7s' }}
          >
            <a
              href="#membership"
              className="group inline-flex items-center gap-2 rounded-sm bg-accent px-8 py-4 text-sm font-semibold uppercase tracking-wide text-bg-primary transition-all duration-300 hover:bg-accent-hover hover:-translate-y-1 hover:shadow-[0_12px_30px_-10px_rgba(255,212,0,0.75)] w-full sm:w-auto justify-center"
            >
              {hero.primaryCta}
              <IconArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-sm border border-border px-8 py-4 text-sm font-semibold uppercase tracking-wide text-ink-primary transition-all duration-300 hover:border-accent hover:text-accent w-full sm:w-auto justify-center"
            >
              {hero.secondaryCta}
            </a>
          </div>

          <div
            className="mt-14 grid grid-cols-3 max-w-md border-t border-border pt-6 opacity-0 animate-fade-up"
            style={{ animationDelay: '0.85s' }}
          >
            {hero.stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-2xl sm:text-3xl text-ink-primary">{stat.value}</p>
                <p className="mt-1 text-xs text-ink-secondary uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
