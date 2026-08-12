import { useEffect, useState } from 'react'
import { getSection, saveSection } from '../utils/dataManager'

export default function Customizer() {
  const [open, setOpen] = useState(false)
  const [sectionKey, setSectionKey] = useState(null)
  const [form, setForm] = useState({})

  useEffect(() => {
    const onOpen = (e) => {
      
      const key = e.detail?.key
      if (!key) return
      const section = getSection(key) || {}
      if (key === 'hero') {
        const navbarSection = getSection('navbar') || {}
        const themeSection = getSection('theme') || {}
        setSectionKey('hero')
        setForm({ ...section, navbar: navbarSection, theme: themeSection })
      } else {
        setSectionKey(key)
        setForm(section)
      }
      setOpen(true)
    }
    window.addEventListener('forgewell:open-customizer', onOpen)
    return () => window.removeEventListener('forgewell:open-customizer', onOpen)
  }, [])

  // close on Escape
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') closeCustomizer()
    }
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, sectionKey])

  useEffect(() => {
    if (!open) {
      setSectionKey(null)
      setForm({})
    }
  }, [open])

  useEffect(() => {
    if (open) {
      window.dispatchEvent(new CustomEvent('forgewell:customizer-open'))
    } else {
      window.dispatchEvent(new CustomEvent('forgewell:customizer-close'))
    }
  }, [open])

  if (!open) return null

  function closeCustomizer() {
    restoreSavedPreview(sectionKey)
    setOpen(false)
  }

  function restoreSavedPreview(key) {
    if (!key) return
    try {
      if (key === 'hero') {
        window.dispatchEvent(new CustomEvent('forgewell:section-preview', { detail: { key: 'hero', value: getSection('hero') || {} } }))
        window.dispatchEvent(new CustomEvent('forgewell:section-preview', { detail: { key: 'navbar', value: getSection('navbar') || {} } }))
        window.dispatchEvent(new CustomEvent('forgewell:section-preview', { detail: { key: 'theme', value: getSection('theme') || {} } }))
      } else {
        window.dispatchEvent(new CustomEvent('forgewell:section-preview', { detail: { key, value: getSection(key) || {} } }))
      }
    } catch (e) {}
  }

  function updateField(path, value) {
    setForm((prev) => {
      const copy = path ? JSON.parse(JSON.stringify(prev || {})) : value
      if (path) {
        const parts = path.split('.')
        let cur = copy
        for (let i = 0; i < parts.length - 1; i++) {
          const p = parts[i]
          if (!cur[p]) cur[p] = {}
          cur = cur[p]
        }
        cur[parts[parts.length - 1]] = value
      }
      // emit preview so the UI can update immediately
      try {
        if (sectionKey === 'hero' && path.startsWith('navbar.')) {
          window.dispatchEvent(new CustomEvent('forgewell:section-preview', { detail: { key: 'navbar', value: copy.navbar } }))
        } else if (sectionKey === 'hero' && path.startsWith('theme.')) {
          window.dispatchEvent(new CustomEvent('forgewell:section-preview', { detail: { key: 'theme', value: copy.theme } }))
        } else {
          const previewValue = sectionKey === 'hero' ? (() => {
            const { navbar: _navbar, theme: _theme, ...heroOnly } = copy
            return heroOnly
          })() : copy
          window.dispatchEvent(new CustomEvent('forgewell:section-preview', { detail: { key: sectionKey, value: previewValue } }))
        }
      } catch (e) {}
      return copy
    })
  }

  function handleSave() {
    if (!sectionKey) return
    if (sectionKey === 'hero') {
      const { navbar: navbarForm, theme: themeForm, ...heroForm } = form
      if (navbarForm) saveSection('navbar', navbarForm)
      if (themeForm) saveSection('theme', themeForm)
      saveSection('hero', heroForm)
    } else {
      saveSection(sectionKey, form)
    }
    setOpen(false)
  }

  return (
    <div
      className="fixed right-0 z-[60] w-full sm:w-[480px] bg-bg-card shadow-xl border-l border-border overflow-auto"
      style={{ top: '4.5rem', bottom: 0 }}
    >
      <div className="sticky top-0 bg-bg-card border-b border-border p-6 z-10">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold capitalize">{getSectionTitle(sectionKey)}</h3>
            <p className="mt-1 text-xs text-ink-secondary">Edit content and save changes</p>
          </div>
          <button
            onClick={closeCustomizer}
            className="inline-flex items-center justify-center w-8 h-8 rounded bg-[#222] text-white hover:bg-[#333] transition-colors"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {renderSectionForm(sectionKey, form, updateField)}
      </div>

      <div className="sticky bottom-0 bg-bg-card border-t border-border p-6">
        <button
          onClick={handleSave}
          className="w-full rounded bg-accent px-5 py-3 text-sm font-semibold text-bg-primary hover:bg-accent-hover transition-colors"
        >
          Save Changes
        </button>
      </div>
    </div>
  )
}

function getSectionTitle(key) {
  const titles = {
    hero: 'Hero Section',
    about: 'About Section',
    services: 'Services',
    membership: 'Membership Plans',
    howItWorks: 'How It Works',
    gallery: 'Gallery',
    footer: 'Footer',
    navbar: 'Navigation'
  }
  return titles[key] || key
}

function renderSectionForm(sectionKey, form, updateField) {
  switch (sectionKey) {
    case 'hero':
      return renderHeroForm(form, updateField)
    case 'about':
      return renderAboutForm(form, updateField)
    case 'services':
      return renderServicesForm(form, updateField)
    case 'membership':
      return renderMembershipForm(form, updateField)
    case 'howItWorks':
      return renderHowItWorksForm(form, updateField)
    case 'gallery':
      return renderGalleryForm(form, updateField)
    case 'footer':
      return renderFooterForm(form, updateField)
    default:
      return renderForm(form, updateField, '', sectionKey)
  }
}

function renderHeroForm(form, updateField) {
  return (
    <>
      <FormSection title="Theme Colors">
        <ColorInput label="Accent Color" value={form.theme?.accentColor || '#FFD400'} onChange={(v) => updateField('theme.accentColor', v)} />
        <ColorInput label="Accent Hover" value={form.theme?.accentHover || '#E5BE00'} onChange={(v) => updateField('theme.accentHover', v)} />
        <ColorInput label="Shadow Color" value={form.theme?.shadowColor || '#FFD400'} onChange={(v) => updateField('theme.shadowColor', v)} />
        <ColorInput label="Background Primary" value={form.theme?.bgPrimary || '#050505'} onChange={(v) => updateField('theme.bgPrimary', v)} />
        <ColorInput label="Background Secondary" value={form.theme?.bgSecondary || '#0D0D0D'} onChange={(v) => updateField('theme.bgSecondary', v)} />
        <ColorInput label="Card Background" value={form.theme?.bgCard || '#151515'} onChange={(v) => updateField('theme.bgCard', v)} />
        <ColorInput label="Text Primary" value={form.theme?.textPrimary || '#FFFFFF'} onChange={(v) => updateField('theme.textPrimary', v)} />
        <ColorInput label="Text Secondary" value={form.theme?.textSecondary || '#A3A3A3'} onChange={(v) => updateField('theme.textSecondary', v)} />
        <ColorInput label="Border Color" value={form.theme?.border || '#242424'} onChange={(v) => updateField('theme.border', v)} />
      </FormSection>

      <FormSection title="Navbar">
        <TextInput label="Logo Text" value={form.navbar?.logo || ''} onChange={(v) => updateField('navbar.logo', v)} />
        <TextInput label="Logo Accent" value={form.navbar?.logoAccent || ''} onChange={(v) => updateField('navbar.logoAccent', v)} />
        <ImageInput label="Logo Image" value={form.navbar?.logoImage || ''} path="navbar.logoImage" updateField={updateField} />
        <TextInput label="CTA Button" value={form.navbar?.cta || ''} onChange={(v) => updateField('navbar.cta', v)} />
      </FormSection>

      <FormSection title="Hero Content">
        <TextInput label="Eyebrow" value={form.eyebrow || ''} onChange={(v) => updateField('eyebrow', v)} />
        <TextInput label="Headline Top" value={form.headlineTop || ''} onChange={(v) => updateField('headlineTop', v)} />
        <TextInput label="Headline Bottom" value={form.headlineBottom || ''} onChange={(v) => updateField('headlineBottom', v)} />
        <TextAreaInput label="Description" value={form.description || ''} onChange={(v) => updateField('description', v)} />
        <TextInput label="Primary CTA" value={form.primaryCta || ''} onChange={(v) => updateField('primaryCta', v)} />
        <TextInput label="Secondary CTA" value={form.secondaryCta || ''} onChange={(v) => updateField('secondaryCta', v)} />
        <ImageInput label="Background Image" value={form.backgroundImage || ''} path="backgroundImage" updateField={updateField} />
      </FormSection>

      <FormSection title="Stats">
        {form.stats?.map((stat, i) => (
          <div key={i} className="p-4 bg-bg-secondary rounded border border-border space-y-3">
            <span className="text-xs font-semibold text-ink-primary">Stat {i + 1}</span>
            <TextInput label="Value" value={stat.value || ''} onChange={(v) => updateField(`stats.${i}.value`, v)} />
            <TextInput label="Label" value={stat.label || ''} onChange={(v) => updateField(`stats.${i}.label`, v)} />
          </div>
        ))}
      </FormSection>
    </>
  )
}

function renderAboutForm(form, updateField) {
  return (
    <>
      <FormSection title="Content">
        <TextInput label="Eyebrow" value={form.eyebrow || ''} onChange={(v) => updateField('eyebrow', v)} />
        <TextInput label="Heading" value={form.heading || ''} onChange={(v) => updateField('heading', v)} />
        <TextAreaInput label="Description" value={form.description || ''} onChange={(v) => updateField('description', v)} />
        <ImageInput label="Section Image" value={form.image || ''} path="image" updateField={updateField} />
        <TextInput label="CTA Button" value={form.cta || ''} onChange={(v) => updateField('cta', v)} />
      </FormSection>

      <FormSection title="Stats">
        {form.stats?.map((stat, i) => (
          <div key={i} className="p-4 bg-bg-secondary rounded border border-border space-y-3">
            <span className="text-xs font-semibold text-ink-primary">Stat {i + 1}</span>
            <TextInput label="Value" value={stat.value || ''} onChange={(v) => updateField(`stats.${i}.value`, v)} />
            <TextInput label="Label" value={stat.label || ''} onChange={(v) => updateField(`stats.${i}.label`, v)} />
          </div>
        ))}
      </FormSection>
    </>
  )
}

function renderServicesForm(form, updateField) {
  return (
    <>
      <FormSection title="Section Header">
        <TextInput label="Eyebrow" value={form.eyebrow || ''} onChange={(v) => updateField('eyebrow', v)} />
        <TextInput label="Heading" value={form.heading || ''} onChange={(v) => updateField('heading', v)} />
        <TextAreaInput label="Description" value={form.description || ''} onChange={(v) => updateField('description', v)} />
      </FormSection>

      <FormSection title="Service Items">
        {form.items?.map((service, i) => (
          <div key={i} className="p-4 bg-bg-secondary rounded border border-border space-y-3">
            <span className="text-xs font-semibold text-ink-primary">Service {i + 1}</span>
            <TextInput label="Title" value={service.title || ''} onChange={(v) => updateField(`items.${i}.title`, v)} />
            <TextAreaInput label="Description" value={service.description || ''} onChange={(v) => updateField(`items.${i}.description`, v)} rows={3} />
            <SelectInput
              label="Icon"
              value={service.icon || 'dumbbell'}
              options={['dumbbell', 'barbell', 'heartbeat', 'flame', 'leaf', 'apple']}
              onChange={(v) => updateField(`items.${i}.icon`, v)}
            />
          </div>
        ))}
      </FormSection>
    </>
  )
}

function renderMembershipForm(form, updateField) {
  return (
    <>
      <FormSection title="Section Header">
        <TextInput label="Eyebrow" value={form.eyebrow || ''} onChange={(v) => updateField('eyebrow', v)} />
        <TextInput label="Heading" value={form.heading || ''} onChange={(v) => updateField('heading', v)} />
        <TextAreaInput label="Description" value={form.description || ''} onChange={(v) => updateField('description', v)} />
      </FormSection>

      <FormSection title="Membership Plans">
        {form.plans?.map((plan, i) => (
          <div key={i} className="p-4 bg-bg-secondary rounded border border-border space-y-3">
            <span className="text-xs font-semibold text-ink-primary">{plan.name || `Plan ${i + 1}`}</span>
            <TextInput label="Plan Name" value={plan.name || ''} onChange={(v) => updateField(`plans.${i}.name`, v)} />
            <TextInput label="Price" value={plan.price || ''} onChange={(v) => updateField(`plans.${i}.price`, v)} placeholder="₹1,499" />
            <TextInput label="Duration" value={plan.duration || ''} onChange={(v) => updateField(`plans.${i}.duration`, v)} placeholder="/ month" />
            <CheckboxInput
              label="Recommended Plan"
              checked={plan.recommended || false}
              onChange={(v) => updateField(`plans.${i}.recommended`, v)}
            />
            <TextInput label="CTA Button" value={plan.cta || ''} onChange={(v) => updateField(`plans.${i}.cta`, v)} />

            <div className="space-y-2">
              <label className="block text-xs font-medium text-ink-secondary">Features</label>
              {plan.features?.map((feature, j) => (
                <div key={j}>
                  <input
                    value={feature}
                    onChange={(e) => {
                      const newFeatures = [...plan.features]
                      newFeatures[j] = e.target.value
                      updateField(`plans.${i}.features`, newFeatures)
                    }}
                    className="w-full bg-[#0b0b0b] border border-border px-3 py-1.5 rounded text-sm text-ink-primary"
                    placeholder="Feature description"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </FormSection>
    </>
  )
}

function renderHowItWorksForm(form, updateField) {
  return (
    <>
      <FormSection title="Section Header">
        <TextInput label="Eyebrow" value={form.eyebrow || ''} onChange={(v) => updateField('eyebrow', v)} />
        <TextInput label="Heading" value={form.heading || ''} onChange={(v) => updateField('heading', v)} />
      </FormSection>

      <FormSection title="Steps">
        {form.steps?.map((step, i) => (
          <div key={i} className="p-4 bg-bg-secondary rounded border border-border space-y-3">
            <span className="text-xs font-semibold text-ink-primary">Step {i + 1}</span>
            <TextInput label="Number" value={step.number || ''} onChange={(v) => updateField(`steps.${i}.number`, v)} placeholder="01" />
            <TextInput label="Title" value={step.title || ''} onChange={(v) => updateField(`steps.${i}.title`, v)} />
            <TextAreaInput label="Description" value={step.description || ''} onChange={(v) => updateField(`steps.${i}.description`, v)} rows={3} />
          </div>
        ))}
      </FormSection>
    </>
  )
}

function renderGalleryForm(form, updateField) {
  return (
    <FormSection title="Gallery Images">
      {form.map((src, i) => (
        <div key={i} className="p-4 bg-bg-secondary rounded border border-border space-y-3">
          <span className="text-xs font-semibold text-ink-primary">Image {i + 1}</span>
          <ImageInput label="" value={src} path={String(i)} updateField={updateField} showLabel={false} />
        </div>
      ))}
    </FormSection>
  )
}

function renderFooterForm(form, updateField) {
  return (
    <>
      <FormSection title="Branding">
        <TextInput label="Logo Text" value={form.logo || ''} onChange={(v) => updateField('logo', v)} />
        <TextInput label="Logo Accent" value={form.logoAccent || ''} onChange={(v) => updateField('logoAccent', v)} />
        <TextAreaInput label="Description" value={form.description || ''} onChange={(v) => updateField('description', v)} rows={3} />
      </FormSection>

      <FormSection title="Contact Information">
        <TextInput label="Address" value={form.contact?.address || ''} onChange={(v) => updateField('contact.address', v)} />
        <TextInput label="Phone" value={form.contact?.phone || ''} onChange={(v) => updateField('contact.phone', v)} />
        <TextInput label="Email" value={form.contact?.email || ''} onChange={(v) => updateField('contact.email', v)} />
      </FormSection>

      <FormSection title="Quick Links">
        {form.quickLinks?.map((link, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              value={link.label}
              onChange={(e) => updateField(`quickLinks.${i}.label`, e.target.value)}
              className="flex-1 bg-[#0b0b0b] border border-border px-3 py-2 rounded text-sm text-ink-primary"
              placeholder="Label"
            />
            <input
              value={link.href}
              onChange={(e) => updateField(`quickLinks.${i}.href`, e.target.value)}
              className="flex-1 bg-[#0b0b0b] border border-border px-3 py-2 rounded text-sm text-ink-primary"
              placeholder="Link"
            />
          </div>
        ))}
      </FormSection>

      <FormSection title="Social Media">
        <div className="space-y-2">
          {['instagram', 'facebook', 'twitter', 'youtube', 'linkedin'].map((platform) => (
            <CheckboxInput
              key={platform}
              label={platform.charAt(0).toUpperCase() + platform.slice(1)}
              checked={form.social?.includes(platform) || false}
              onChange={(checked) => {
                const current = form.social || []
                updateField('social', checked ? [...current, platform] : current.filter((p) => p !== platform))
              }}
            />
          ))}
        </div>
      </FormSection>

      <FormSection title="Copyright">
        <TextInput label="Copyright Text" value={form.copyright || ''} onChange={(v) => updateField('copyright', v)} />
      </FormSection>
    </>
  )
}

function FormSection({ title, children }) {
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-semibold text-ink-primary border-b border-border pb-2">{title}</h4>
      <div className="space-y-3">{children}</div>
    </div>
  )
}

function TextInput({ label, value, onChange, placeholder }) {
  return (
    <div>
      {label && <label className="block text-xs font-medium text-ink-secondary mb-1.5">{label}</label>}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#0b0b0b] border border-border px-3 py-2 rounded text-sm text-ink-primary focus:border-accent focus:outline-none transition-colors"
      />
    </div>
  )
}

function ColorInput({ label, value, onChange }) {
  return (
    <div>
      {label && <label className="block text-xs font-medium text-ink-secondary mb-1.5">{label}</label>}
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-10 h-10 rounded border border-border bg-[#0b0b0b] cursor-pointer p-0"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-[#0b0b0b] border border-border px-3 py-2 rounded text-sm text-ink-primary focus:border-accent focus:outline-none transition-colors"
        />
      </div>
    </div>
  )
}

function TextAreaInput({ label, value, onChange, rows = 4, placeholder }) {
  return (
    <div>
      {label && <label className="block text-xs font-medium text-ink-secondary mb-1.5">{label}</label>}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="w-full bg-[#0b0b0b] border border-border px-3 py-2 rounded text-sm text-ink-primary focus:border-accent focus:outline-none transition-colors resize-none"
      />
    </div>
  )
}

function SelectInput({ label, value, options, onChange }) {
  return (
    <div>
      {label && <label className="block text-xs font-medium text-ink-secondary mb-1.5">{label}</label>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#0b0b0b] border border-border px-3 py-2 rounded text-sm text-ink-primary focus:border-accent focus:outline-none transition-colors"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  )
}

function CheckboxInput({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 rounded border-border bg-[#0b0b0b] text-accent focus:ring-accent focus:ring-offset-0"
      />
      <span className="text-sm text-ink-primary">{label}</span>
    </label>
  )
}

function ImageInput({ label, value, path, updateField, showLabel = true }) {
  const isUploadedImage = value.startsWith('data:image/')

  return (
    <div className="space-y-2">
      {showLabel && label && <label className="block text-xs font-medium text-ink-secondary">{label}</label>}

      <div className="aspect-video overflow-hidden rounded border border-border bg-[#0b0b0b]">
        {value ? (
          <img src={value} alt={`${label} preview`} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-ink-secondary">No image selected</div>
        )}
      </div>

      <input
        value={isUploadedImage ? '' : value}
        placeholder={isUploadedImage ? 'Uploaded image saved in browser' : 'Image URL or path'}
        onChange={(e) => updateField(path, e.target.value)}
        className="w-full rounded border border-border bg-[#0b0b0b] px-3 py-2 text-sm text-ink-primary placeholder:text-ink-secondary focus:border-accent focus:outline-none transition-colors"
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (!file) return
          uploadImageFile(file, path, updateField)
          e.target.value = ''
        }}
        className="w-full rounded border border-border bg-[#0b0b0b] px-3 py-2 text-xs text-ink-secondary file:mr-3 file:rounded file:border-0 file:bg-accent file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-bg-primary file:cursor-pointer hover:file:bg-accent-hover"
      />
    </div>
  )
}

function renderForm(obj, updateField, prefix = '', sectionLabel = '') {
  if (!obj || typeof obj !== 'object') return null

  if (Array.isArray(obj) && isImageArray(obj, prefix)) {
    return renderImageArray(obj, updateField, prefix, sectionLabel)
  }

  return Object.keys(obj).map((key) => {
    const val = obj[key]
    const path = prefix ? `${prefix}.${key}` : key
    if (typeof val === 'string') {
      if (isImageField(path, val)) {
        return renderImageField(path, val, updateField, getImageLabel(path, sectionLabel))
      }

      return (
        <div key={path} className="">
          <label className="block text-xs text-ink-secondary mb-1">{path}</label>
          <input
            value={val}
            onChange={(e) => updateField(path, e.target.value)}
            className="w-full bg-[#0b0b0b] border border-border px-3 py-2 rounded text-ink-primary"
          />
        </div>
      )
    }
    if (typeof val === 'object' && Array.isArray(val)) {
      if (isImageArray(val, path)) {
        return renderImageArray(val, updateField, path, sectionLabel)
      }

      return (
        <div key={path} className="">
          <label className="block text-xs text-ink-secondary mb-1">{path} (array)</label>
          <textarea
            value={JSON.stringify(val, null, 2)}
            onChange={(e) => {
              try {
                const parsed = JSON.parse(e.target.value)
                updateField(path, parsed)
              } catch (err) {
                // ignore parse error
              }
            }}
            rows={4}
            className="w-full bg-[#0b0b0b] border border-border px-3 py-2 rounded text-ink-primary font-mono text-xs"
          />
        </div>
      )
    }
    return (
      <div key={path} className="">
        <label className="block text-xs text-ink-secondary mb-1">{path}</label>
        <div className="pl-2">{renderForm(val, updateField, path, sectionLabel)}</div>
      </div>
    )
  })
}

function isImageArray(value, path) {
  return Array.isArray(value) && value.length > 0 && value.every((item, index) => (
    typeof item === 'string' && isImageField(path ? `${path}.${index}` : `${index}`, item)
  ))
}

function isImageField(path, value) {
  if (typeof value !== 'string') return false
  const fieldName = path.split('.').pop()?.toLowerCase() || ''
  return (
    fieldName === 'image' ||
    fieldName.endsWith('image') ||
    value.startsWith('/images/') ||
    value.startsWith('data:image/') ||
    /\.(avif|gif|jpe?g|png|svg|webp)(\?.*)?$/i.test(value)
  )
}

function getImageLabel(path, sectionLabel) {
  const parts = path.split('.').filter(Boolean)
  const last = parts[parts.length - 1]
  if (/^\d+$/.test(last)) {
    const parent = parts.slice(0, -1).join('.') || sectionLabel || 'image'
    return `${parent} ${Number(last) + 1}`
  }
  return path || sectionLabel || 'image'
}

function renderImageArray(images, updateField, prefix, sectionLabel) {
  const label = prefix || sectionLabel || 'images'

  return (
    <div key={prefix || sectionLabel || 'image-list'} className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <label className="block text-xs text-ink-secondary">{label} images</label>
        <button
          type="button"
          onClick={() => updateField(prefix, [...images, ''])}
          className="rounded bg-[#222] px-3 py-1 text-xs text-white hover:bg-[#333] transition-colors"
        >
          Add Image
        </button>
      </div>

      {images.map((src, index) => {
        const path = prefix ? `${prefix}.${index}` : `${index}`
        return (
          <div key={path} className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs text-ink-secondary">{getImageLabel(path, sectionLabel)}</span>
              {images.length > 1 && (
                <button
                  type="button"
                  onClick={() => updateField(prefix, images.filter((_, itemIndex) => itemIndex !== index))}
                  className="rounded bg-[#222] px-3 py-1 text-xs text-white hover:bg-[#333] transition-colors"
                >
                  Remove
                </button>
              )}
            </div>
            {renderImageField(path, src, updateField, getImageLabel(path, sectionLabel), false)}
          </div>
        )
      })}
    </div>
  )
}

function renderImageField(path, value, updateField, label, showLabel = true) {
  const isUploadedImage = value.startsWith('data:image/')

  return (
    <div key={path} className="space-y-2">
      {showLabel && <label className="block text-xs text-ink-secondary">{label}</label>}

      <div className="aspect-video overflow-hidden rounded border border-border bg-[#0b0b0b]">
        {value ? (
          <img src={value} alt={`${label} preview`} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-ink-secondary">No image selected</div>
        )}
      </div>

      <input
        value={isUploadedImage ? '' : value}
        placeholder={isUploadedImage ? 'Uploaded image saved in browser' : 'Image URL or path'}
        onChange={(e) => updateField(path, e.target.value)}
        className="w-full rounded border border-border bg-[#0b0b0b] px-3 py-2 text-sm text-ink-primary placeholder:text-ink-secondary focus:border-accent focus:outline-none transition-colors"
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (!file) return
          uploadImageFile(file, path, updateField)
          e.target.value = ''
        }}
        className="w-full rounded border border-border bg-[#0b0b0b] px-3 py-2 text-xs text-ink-secondary file:mr-3 file:rounded file:border-0 file:bg-accent file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-bg-primary file:cursor-pointer hover:file:bg-accent-hover"
      />
    </div>
  )
}

function uploadImageFile(file, path, updateField) {
  if (!file.type.startsWith('image/')) return

  if (file.type === 'image/svg+xml' || file.type === 'image/gif') {
    readFileAsDataUrl(file, (dataUrl) => updateField(path, dataUrl))
    return
  }

  const image = new Image()
  const objectUrl = URL.createObjectURL(file)

  image.onload = () => {
    const maxSize = path.toLowerCase().includes('logo') ? 512 : 1600
    const scale = Math.min(1, maxSize / Math.max(image.width, image.height))
    const width = Math.max(1, Math.round(image.width * scale))
    const height = Math.max(1, Math.round(image.height * scale))
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    canvas.getContext('2d').drawImage(image, 0, 0, width, height)

    const mimeType = file.type === 'image/png' ? 'image/png' : 'image/jpeg'
    updateField(path, canvas.toDataURL(mimeType, 0.86))
    URL.revokeObjectURL(objectUrl)
  }

  image.onerror = () => {
    URL.revokeObjectURL(objectUrl)
    readFileAsDataUrl(file, (dataUrl) => updateField(path, dataUrl))
  }

  image.src = objectUrl
}

function readFileAsDataUrl(file, onLoad) {
  const reader = new FileReader()
  reader.onload = () => {
    if (typeof reader.result === 'string') onLoad(reader.result)
  }
  reader.readAsDataURL(file)
}
