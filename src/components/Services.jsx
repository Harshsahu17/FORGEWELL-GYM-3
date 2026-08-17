import data from '../data/gymData.json'

function ServiceCard({ service }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl aspect-square cursor-pointer">
      <img
        src={service.image || '/images/gallery-1.jpg'}
        alt={service.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      {/* Always-on gradient for title readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      {/* Extra darkening on hover */}
      <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute inset-0 ring-1 ring-inset ring-accent/0 rounded-3xl transition-all duration-500 group-hover:ring-accent/40" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="font-display text-base text-white tracking-wide">{service.title}</h3>
        <p className="text-sm text-white/80">{service.description}</p>
      </div>
    </div>
  )
}

export default function Services() {
  const services = data.services

  return (
    <section id="services" className="bg-bg-primary py-16 sm:py-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {services.items.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}