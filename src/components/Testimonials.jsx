import data from '../data/gymData.json'
import { IconStar } from './Icons'

function TestimonialCard({ item }) {
  return (
    <div className="bg-bg-card border border-border rounded-3xl p-8 flex flex-col h-full transition-all duration-300 hover:-translate-y-1 hover:border-accent/50">
      <div className="flex items-center gap-1 mb-5">
        {Array.from({ length: item.rating || 5 }).map((_, i) => (
          <IconStar key={i} className="w-4 h-4 text-accent" filled />
        ))}
      </div>

      <p className="text-ink-secondary text-sm leading-relaxed flex-1">
        "{item.quote}"
      </p>

      <div className="mt-6 flex items-center gap-3 pt-6 border-t border-border">
        <img
          src={item.avatar}
          alt={item.name}
          className="w-11 h-11 rounded-full object-cover border border-border"
        />
        <div>
          <p className="text-sm font-semibold text-ink-primary">{item.name}</p>
          <p className="text-xs text-ink-secondary">{item.role}</p>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const testimonials = data.testimonials

  return (
    <section id="testimonials" className="bg-bg-secondary py-16 sm:py-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-14">
          <span className="text-ink-secondary text-sm tracking-widest uppercase">
            {testimonials.eyebrow}
          </span>
          <div className="w-10 h-0.5 bg-accent mx-auto mt-2 mb-6" />
          <h2 className="font-display text-4xl sm:text-5xl text-ink-primary">
            {testimonials.heading}{' '}
            <span className="text-accent">{testimonials.headingAccent}</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.items.map((item) => (
            <TestimonialCard key={item.name} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}