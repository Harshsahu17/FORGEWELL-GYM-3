import data from '../data/gymData.json'
import { IconArrowRight, IconCheck } from './Icons'

export default function About() {
  const about = data.about

  return (
    <section id="about" className="relative bg-bg-secondary py-16 sm:py-16 overflow-visible">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div className="relative">
            <div className="group relative aspect-[4/5] max-w-sm mx-auto overflow-hidden rounded-3xl cursor-pointer">
              <img
                src={about.image}
                alt="Coach guiding a member through a lift at Forgewell"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute inset-0 ring-1 ring-inset ring-accent/0 rounded-3xl transition-all duration-500 group-hover:ring-accent/40" />
            </div>
          </div>

          <div>
            <span className="text-accent font-mono text-xs sm:text-sm tracking-[0.25em] uppercase">
              {about.eyebrow}
            </span>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl leading-[1.05] text-ink-primary">
              {about.heading}{' '}
              {about.headingAccent && (
                <span className="text-accent">{about.headingAccent}</span>
              )}
            </h2>
            <p className="mt-6 text-ink-secondary leading-relaxed">{about.description}</p>

            {about.highlights && about.highlights.length > 0 && (
              <ul className="mt-6 space-y-3">
                {about.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3">
                    <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center">
                      <IconCheck className="w-3 h-3 text-accent" />
                    </span>
                    <span className="text-sm text-ink-secondary">{highlight}</span>
                  </li>
                ))}
              </ul>
            )}

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
      </div>
    </section>
  )
}
