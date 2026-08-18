import { useState, useEffect } from 'react'
import data from '../data/gymData.json'
import { IconStar } from './Icons'

export default function Testimonials() {
  const testimonials = data.testimonials
  const [index, setIndex] = useState(0)

  const item = testimonials.items[index]
  const total = testimonials.items.length

  const goPrev = () => setIndex((i) => (i - 1 + total) % total)
  const goNext = () => setIndex((i) => (i + 1) % total)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % total)
    }, 5000)
    return () => clearInterval(timer)
  }, [index, total])

  return (
    <section id="testimonials" className="bg-bg-primary py-16 sm:py-16">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-14">
          <span className="text-accent font-mono text-xs sm:text-sm tracking-[0.25em] uppercase">
            {testimonials.eyebrow}
          </span>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl text-ink-primary">
            {testimonials.heading}{' '}
            <span className="text-accent">{testimonials.headingAccent}</span>
          </h2>
        </div>

        <div className="relative flex items-center justify-center overflow-hidden">
          {/* Prev arrow */}
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous testimonial"
            className="absolute left-0 sm:left-2 z-10 flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full border border-border bg-bg-primary text-ink-secondary transition-all duration-300 hover:border-accent hover:text-accent"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Content — key forces remount so the animation replays every change */}
          <div key={index} className="text-center px-16 sm:px-24 opacity-0 animate-slide-up">
            <div className="flex items-center justify-center gap-1 mb-5">
              {Array.from({ length: item.rating || 5 }).map((_, i) => (
                <IconStar key={i} className="w-4 h-4 text-accent" filled />
              ))}
            </div>

            <p className="max-w-md mx-auto text-lg sm:text-xl text-ink-secondary leading-relaxed">
              "{item.quote}"
            </p>

            <div className="mt-8 flex items-center justify-center gap-3">
              <img
                src={item.avatar}
                alt={item.name}
                className="w-11 h-11 rounded-full object-cover border border-border"
              />
              <div className="text-left">
                <p className="text-sm font-semibold text-ink-primary">{item.name}</p>
                <p className="text-xs text-ink-secondary">{item.role}</p>
              </div>
            </div>
          </div>

          {/* Next arrow */}
          <button
            type="button"
            onClick={goNext}
            aria-label="Next testimonial"
            className="absolute right-0 sm:right-2 z-10 flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full border border-border bg-bg-primary text-ink-secondary transition-all duration-300 hover:border-accent hover:text-accent"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="mt-10 flex items-center justify-center gap-2">
          {testimonials.items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? 'w-6 bg-accent' : 'w-1.5 bg-border'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}