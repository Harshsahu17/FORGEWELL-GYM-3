import { useState } from 'react'
import data from '../data/gymData.json'
import useManagedSection from '../hooks/useManagedSection'

export default function ContactForm() {
  const footer = useManagedSection('footer', data.footer)
  const copy = useManagedSection('contactForm', data.contactForm)
  const contact = footer.contact
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="relative bg-bg-secondary py-16 sm:py-16 overflow-visible">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Left: Image */}
          <div className="relative">
            <div className="group relative aspect-[4/5] max-w-sm mx-auto overflow-hidden rounded-3xl cursor-pointer">
              <img
                src={contact.image}
                alt="Get in touch with Forgewell"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute inset-0 ring-1 ring-inset ring-accent/0 rounded-3xl transition-all duration-500 group-hover:ring-accent/40" />
            </div>
          </div>

          {/* Right: Heading + Form */}
          <div>
            <span className="text-accent font-mono text-xs sm:text-sm tracking-[0.25em] uppercase">
              {copy.eyebrow}
            </span>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl leading-[1.05] text-ink-primary">
              {copy.headingMain} <span className="text-accent">{copy.headingAccent}</span>
            </h2>
            <p className="mt-6 text-ink-secondary leading-relaxed">
              {copy.description}
            </p>

            <div className="mt-8">
              {submitted ? (
                <div className="bg-bg-card border border-border rounded-2xl p-8 text-center">
                  <p className="text-ink-primary font-semibold">{copy.successTitle}</p>
                  <p className="mt-2 text-sm text-ink-secondary">{copy.successMessage}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder={copy.placeholders.name}
                      value={form.name}
                      onChange={handleChange}
                      className="w-full bg-bg-card border border-border px-4 py-3 rounded-lg text-sm text-ink-primary placeholder:text-ink-secondary focus:border-accent focus:outline-none transition-colors"
                    />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder={copy.placeholders.email}
                      value={form.email}
                      onChange={handleChange}
                      className="w-full bg-bg-card border border-border px-4 py-3 rounded-lg text-sm text-ink-primary placeholder:text-ink-secondary focus:border-accent focus:outline-none transition-colors"
                    />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder={copy.placeholders.phone}
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full bg-bg-card border border-border px-4 py-3 rounded-lg text-sm text-ink-primary placeholder:text-ink-secondary focus:border-accent focus:outline-none transition-colors"
                  />
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder={copy.placeholders.message}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full bg-bg-card border border-border px-4 py-3 rounded-lg text-sm text-ink-primary placeholder:text-ink-secondary focus:border-accent focus:outline-none transition-colors resize-none"
                  />
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="w-full sm:w-auto rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-hover hover:-translate-y-0.5 hover:shadow-[0_10px_26px_-10px_rgb(var(--shadow)/0.7)]"
                    >
                      {copy.submitButtonText}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
