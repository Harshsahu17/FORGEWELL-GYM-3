import data from '../data/gymData.json'
import useManagedSection from '../utils/useManagedSection'
import { saveSection } from '../utils/dataManager'

function ServiceCard({ service }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl aspect-[4/5] cursor-pointer">
      {/* Background image */}
      <img
        src={service.image || '/images/gallery-1.jpg'}
        alt={service.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      {/* Service title at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="font-display text-xl text-white tracking-wide">{service.title}</h3>
      </div>
    </div>
  )
}

export default function Services() {
  const services = useManagedSection('services', data.services)

  return (
    <section id="services" className="bg-bg-primary py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Customize / Save controls */}
        <div className="sticky top-[5.5rem] z-20 mb-8 flex flex-wrap items-center justify-end gap-2">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('forgewell:open-customizer', { detail: { key: 'services' } }))}
            className="px-3 py-1 bg-[#222] text-sm rounded"
          >
            Customize
          </button>
          <button
            onClick={() => saveSection('services', services)}
            className="px-3 py-1 bg-accent text-white rounded text-sm font-semibold"
          >
            Save
          </button>
        </div>

        {/* Section header — centered */}
        <div className="text-center mb-14">
          <span className="text-ink-secondary text-sm tracking-widest uppercase">
            {services.eyebrow}
          </span>
          <div className="w-10 h-0.5 bg-accent mx-auto mt-2 mb-6" />
          <h2 className="font-display text-4xl sm:text-5xl text-ink-primary">
            {services.heading}{' '}
            <span className="text-accent">{services.headingAccent}</span>
          </h2>
        </div>

        {/* Image cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.items.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}
