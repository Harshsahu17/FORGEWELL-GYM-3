import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import data from '../data/gymData.json'
import useManagedSection from '../hooks/useManagedSection'
import {
  IconArrowRight,
  IconUser,
  IconMail,
  IconPhone,
  IconCalendar,
  IconClipboardList,
  IconMessageSquare,
  IconCheck,
} from '../components/Icons'

export default function InquiryForm() {
  const copy = useManagedSection('inquiry', data.inquiry)
  const [searchParams] = useSearchParams()
  const preselectedPlan = searchParams.get('plan') || ''

  const plans = data.membership.plans.map((p) => p.name)
  const services = data.services.items.map((s) => s.title)

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    plan: preselectedPlan,
    joiningDate: '',
    services: [],
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function toggleService(service) {
    setForm((prev) => {
      const exists = prev.services.includes(service)
      return {
        ...prev,
        services: exists
          ? prev.services.filter((s) => s !== service)
          : [...prev.services, service],
      }
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="py-24 sm:py-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-ink-secondary hover:text-accent transition-colors duration-300 mb-5"
        >
          <IconArrowRight className="w-4 h-4 rotate-180" />
          {copy.backLinkText}
        </Link>

        <div className="grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-border shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]">
          {/* LEFT — branding / info panel */}
          <div className="relative bg-bg-card p-8 sm:p-12 flex flex-col justify-between overflow-hidden">
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-accent/15 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-56 h-56 bg-accent/10 blur-[90px] rounded-full pointer-events-none" />

            <div className="relative">
              <span className="text-accent font-mono text-xs sm:text-sm tracking-[0.25em] uppercase">
                {copy.eyebrow}
              </span>
              <h1 className="mt-4 font-display text-4xl sm:text-5xl leading-[1.05] text-ink-primary">
                {copy.headingMain} <span className="text-accent">{copy.headingAccent}</span>
              </h1>
              <p className="mt-5 text-ink-secondary leading-relaxed max-w-sm">
                {copy.description}
              </p>

              <ul className="mt-10 space-y-4">
                {copy.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center">
                      <IconCheck className="w-3 h-3 text-accent" />
                    </span>
                    <span className="text-sm text-ink-secondary">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative mt-12 pt-8 border-t border-border grid grid-cols-3 gap-4">
              {copy.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-2xl sm:text-3xl text-accent">{stat.value}</p>
                  <p className="mt-1 text-xs text-ink-secondary">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — form */}
          <div className="bg-bg-secondary p-6 sm:p-10">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10">
                <div className="w-14 h-14 rounded-full bg-accent/15 flex items-center justify-center mb-5">
                  <IconCheck className="w-6 h-6 text-accent" />
                </div>
                <p className="text-ink-primary font-semibold text-lg">{copy.successTitle}</p>
                <p className="mt-2 text-sm text-ink-secondary max-w-xs">
                  {copy.successMessage}
                </p>
                <Link
                  to="/"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-hover"
                >
                  {copy.backLinkText}
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name — full width */}
                <div className="relative">
                  <IconUser className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-secondary" />
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder={copy.placeholders.name}
                    value={form.name}
                    onChange={handleChange}
                    className="w-full bg-bg-card border border-border pl-11 pr-4 py-3.5 rounded-xl text-sm text-ink-primary placeholder:text-ink-secondary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
                  />
                </div>

                {/* Email (big) + Phone (small) */}
                <div className="grid grid-cols-5 gap-4">
                  <div className="relative col-span-3">
                    <IconMail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-secondary" />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder={copy.placeholders.email}
                      value={form.email}
                      onChange={handleChange}
                      className="w-full bg-bg-card border border-border pl-11 pr-4 py-3.5 rounded-xl text-sm text-ink-primary placeholder:text-ink-secondary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
                    />
                  </div>
                  <div className="relative col-span-2">
                    <IconPhone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-secondary" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder={copy.placeholders.phone}
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full bg-bg-card border border-border pl-11 pr-3 py-3.5 rounded-xl text-sm text-ink-primary placeholder:text-ink-secondary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
                    />
                  </div>
                </div>

                {/* Gender selection */}
                <div>
                  <label className="block text-xs text-ink-secondary mb-2.5 uppercase tracking-wide">
                    {copy.labels.gender}
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {copy.genderOptions.map((g) => (
                      <label
                        key={g}
                        className={`flex items-center justify-center gap-2 py-3 rounded-xl border text-sm cursor-pointer transition-all duration-200 ${
                          form.gender === g
                            ? 'border-accent bg-accent/10 text-ink-primary'
                            : 'border-border bg-bg-card text-ink-secondary hover:border-accent/40'
                        }`}
                      >
                        <input
                          type="radio"
                          name="gender"
                          value={g}
                          checked={form.gender === g}
                          onChange={handleChange}
                          className="accent-accent w-3.5 h-3.5"
                        />
                        {g}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Plan + Joining Date */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-ink-secondary mb-2.5 uppercase tracking-wide">
                      {copy.labels.plan}
                    </label>
                    <div className="relative">
                      <IconClipboardList className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-secondary pointer-events-none" />
                      <select
                        name="plan"
                        required
                        value={form.plan}
                        onChange={handleChange}
                        className="w-full appearance-none bg-bg-card border border-border pl-11 pr-4 py-3.5 rounded-xl text-sm text-ink-primary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
                      >
                        <option value="" disabled>
                          {copy.labels.planPlaceholder}
                        </option>
                        {plans.map((planName) => (
                          <option key={planName} value={planName}>
                            {planName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-ink-secondary mb-2.5 uppercase tracking-wide">
                      {copy.labels.joiningDate}
                    </label>
                    <div className="relative">
                      <IconCalendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-secondary pointer-events-none" />
                      <input
                        type="date"
                        name="joiningDate"
                        required
                        value={form.joiningDate}
                        onChange={handleChange}
                        className="w-full bg-bg-card border border-border pl-11 pr-4 py-3.5 rounded-xl text-sm text-ink-primary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all [color-scheme:dark]"
                      />
                    </div>
                  </div>
                </div>

                {/* Services checkboxes */}
                <div>
                  <label className="block text-xs text-ink-secondary mb-2.5 uppercase tracking-wide">
                    {copy.labels.services}
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {services.map((service) => (
                      <label
                        key={service}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs cursor-pointer transition-all duration-200 ${
                          form.services.includes(service)
                            ? 'border-accent bg-accent/10 text-ink-primary'
                            : 'border-border bg-bg-card text-ink-secondary hover:border-accent/40'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={form.services.includes(service)}
                          onChange={() => toggleService(service)}
                          className="accent-accent w-3.5 h-3.5"
                        />
                        {service}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="relative">
                  <IconMessageSquare className="absolute left-4 top-4 w-4 h-4 text-ink-secondary" />
                  <textarea
                    name="message"
                    rows={3}
                    placeholder={copy.placeholders.message}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full bg-bg-card border border-border pl-11 pr-4 py-3.5 rounded-xl text-sm text-ink-primary placeholder:text-ink-secondary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-hover hover:-translate-y-0.5 hover:shadow-[0_10px_26px_-10px_rgb(var(--shadow)/0.7)]"
                >
                  {copy.submitButtonText}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
