import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/Hero'
import About from '../components/About'
import Services from '../components/Services'
import Membership from '../components/Membership'
import Testimonials from '../components/Testimonials'
import HowItWorks from '../components/HowItWorks'
import ContactForm from '../components/ContactForm'

export default function Home() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash)
      if (el) {
        // slight delay so the page has fully rendered before scrolling
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    }
  }, [location])

  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Membership />
      <Testimonials />
      <HowItWorks />
      <ContactForm />
    </main>
  )
}