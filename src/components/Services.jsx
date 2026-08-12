import data from '../data/gymData.json'
import useManagedSection from '../utils/useManagedSection'
import { saveSection } from '../utils/dataManager'
import { serviceIconMap, IconArrowRight } from './Icons'

function ServiceCard({ service }) {
  const Icon = serviceIconMap[service.icon]

  return (
    <>
    <div className="group relative rounded-sm border border-border bg-bg-card p-8 transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-accent/60 hover:shadow-[0_20px_40px_-24px_rgb(var(--shadow)/0.5)]">
      <div className="flex items-center justify-center w-14 h-14 rounded-sm bg-bg-primary border border-border text-accent transition-all duration-300 group-hover:scale-110 group-hover:border-accent">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="mt-6 font-display text-xl tracking-wide text-ink-primary">{service.title}</h3>
      <p className="mt-3 text-sm text-ink-secondary leading-relaxed">{service.description}</p>
      <a  
      href="#membership"
      className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent opacity-80 transition-all duration-300 group-hover:opacity-100 group-hover:gap-2.5"
      >
      Learn More
      <IconArrowRight className="w-3.5 h-3.5" />
    </a>
    <div className="absolute inset-x-0 bottom-0 h-0.5 bg-accent scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100">
    </div>  
    </div>
    </>
  )
}

export default function Services() {
  const services = useManagedSection('services', data.services)

  return (
    <section id="services" className="bg-bg-primary py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="sticky top-[5.5rem] z-20 mb-8 flex flex-wrap items-center justify-end gap-2">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('forgewell:open-customizer', { detail: { key: 'services' } }))}
            className="px-3 py-1 bg-[#222] text-sm rounded"
          >
            Customize
          </button>
          <button
            onClick={() => saveSection('services', services)}
            className="px-3 py-1 bg-accent text-bg-primary rounded text-sm font-semibold"
          >
            Save
          </button>
        </div>

        <div className="max-w-2xl">
          <span className="text-accent font-mono text-xs sm:text-sm tracking-[0.25em] uppercase">
            {services.eyebrow}
          </span>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl text-ink-primary">{services.heading}</h2>
          <p className="mt-4 text-ink-secondary">{services.description}</p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.items.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}