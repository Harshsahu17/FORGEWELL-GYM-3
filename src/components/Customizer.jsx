import { useEffect, useState } from 'react'
import defaultData from '../data/gymData.json'
import {
  OPEN_EVENT,
  getSection,
  previewSection,
  restoreSavedPreview,
  saveSection,
  saveSections,
  openCustomizer,
} from '../utils/dataManager'
import { applyTheme, createThemeFromAccent, DEFAULT_THEME, hexToRgbTriplet, rgbTripletToHex } from '../utils/theme'

const IconClose = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
)

function Panel({ title, onClose, onBack, onReset, onSave, error, children }) {
  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-y-0 left-0 right-0 sm:right-[var(--customizer-width)]" onClick={onClose} />
      <div className="relative w-full sm:w-[var(--customizer-width)] h-full bg-bg-secondary border-l border-border flex flex-col shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-3">
            {onBack && <button onClick={onBack} className="flex h-9 w-9 items-center justify-center text-2xl leading-none text-ink-secondary hover:text-accent transition-colors" aria-label="Back to sections">←</button>}
            <h2 className="font-display text-lg tracking-wide text-ink-primary">{title}</h2>
          </div>
          <button onClick={onClose} className="text-ink-secondary hover:text-accent transition-colors" aria-label="Close">
            <IconClose />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">{children}</div>
        <div className="px-5 py-4 border-t border-border">
          {error && <p className="mb-3 text-xs text-red-300">{error}</p>}
          <div className="flex gap-3">
          <button
            onClick={onReset}
            className="flex-1 rounded-full border border-border py-3 text-sm font-semibold text-ink-secondary hover:text-ink-primary hover:border-ink-secondary transition-colors"
          >
            Reset
          </button>
          <button
            onClick={onSave}
            className="flex-1 rounded-full bg-accent py-3 text-sm font-semibold text-white hover:bg-accent-hover transition-colors"
          >
            Save
          </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const sectionOptions = [
  ['hero', 'Hero, Nav & Theme'],
  ['about', 'About'],
  ['services', 'Services'],
  ['membership', 'Membership'],
  ['testimonials', 'Testimonials'],
  ['howItWorks', 'How It Works'],
  ['contact', 'Contact'],
  ['inquiry', 'Inquiry Form'],
]

function SectionPicker({ onClose }) {
  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-y-0 left-0 right-0 sm:right-[var(--customizer-width)]" onClick={onClose} />
      <div className="relative w-full sm:w-[var(--customizer-width)] h-full overflow-y-auto bg-bg-secondary border-l border-border p-5 shadow-2xl">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <h2 className="font-display text-lg tracking-wide text-ink-primary">Choose Section</h2>
          <button onClick={onClose} className="text-ink-secondary hover:text-accent transition-colors" aria-label="Close">
            <IconClose />
          </button>
        </div>
        <div className="mt-5 space-y-3">
          {sectionOptions.map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => openCustomizer(key)}
              className="w-full rounded-lg border border-border bg-bg-card px-4 py-3 text-left text-sm font-semibold text-ink-primary transition-colors hover:border-accent hover:text-accent"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-wide text-ink-secondary mb-1.5">{label}</span>
      {children}
    </label>
  )
}

const inputCls =
  'w-full bg-bg-card border border-border rounded-lg px-3 py-2.5 text-sm text-ink-primary placeholder:text-ink-secondary focus:border-accent focus:outline-none transition-colors'

function TextInput(props) {
  return <input type="text" className={inputCls} {...props} />
}
function TextArea(props) {
  return <textarea rows={3} className={`${inputCls} resize-none`} {...props} />
}

function UploadField({ label, value, onChange }) {
  const handleFile = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const image = new Image()
      image.onload = () => {
        const scale = Math.min(1, 1600 / Math.max(image.width, image.height))
        const canvas = document.createElement('canvas')
        canvas.width = Math.max(1, Math.round(image.width * scale))
        canvas.height = Math.max(1, Math.round(image.height * scale))
        canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height)
        onChange(canvas.toDataURL('image/jpeg', 0.82))
      }
      image.src = reader.result
    }
    reader.readAsDataURL(file)
  }

  return (
    <Field label={label}>
      <div className="space-y-2">
        <input type="file" accept="image/*" onChange={handleFile} className="w-full text-xs text-ink-secondary file:mr-3 file:rounded-lg file:border-0 file:bg-accent file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white hover:file:bg-accent-hover" />
        {value && <img src={value} alt="Selected preview" className="h-20 w-full rounded-lg object-cover border border-border" />}
      </div>
    </Field>
  )
}

function ColorField({ label, value, onChange }) {
  return (
    <Field label={label}>
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={rgbTripletToHex(value)}
          onChange={(e) => onChange(hexToRgbTriplet(e.target.value))}
          className="w-10 h-10 rounded-lg border border-border bg-transparent cursor-pointer"
        />
        <span className="text-xs text-ink-secondary font-mono">{value}</span>
      </div>
    </Field>
  )
}

function ArrayEditor({ items, onChange, renderItem, newItem, addLabel = 'Add item' }) {
  const update = (i, next) => onChange(items.map((it, idx) => (idx === i ? next : it)))

  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={i} className="rounded-xl border border-border bg-bg-card p-4 space-y-3">
          {renderItem(item, (next) => update(i, next), i)}
        </div>
      ))}
    </div>
  )
}

export default function Customizer() {
  const [openKey, setOpenKey] = useState(null)
  const [hero, setHero] = useState(null)
  const [navbar, setNavbar] = useState(null)
  const [theme, setThemeState] = useState(null)
  const [about, setAbout] = useState(null)
  const [services, setServices] = useState(null)
  const [membership, setMembership] = useState(null)
  const [howItWorks, setHowItWorks] = useState(null)
  const [footer, setFooter] = useState(null)
  const [testimonials, setTestimonials] = useState(null)
  const [contactForm, setContactForm] = useState(null)
  const [inquiry, setInquiry] = useState(null)
  const [saveError, setSaveError] = useState('')

  useEffect(() => {
    const onOpen = (e) => {
      const key = e.detail?.key
      if (!key) {
        setSaveError('')
        setOpenKey('select')
        return
      }
      if (key === 'hero') {
        setHero(getSection('hero'))
        setNavbar(getSection('navbar'))
        setThemeState(getSection('theme') || DEFAULT_THEME)
      } else if (key === 'about') setAbout(getSection('about'))
      else if (key === 'services') setServices(getSection('services'))
      else if (key === 'membership') setMembership(getSection('membership'))
      else if (key === 'howItWorks') setHowItWorks(getSection('howItWorks'))
      else if (key === 'footer') setFooter(getSection('footer'))
      else if (key === 'testimonials') setTestimonials(getSection('testimonials'))
      else if (key === 'contact') {
        setFooter(getSection('footer'))
        setContactForm(getSection('contactForm'))
      } else if (key === 'inquiry') setInquiry(getSection('inquiry'))
      setSaveError('')
      setOpenKey(key)
      const sectionIds = { howItWorks: 'how-it-works', inquiry: 'inquiry' }
      const target = document.getElementById(sectionIds[key] || key)
      if (target) {
        window.setTimeout(() => {
          window.scrollTo({
            top: target.getBoundingClientRect().top + window.scrollY - 120,
            behavior: 'smooth',
          })
        }, 0)
      }
    }
    window.addEventListener(OPEN_EVENT, onOpen)
    return () => window.removeEventListener(OPEN_EVENT, onOpen)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('customizer-open', !!openKey)
    return () => document.body.classList.remove('customizer-open')
  }, [openKey])

  const updateHero = (next) => { setHero(next); previewSection('hero', next) }
  const updateNavbar = (next) => { setNavbar(next); previewSection('navbar', next) }
  const updateTheme = (next) => { setThemeState(next); applyTheme(next); previewSection('theme', next) }
  const updateAbout = (next) => { setAbout(next); previewSection('about', next) }
  const updateServices = (next) => { setServices(next); previewSection('services', next) }
  const updateMembership = (next) => { setMembership(next); previewSection('membership', next) }
  const updateHowItWorks = (next) => { setHowItWorks(next); previewSection('howItWorks', next) }
  const updateFooter = (next) => { setFooter(next); previewSection('footer', next) }
  const updateTestimonials = (next) => { setTestimonials(next); previewSection('testimonials', next) }
  const updateContactForm = (next) => { setContactForm(next); previewSection('contactForm', next) }
  const updateContactFooter = (next) => { setFooter(next); previewSection('footer', next) }
  const updateInquiry = (next) => { setInquiry(next); previewSection('inquiry', next) }

  function handleClose() {
    if (openKey === 'hero') {
      restoreSavedPreview('hero')
      restoreSavedPreview('navbar')
      restoreSavedPreview('theme')
      applyTheme(getSection('theme'))
    } else if (openKey === 'contact') {
      restoreSavedPreview('footer')
      restoreSavedPreview('contactForm')
    } else if (openKey) {
      restoreSavedPreview(openKey)
    }
    setOpenKey(null)
  }

  function handleBack() {
    handleClose()
    setOpenKey('select')
  }

  function handleSave() {
    try {
      if (openKey === 'hero') {
        saveSections({ hero, navbar, theme })
      } else if (openKey === 'about') saveSection('about', about)
      else if (openKey === 'services') saveSection('services', services)
      else if (openKey === 'membership') saveSection('membership', membership)
      else if (openKey === 'howItWorks') saveSection('howItWorks', howItWorks)
      else if (openKey === 'footer') saveSection('footer', footer)
      else if (openKey === 'testimonials') saveSection('testimonials', testimonials)
      else if (openKey === 'contact') {
        saveSection('footer', footer)
        saveSection('contactForm', contactForm)
      } else if (openKey === 'inquiry') saveSection('inquiry', inquiry)
      setOpenKey(null)
    } catch {
      setSaveError('Image is too large to save. Choose a smaller image or remove an older uploaded image.')
    }
  }

  function handleReset() {
    setSaveError('')
    if (openKey === 'hero') {
      setHero(defaultData.hero)
      setNavbar(defaultData.navbar)
      setThemeState(DEFAULT_THEME)
      previewSection('hero', defaultData.hero)
      previewSection('navbar', defaultData.navbar)
      previewSection('theme', DEFAULT_THEME)
      saveSections({ hero: defaultData.hero, navbar: defaultData.navbar, theme: DEFAULT_THEME })
      applyTheme(DEFAULT_THEME)
    } else if (openKey === 'contact') {
      setFooter(defaultData.footer)
      setContactForm(defaultData.contactForm)
      previewSection('footer', defaultData.footer)
      previewSection('contactForm', defaultData.contactForm)
      saveSections({ footer: defaultData.footer, contactForm: defaultData.contactForm })
    } else {
      const defaults = {
        about: defaultData.about,
        services: defaultData.services,
        membership: defaultData.membership,
        howItWorks: defaultData.howItWorks,
        testimonials: defaultData.testimonials,
        inquiry: defaultData.inquiry,
        footer: defaultData.footer,
      }
      const value = defaults[openKey]
      if (!value) return
      const setters = { about: setAbout, services: setServices, membership: setMembership, howItWorks: setHowItWorks, testimonials: setTestimonials, inquiry: setInquiry, footer: setFooter }
      setters[openKey](value)
      previewSection(openKey, value)
      saveSection(openKey, value)
    }
  }

  if (!openKey) return null
  if (openKey === 'select') return <SectionPicker onClose={() => setOpenKey(null)} />

  return (
    <Panel title={panelTitle(openKey)} onClose={handleClose} onBack={handleBack} onReset={handleReset} onSave={handleSave} error={saveError}>
      {openKey === 'hero' && hero && navbar && theme && (
        <>
          <Section title="Logo & Nav">
            <Field label="Logo Text"><TextInput value={navbar.logo} onChange={(e) => updateNavbar({ ...navbar, logo: e.target.value })} /></Field>
            <Field label="Logo Accent"><TextInput value={navbar.logoAccent} onChange={(e) => updateNavbar({ ...navbar, logoAccent: e.target.value })} /></Field>
            <UploadField label="Logo Image" value={navbar.logoImage} onChange={(logoImage) => updateNavbar({ ...navbar, logoImage })} />
            <Field label="Nav CTA Text"><TextInput value={navbar.cta} onChange={(e) => updateNavbar({ ...navbar, cta: e.target.value })} /></Field>
          </Section>

          <Section title="Hero Content">
            <Field label="Eyebrow"><TextInput value={hero.eyebrow} onChange={(e) => updateHero({ ...hero, eyebrow: e.target.value })} /></Field>
            <Field label="Headline (Line 1)"><TextInput value={hero.headlineTop} onChange={(e) => updateHero({ ...hero, headlineTop: e.target.value })} /></Field>
            <Field label="Headline (Line 2, accent)"><TextInput value={hero.headlineBottom} onChange={(e) => updateHero({ ...hero, headlineBottom: e.target.value })} /></Field>
            <Field label="Description"><TextArea value={hero.description} onChange={(e) => updateHero({ ...hero, description: e.target.value })} /></Field>
            <Field label="Primary CTA"><TextInput value={hero.primaryCta} onChange={(e) => updateHero({ ...hero, primaryCta: e.target.value })} /></Field>
            <Field label="Secondary CTA"><TextInput value={hero.secondaryCta} onChange={(e) => updateHero({ ...hero, secondaryCta: e.target.value })} /></Field>
            <UploadField label="Background Image" value={hero.backgroundImage} onChange={(backgroundImage) => updateHero({ ...hero, backgroundImage })} />
          </Section>

          <Section title="Theme Color">
            <ColorField
              label="Choose a primary color"
              value={theme.accent}
              onChange={(accent) => updateTheme(createThemeFromAccent(accent))}
            />
          </Section>
        </>
      )}

      {openKey === 'about' && about && (
        <>
          <Field label="Eyebrow"><TextInput value={about.eyebrow} onChange={(e) => updateAbout({ ...about, eyebrow: e.target.value })} /></Field>
          <Field label="Heading"><TextInput value={about.heading} onChange={(e) => updateAbout({ ...about, heading: e.target.value })} /></Field>
          <Field label="Heading Accent"><TextInput value={about.headingAccent} onChange={(e) => updateAbout({ ...about, headingAccent: e.target.value })} /></Field>
          <Field label="Description"><TextArea value={about.description} onChange={(e) => updateAbout({ ...about, description: e.target.value })} /></Field>
          <UploadField label="About Image" value={about.image} onChange={(image) => updateAbout({ ...about, image })} />
          <Field label="CTA Text"><TextInput value={about.cta} onChange={(e) => updateAbout({ ...about, cta: e.target.value })} /></Field>

          <Section title="Highlights">
            <ArrayEditor
              items={about.highlights}
              addLabel="Add highlight"
              newItem={() => ''}
              onChange={(highlights) => updateAbout({ ...about, highlights })}
              renderItem={(h, set) => <TextInput value={h} onChange={(e) => set(e.target.value)} />}
            />
          </Section>

          <Section title="Stats">
            <ArrayEditor
              items={about.stats}
              addLabel="Add stat"
              newItem={() => ({ value: '', label: '' })}
              onChange={(stats) => updateAbout({ ...about, stats })}
              renderItem={(stat, set) => (
                <>
                  <Field label="Value"><TextInput value={stat.value} onChange={(e) => set({ ...stat, value: e.target.value })} /></Field>
                  <Field label="Label"><TextInput value={stat.label} onChange={(e) => set({ ...stat, label: e.target.value })} /></Field>
                </>
              )}
            />
          </Section>
        </>
      )}

      {openKey === 'services' && services && (
        <>
          <Field label="Eyebrow"><TextInput value={services.eyebrow} onChange={(e) => updateServices({ ...services, eyebrow: e.target.value })} /></Field>
          <Field label="Heading"><TextInput value={services.heading} onChange={(e) => updateServices({ ...services, heading: e.target.value })} /></Field>
          <Field label="Heading Accent"><TextInput value={services.headingAccent} onChange={(e) => updateServices({ ...services, headingAccent: e.target.value })} /></Field>

          <Section title="Services">
            <ArrayEditor
              items={services.items}
              addLabel="Add service"
              newItem={() => ({ title: 'New Service', description: '', icon: 'dumbbell', image: '' })}
              onChange={(items) => updateServices({ ...services, items })}
              renderItem={(item, set) => (
                <>
                  <Field label="Title"><TextInput value={item.title} onChange={(e) => set({ ...item, title: e.target.value })} /></Field>
                  <Field label="Description"><TextArea value={item.description} onChange={(e) => set({ ...item, description: e.target.value })} /></Field>
                  <Field label="Icon">
                    <select className={inputCls} value={item.icon} onChange={(e) => set({ ...item, icon: e.target.value })}>
                      {['dumbbell', 'barbell', 'heartbeat', 'flame', 'leaf', 'apple'].map((ic) => (
                        <option key={ic} value={ic}>{ic}</option>
                      ))}
                    </select>
                  </Field>
                  <UploadField label="Service Image" value={item.image} onChange={(image) => set({ ...item, image })} />
                </>
              )}
            />
          </Section>
        </>
      )}

      {openKey === 'membership' && membership && (
        <>
          <Field label="Eyebrow"><TextInput value={membership.eyebrow} onChange={(e) => updateMembership({ ...membership, eyebrow: e.target.value })} /></Field>
          <Field label="Heading"><TextInput value={membership.heading} onChange={(e) => updateMembership({ ...membership, heading: e.target.value })} /></Field>
          <Field label="Heading Accent"><TextInput value={membership.headingAccent} onChange={(e) => updateMembership({ ...membership, headingAccent: e.target.value })} /></Field>
          <Field label="Heading Suffix"><TextInput value={membership.headingSuffix} onChange={(e) => updateMembership({ ...membership, headingSuffix: e.target.value })} /></Field>

          <Section title="Plans">
            <ArrayEditor
              items={membership.plans}
              addLabel="Add plan"
              newItem={() => ({ name: 'New Plan', price: '₹0', duration: '/ month', recommended: false, shortDescription: '', features: [], cta: 'Join Now' })}
              onChange={(plans) => updateMembership({ ...membership, plans })}
              renderItem={(plan, set) => (
                <>
                  <Field label="Name"><TextInput value={plan.name} onChange={(e) => set({ ...plan, name: e.target.value })} /></Field>
                  <Field label="Price (with currency)"><TextInput value={plan.price} onChange={(e) => set({ ...plan, price: e.target.value })} /></Field>
                  <Field label="Duration Label"><TextInput value={plan.duration} onChange={(e) => set({ ...plan, duration: e.target.value })} /></Field>
                  <Field label="Short Description"><TextArea value={plan.shortDescription} onChange={(e) => set({ ...plan, shortDescription: e.target.value })} /></Field>
                  <label className="flex items-center gap-2 text-xs text-ink-secondary">
                    <input type="checkbox" className="accent-accent" checked={!!plan.recommended} onChange={(e) => set({ ...plan, recommended: e.target.checked })} />
                    Highlight as recommended
                  </label>
                  <Field label="Features (one per line)">
                    <TextArea
                      rows={4}
                      value={(plan.features || []).join('\n')}
                      onChange={(e) => set({ ...plan, features: e.target.value.split('\n').filter(Boolean) })}
                    />
                  </Field>
                  <Field label="Button Text"><TextInput value={plan.cta} onChange={(e) => set({ ...plan, cta: e.target.value })} /></Field>
                </>
              )}
            />
          </Section>
        </>
      )}

      {openKey === 'howItWorks' && howItWorks && (
        <>
          <Field label="Eyebrow"><TextInput value={howItWorks.eyebrow} onChange={(e) => updateHowItWorks({ ...howItWorks, eyebrow: e.target.value })} /></Field>
          <Field label="Heading"><TextInput value={howItWorks.heading} onChange={(e) => updateHowItWorks({ ...howItWorks, heading: e.target.value })} /></Field>
          <Field label="Heading Accent"><TextInput value={howItWorks.headingAccent} onChange={(e) => updateHowItWorks({ ...howItWorks, headingAccent: e.target.value })} /></Field>

          <Section title="Steps">
            <ArrayEditor
              items={howItWorks.steps}
              addLabel="Add step"
              newItem={() => ({ number: String(howItWorks.steps.length + 1).padStart(2, '0'), title: '', description: '' })}
              onChange={(steps) => updateHowItWorks({ ...howItWorks, steps })}
              renderItem={(step, set) => (
                <>
                  <Field label="Number"><TextInput value={step.number} onChange={(e) => set({ ...step, number: e.target.value })} /></Field>
                  <Field label="Title"><TextInput value={step.title} onChange={(e) => set({ ...step, title: e.target.value })} /></Field>
                  <Field label="Description"><TextArea value={step.description} onChange={(e) => set({ ...step, description: e.target.value })} /></Field>
                </>
              )}
            />
          </Section>
        </>
      )}

      {openKey === 'testimonials' && testimonials && (
        <>
          <Field label="Eyebrow"><TextInput value={testimonials.eyebrow} onChange={(e) => updateTestimonials({ ...testimonials, eyebrow: e.target.value })} /></Field>
          <Field label="Heading"><TextInput value={testimonials.heading} onChange={(e) => updateTestimonials({ ...testimonials, heading: e.target.value })} /></Field>
          <Field label="Heading Accent"><TextInput value={testimonials.headingAccent} onChange={(e) => updateTestimonials({ ...testimonials, headingAccent: e.target.value })} /></Field>
          <Section title="Testimonials">
            <ArrayEditor items={testimonials.items} onChange={(items) => updateTestimonials({ ...testimonials, items })} renderItem={(item, set) => (
              <>
                <Field label="Name"><TextInput value={item.name} onChange={(e) => set({ ...item, name: e.target.value })} /></Field>
                <Field label="Role"><TextInput value={item.role} onChange={(e) => set({ ...item, role: e.target.value })} /></Field>
                <Field label="Quote"><TextArea value={item.quote} onChange={(e) => set({ ...item, quote: e.target.value })} /></Field>
                <Field label="Rating"><TextInput type="number" value={item.rating} onChange={(e) => set({ ...item, rating: Number(e.target.value) })} /></Field>
                <UploadField label="Avatar Image" value={item.avatar} onChange={(avatar) => set({ ...item, avatar })} />
              </>
            )} />
          </Section>
        </>
      )}

      {openKey === 'contact' && contactForm && footer && (
        <>
          <Field label="Eyebrow"><TextInput value={contactForm.eyebrow} onChange={(e) => updateContactForm({ ...contactForm, eyebrow: e.target.value })} /></Field>
          <Field label="Heading Main"><TextInput value={contactForm.headingMain} onChange={(e) => updateContactForm({ ...contactForm, headingMain: e.target.value })} /></Field>
          <Field label="Heading Accent"><TextInput value={contactForm.headingAccent} onChange={(e) => updateContactForm({ ...contactForm, headingAccent: e.target.value })} /></Field>
          <Field label="Description"><TextArea value={contactForm.description} onChange={(e) => updateContactForm({ ...contactForm, description: e.target.value })} /></Field>
          <UploadField label="Contact Image" value={footer.contact.image} onChange={(image) => updateContactFooter({ ...footer, contact: { ...footer.contact, image } })} />
          <Field label="Submit Button Text"><TextInput value={contactForm.submitButtonText} onChange={(e) => updateContactForm({ ...contactForm, submitButtonText: e.target.value })} /></Field>
          <Field label="Success Title"><TextInput value={contactForm.successTitle} onChange={(e) => updateContactForm({ ...contactForm, successTitle: e.target.value })} /></Field>
          <Field label="Success Message"><TextArea value={contactForm.successMessage} onChange={(e) => updateContactForm({ ...contactForm, successMessage: e.target.value })} /></Field>
        </>
      )}

      {openKey === 'inquiry' && inquiry && (
        <>
          <Field label="Eyebrow"><TextInput value={inquiry.eyebrow} onChange={(e) => updateInquiry({ ...inquiry, eyebrow: e.target.value })} /></Field>
          <Field label="Heading Main"><TextInput value={inquiry.headingMain} onChange={(e) => updateInquiry({ ...inquiry, headingMain: e.target.value })} /></Field>
          <Field label="Heading Accent"><TextInput value={inquiry.headingAccent} onChange={(e) => updateInquiry({ ...inquiry, headingAccent: e.target.value })} /></Field>
          <Field label="Description"><TextArea value={inquiry.description} onChange={(e) => updateInquiry({ ...inquiry, description: e.target.value })} /></Field>
          <Field label="Back Link Text"><TextInput value={inquiry.backLinkText} onChange={(e) => updateInquiry({ ...inquiry, backLinkText: e.target.value })} /></Field>
          <Field label="Submit Button Text"><TextInput value={inquiry.submitButtonText} onChange={(e) => updateInquiry({ ...inquiry, submitButtonText: e.target.value })} /></Field>
          <Field label="Success Title"><TextInput value={inquiry.successTitle} onChange={(e) => updateInquiry({ ...inquiry, successTitle: e.target.value })} /></Field>
          <Field label="Success Message"><TextArea value={inquiry.successMessage} onChange={(e) => updateInquiry({ ...inquiry, successMessage: e.target.value })} /></Field>
          <Section title="Benefits">
            <ArrayEditor items={inquiry.benefits} onChange={(benefits) => updateInquiry({ ...inquiry, benefits })} renderItem={(benefit, set) => <TextInput value={benefit} onChange={(e) => set(e.target.value)} />} />
          </Section>
          <Section title="Stats">
            <ArrayEditor
              items={inquiry.stats}
              onChange={(stats) => updateInquiry({ ...inquiry, stats })}
              renderItem={(stat, set) => (
                <>
                  <Field label="Value"><TextInput value={stat.value} onChange={(e) => set({ ...stat, value: e.target.value })} /></Field>
                  <Field label="Label"><TextInput value={stat.label} onChange={(e) => set({ ...stat, label: e.target.value })} /></Field>
                </>
              )}
            />
          </Section>
        </>
      )}

      {openKey === 'footer' && footer && (
        <>
          <Field label="Logo Text"><TextInput value={footer.logo} onChange={(e) => updateFooter({ ...footer, logo: e.target.value })} /></Field>
          <Field label="Logo Accent"><TextInput value={footer.logoAccent} onChange={(e) => updateFooter({ ...footer, logoAccent: e.target.value })} /></Field>
          <Field label="Description"><TextArea value={footer.description} onChange={(e) => updateFooter({ ...footer, description: e.target.value })} /></Field>

          <Section title="Contact">
            <Field label="Address"><TextInput value={footer.contact.address} onChange={(e) => updateFooter({ ...footer, contact: { ...footer.contact, address: e.target.value } })} /></Field>
            <Field label="Phone"><TextInput value={footer.contact.phone} onChange={(e) => updateFooter({ ...footer, contact: { ...footer.contact, phone: e.target.value } })} /></Field>
            <Field label="Email"><TextInput value={footer.contact.email} onChange={(e) => updateFooter({ ...footer, contact: { ...footer.contact, email: e.target.value } })} /></Field>
          </Section>

          <Section title="Studio Hours">
            <ArrayEditor
              items={footer.hours}
              addLabel="Add hours row"
              newItem={() => ({ label: '', value: '' })}
              onChange={(hours) => updateFooter({ ...footer, hours })}
              renderItem={(h, set) => (
                <>
                  <Field label="Days"><TextInput value={h.label} onChange={(e) => set({ ...h, label: e.target.value })} /></Field>
                  <Field label="Hours"><TextInput value={h.value} onChange={(e) => set({ ...h, value: e.target.value })} /></Field>
                </>
              )}
            />
          </Section>

          <Field label="Copyright Line"><TextInput value={footer.copyright} onChange={(e) => updateFooter({ ...footer, copyright: e.target.value })} /></Field>
        </>
      )}
    </Panel>
  )
}

function Section({ title, children }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-accent mb-3">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  )
}

function panelTitle(key) {
  return {
    hero: 'Customize Hero, Nav & Theme',
    about: 'Customize About',
    services: 'Customize Services',
    membership: 'Customize Membership',
    howItWorks: 'Customize How It Works',
    testimonials: 'Customize Testimonials',
    contact: 'Customize Contact',
    inquiry: 'Customize Inquiry Form',
    footer: 'Customize Footer',
  }[key] || 'Customize'
}
