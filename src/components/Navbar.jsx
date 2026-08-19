import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import defaultData from '../data/gymData.json'
import useManagedSection from '../hooks/useManagedSection'
import { IconMenu, IconClose } from './Icons'

export default function Navbar() {
  const navbar = useManagedSection('navbar', defaultData.navbar)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const handleLinkClick = () => setOpen(false)

  const resolveLink = (href) => (location.pathname === '/' ? href : `/${href}`)

  function handleLogoClick(e) {
    if (location.pathname === '/') {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
      if (location.hash) {
        navigate('/', { replace: true })
      }
    } else {
      navigate('/')
    }
  }

  return (
    <header
      className="fixed top-10 inset-x-0 z-50 bg-[#0d0d0d] border-b border-border py-4"
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between gap-4 flex-wrap lg:flex-nowrap">
        {/* Logo — edited from the Hero customizer panel */}
        <Link
          to="/"
          onClick={handleLogoClick}
          className="flex items-center gap-3 text-white select-none min-w-0 flex-shrink-0"
          aria-label={`${navbar.logo}${navbar.logoAccent} home`}
        >
          <img
            src={navbar.logoImage || '/images/forgewell-logo.png'}
            alt="Forgewell logo"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded object-cover flex-shrink-0"
          />
          <span className="font-display text-2xl tracking-wide leading-none truncate max-w-[40vw] sm:max-w-none">
            {navbar.logo}<span className="text-accent">{navbar.logoAccent}</span>
          </span>
        </Link>

        {/* Desktop nav links — wraps to a second line instead of overflowing
            or pushing the CTA off-screen if the list grows */}
        <ul className="hidden lg:flex flex-1 items-center justify-center flex-wrap gap-x-6 gap-y-2 min-w-0">
          {navbar.links.map((link) => (
            <li key={link.label} className="flex-shrink-0">
              <a
                href={resolveLink(link.href)}
                className="relative text-sm font-medium text-ink-secondary transition-colors duration-200 hover:text-white whitespace-nowrap
                  after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-accent
                  after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden lg:block flex-shrink-0">
          <Link
            to="/inquiry"
            className="inline-flex items-center rounded-full bg-accent px-7 py-2.5 text-sm font-semibold text-white
              transition-all duration-300 hover:bg-accent-hover hover:shadow-[0_8px_24px_-8px_rgb(var(--shadow)/0.7)] whitespace-nowrap"
          >
            {navbar.cta}
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden text-white p-2 -mr-2 flex-shrink-0"
        >
          {open ? <IconClose /> : <IconMenu />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`lg:hidden absolute inset-x-0 top-full overflow-hidden transition-all duration-300 ${
          open ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-[#0b0b0b] border-t border-[#252525] shadow-xl px-5 py-6 flex flex-col gap-1 max-h-[70vh] overflow-y-auto">
          {navbar.links.map((link, i) => (
            <a
              key={link.label}
              href={resolveLink(link.href)}
              onClick={handleLinkClick}
              style={{ transitionDelay: open ? `${i * 40}ms` : '0ms' }}
              className={`py-3 text-base font-semibold text-ink-secondary border-b border-border last:border-b-0 transition-opacity duration-200 break-words ${
                open ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/inquiry"
            onClick={handleLinkClick}
            className="mt-4 text-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-accent-hover"
          >
            {navbar.cta}
          </Link>
        </div>
      </div>
    </header>
  )
}