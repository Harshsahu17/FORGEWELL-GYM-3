import data from '../data/gymData.json'
import { IconMapPin, IconPhone, IconMail, socialIconMap } from './Icons'

export default function Footer() {
  const footer = data.footer

  return (
    <footer className="bg-bg-secondary border-t border-border pt-10 pb-4">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <a href="#home" className="font-display text-2xl tracking-wide text-ink-primary">
              {footer.logo}<span className="text-accent">{footer.logoAccent}</span>
            </a>
            <p className="mt-4 text-sm text-ink-secondary leading-relaxed max-w-xs">{footer.description}</p>
            <div className="mt-6 flex items-center gap-3">
              {footer.social.map((key) => {
                const Icon = socialIconMap[key]
                return (
                  <a
                    key={key}
                    href="#"
                    aria-label={key}
                    className="flex items-center justify-center w-9 h-9 rounded-full border border-border text-ink-secondary transition-all duration-300 hover:border-accent hover:text-accent hover:-translate-y-0.5"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                )
              })}
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm tracking-[0.15em] uppercase text-ink-primary">{footer.quickLinksHeading}</h4>
            <ul className="mt-5 space-y-3">
              {footer.quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-ink-secondary transition-colors duration-300 hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm tracking-[0.15em] uppercase text-ink-primary">{footer.contactHeading}</h4>
            <ul className="mt-5 space-y-4">
              <li className="flex items-start gap-3 text-sm text-ink-secondary">
                <IconMapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent" />
                {footer.contact.address}
              </li>
              <li className="flex items-center gap-3 text-sm text-ink-secondary">
                <IconPhone className="w-4 h-4 flex-shrink-0 text-accent" />
                {footer.contact.phone}
              </li>
              <li className="flex items-center gap-3 text-sm text-ink-secondary">
                <IconMail className="w-4 h-4 flex-shrink-0 text-accent" />
                {footer.contact.email}
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm tracking-[0.15em] uppercase text-ink-primary">{footer.hoursHeading}</h4>
            <ul className="mt-5 space-y-3 text-sm text-ink-secondary">
              {footer.hours.map((h) => (
                <li key={h.label} className="flex justify-between gap-4">
                  <span>{h.label}</span><span>{h.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-ink-secondary">{footer.copyright}</p>
          <div className="flex items-center gap-6 text-xs text-ink-secondary">
            {footer.legalLinks.map((link) => (
              <a key={link.label} href={link.href} className="hover:text-accent transition-colors duration-300">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
