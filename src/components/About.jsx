import data from '../data/gymData.json'
import useManagedSection from '../utils/useManagedSection'
import { saveSection } from '../utils/dataManager'
import { IconArrowRight } from './Icons'

export default function About() {
  const about = useManagedSection('about', data.about)

  return (
    <section id="about" className="relative bg-bg-secondary py-24 sm:py-32 overflow-visible">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="sticky top-[5.5rem] z-20">
          <div className="relative mx-auto pb-8">
            <div className="sticky top-[5.5rem] z-20 flex flex-wrap items-center justify-end gap-2">
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('forgewell:open-customizer', { detail: { key: 'about' } }))}
                className="px-3 py-1 bg-[#222] text-sm rounded"
              >
                Customize
              </button>
              <button
                onClick={() => saveSection('about', about)}
                className="px-3 py-1 bg-accent text-bg-primary rounded text-sm font-semibold"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        <div className="relative">
          <div className="relative aspect-[4/5] max-w-md mx-auto lg:max-w-none overflow-hidden rounded-sm">
            <img
              src={about.image}
              alt="Coach guiding a member through a lift at Forgewell"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-border" />
          </div>
          {/* Accent frame offset behind the image */}
          <div className="hidden sm:block absolute -bottom-6 -right-6 w-40 h-40 border border-accent/40 -z-10" />
        </div>

        <div>
          <span className="text-accent font-mono text-xs sm:text-sm tracking-[0.25em] uppercase">
            {about.eyebrow}
          </span>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl leading-[1.05] text-ink-primary">
            {about.heading}
          </h2>
          <p className="mt-6 text-ink-secondary leading-relaxed">{about.description}</p>

          <div className="mt-10 grid grid-cols-3 gap-6 border-y border-border py-7">
            {about.stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl sm:text-4xl text-accent">{stat.value}</p>
                <p className="mt-2 text-xs sm:text-sm text-ink-secondary leading-snug">{stat.label}</p>
              </div>
            ))}
          </div>

          <a
            href="#services"
            className="group mt-9 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-ink-primary transition-colors duration-300 hover:text-accent"
          >
            {about.cta}
            <IconArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  )
}

