// Minimal hand-authored SVG icon set — kept dependency-free per project constraints.
// Every icon accepts a `className` prop so callers can size/color via Tailwind.

export const IconMenu = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M3 6h18M3 12h18M3 18h18" />
  </svg>
)

export const IconClose = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
)

export const IconForgewellMark = ({ className = 'w-10 h-10' }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <rect x="4" y="4" width="40" height="40" rx="4" fill="#FFD400" />
    <path d="M14 33V15h20" stroke="#0A0A0A" strokeWidth="4" strokeLinecap="square" strokeLinejoin="round" />
    <path d="M14 24h16" stroke="#0A0A0A" strokeWidth="4" strokeLinecap="square" />
    <path d="M34 15l-9 18" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="square" />
  </svg>
)

export const IconArrowRight = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

export const IconCheck = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5" />
  </svg>
)

export const IconStar = ({ className = 'w-4 h-4', filled = true }) => (
  <svg className={className} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
    <path strokeLinejoin="round" d="M12 2.5l2.9 6.2 6.6.7-4.9 4.5 1.3 6.6L12 17.3l-5.9 3.2 1.3-6.6-4.9-4.5 6.6-.7L12 2.5z" />
  </svg>
)

export const IconMapPin = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

export const IconPhone = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .3 2 .7 2.9a2 2 0 01-.4 2.1L8 10.1a16 16 0 006 6l1.4-1.4a2 2 0 012.1-.4c.9.4 1.9.6 2.9.7a2 2 0 011.7 2z" />
  </svg>
)

export const IconMail = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16v16H4z" />
    <path d="M22 6l-10 7L2 6" />
  </svg>
)

export const IconInstagram = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
  </svg>
)

export const IconFacebook = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M15 8h2V4h-2a4 4 0 00-4 4v2H9v4h2v8h4v-8h2.6l.4-4H15V8z" />
  </svg>
)

export const IconTwitter = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 5.9c-.7.3-1.5.5-2.3.6a4 4 0 001.8-2.2 8 8 0 01-2.5 1 4 4 0 00-6.9 3.6A11.4 11.4 0 013 4.9a4 4 0 001.2 5.3c-.6 0-1.2-.2-1.7-.5v.1a4 4 0 003.2 3.9c-.6.1-1.2.2-1.8.1a4 4 0 003.7 2.8A8 8 0 012 18.4a11.3 11.3 0 006.1 1.8c7.3 0 11.4-6.1 11.4-11.4v-.5c.8-.6 1.4-1.3 1.9-2.1z" />
  </svg>
)

export const IconYoutube = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="4" />
    <path d="M10 9.5l5 2.5-5 2.5v-5z" fill="currentColor" stroke="none" />
  </svg>
)

// Service icons — simple line-art matched to each training discipline.
export const IconDumbbell = ({ className = 'w-7 h-7' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6.5 7v10M17.5 7v10M3 10v4M21 10v4M6.5 12h11" />
  </svg>
)

export const IconBarbell = ({ className = 'w-7 h-7' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12h3M19 12h3M5 9v6M8 7v10M16 7v10M19 9v6M8 12h8" />
  </svg>
)

export const IconHeartbeat = ({ className = 'w-7 h-7' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12h4l2-5 3 10 2-7 1.5 2H21" />
  </svg>
)

export const IconFlame = ({ className = 'w-7 h-7' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2.5c1 3-3 4.5-3 8a3 3 0 006 0c0-1-.5-1.7-1-2.3 2 .5 3.5 2.7 3.5 5.3a5.5 5.5 0 11-11 0c0-4.2 3-6 4-8.5.3-.8.4-1.7.5-2.5z" />
  </svg>
)

export const IconLeaf = ({ className = 'w-7 h-7' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 20c9 0 14-5 14-14a14 14 0 00-14 14z" />
    <path d="M5 20c0-6 3-9 9-11" />
  </svg>
)

export const IconApple = ({ className = 'w-7 h-7' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 8c-3.5 0-6 2.7-6 6.3C6 18 8.3 21 10.8 21c1 0 1.4-.6 2.2-.6s1.1.6 2.2.6c2.3 0 4.8-3 4.8-6.6C20 10.9 17.7 8 15 8c-1 0-1.6.5-2.2.5S13 8 12 8z" />
    <path d="M12.3 8c0-1.6.9-3 2.3-3.5" />
  </svg>
)

export const serviceIconMap = {
  dumbbell: IconDumbbell,
  barbell: IconBarbell,
  heartbeat: IconHeartbeat,
  flame: IconFlame,
  leaf: IconLeaf,
  apple: IconApple,
}

export const socialIconMap = {
  instagram: IconInstagram,
  facebook: IconFacebook,
  twitter: IconTwitter,
  youtube: IconYoutube,
}
