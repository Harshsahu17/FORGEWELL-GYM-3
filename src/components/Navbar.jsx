import { useEffect, useState } from 'react'
import data from '../data/gymData.json'
import useManagedSection from '../utils/useManagedSection'
import { IconMenu, IconClose } from './Icons'

export default function Navbar() {
  const navbar = useManagedSection('navbar', data.navbar)
  const [open, setOpen] = useState(false)

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const handleLinkClick = () => setOpen(false)

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#0d0d0d] border-b border-border shadow-[0_14px_34px_-26px_rgba(255,90,0,0.75)] py-4">
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        <a
          href="#home"
          className="flex items-center gap-3 text-white select-none"
          aria-label={`${navbar.logo}${navbar.logoAccent} home`}
        >
          <img
            src={navbar.logoImage || '/images/forgewell-logo.png'}
            alt="Forgewell logo"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded object-cover"
          />
          <span className="font-display text-2xl tracking-wide leading-none">
            {navbar.logo}<span className="text-accent">{navbar.logoAccent}</span>
          </span>
        </a>

        <ul className="hidden lg:flex items-center gap-9">
          {navbar.links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="relative text-sm font-medium text-ink-secondary"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#gallery"
              className="relative text-sm font-medium text-ink-secondary"
            >
              Gallery
            </a>
          </li>
        </ul>

        <div className="hidden lg:block">
          <a
            href="#membership"
            className="inline-flex items-center rounded-sm bg-accent px-6 py-2.5 text-sm font-semibold text-bg-primary"
          >
            {navbar.cta}
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden text-white p-2 -mr-2"
        >
          {open ? <IconClose /> : <IconMenu />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`lg:hidden absolute inset-x-0 top-full overflow-hidden ${
          open ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-[#0b0b0b] border-t border-[#252525] shadow-[0_18px_40px_-28px_rgba(0,0,0,0.9)] px-5 py-6 flex flex-col gap-1">
          {navbar.links.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={handleLinkClick}
              style={{ transitionDelay: open ? `${i * 40}ms` : '0ms' }}
              className={`py-3 text-base font-semibold text-ink-secondary border-b border-border last:border-b-0 ${
                open ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#gallery"
            onClick={handleLinkClick}
            className={`py-3 text-base font-semibold text-ink-secondary border-b border-border last:border-b-0 ${
              open ? 'opacity-100' : 'opacity-0'
            }`}
          >
            Gallery
          </a>
          <a
            href="#membership"
            onClick={handleLinkClick}
            className="mt-4 text-center rounded-sm bg-accent px-6 py-3 text-sm font-semibold text-bg-primary transition-colors duration-300 hover:bg-accent-hover"
          >
            {navbar.cta}
          </a>
        </div>
      </div>
    </header>
  )
}
