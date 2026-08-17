import data from '../data/gymData.json'

export default function Hero() {
  const hero = data.hero

  return (
    <section id="home" className="relative isolate min-h-screen flex items-center pt-20 pb-10">
      {/* Background image with overlays */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src={hero.backgroundImage}
          alt="Athlete training under gym lighting"
          className="w-full h-full object-cover animate-image-reveal"
        />
        <div className="absolute inset-0 bg-bg-primary/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/80 via-bg-primary/30 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full">
        <div className="max-w-3xl items-center flex flex-col text-center mx-auto">
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
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-semibold uppercase tracking-wide text-white
                transition-all duration-300 hover:bg-accent-hover hover:-translate-y-1
                hover:shadow-[0_12px_30px_-10px_rgb(var(--shadow)/0.75)] w-full sm:w-auto justify-center"
            >
              {hero.primaryCta}
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-4 text-sm font-semibold uppercase tracking-wide
                text-ink-primary transition-all duration-300 hover:border-accent hover:text-accent w-full sm:w-auto justify-center"
            >
              {hero.secondaryCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}