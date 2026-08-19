import defaultData from '../data/gymData.json'
import useManagedSection from '../hooks/useManagedSection'
import { serviceIconMap } from './Icons'

function ServiceCard({ service }) {
  const Icon = serviceIconMap[service.icon]

  return (
    <div className="group relative overflow-hidden rounded-3xl aspect-square cursor-pointer">
      <img
        src={service.image || '/images/gallery-1.jpg'}
        alt={service.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      {/* Always-on gradient for title readability — extended so long text stays legible */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
      {/* Extra darkening on hover */}
      <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute inset-0 ring-1 ring-inset ring-accent/0 rounded-3xl transition-all duration-500 group-hover:ring-accent/40" />

      {Icon && (
        <div className="absolute top-4 left-4 flex items-center justify-center w-11 h-11 rounded-full bg-black/40 backdrop-blur-sm text-accent ring-1 ring-white/10 flex-shrink-0">
          <Icon className="w-5 h-5" />
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="font-display text-base text-white tracking-wide line-clamp-1 break-words">
          {service.title}
        </h3>
        <p className="mt-1 text-sm text-white/80 line-clamp-2 break-words leading-snug">
          {service.description}
        </p>
      </div>
    </div>
  )
}

export default function Services() {
  const services = useManagedSection('services', defaultData.services)

  return (
    <section id="services" className="relative bg-bg-primary py-16 sm:py-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-14">
          <span className="text-ink-secondary text-sm tracking-widest uppercase break-words">
            {services.eyebrow}
          </span>
          <div className="w-10 h-0.5 bg-accent mx-auto mt-2 mb-6" />
          <h2 className="font-display text-4xl sm:text-5xl text-ink-primary break-words max-w-3xl mx-auto">
            {services.heading}{' '}
            <span className="text-accent">{services.headingAccent}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {services.items.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}