import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Services from '../components/Services'
import Membership from '../components/Membership'
import Testimonials from '../components/Testimonials'
import HowItWorks from '../components/HowItWorks'
import Footer from '../components/Footer'
import ContactForm from '../components/ContactForm'

export default function Home() {
  return (
    <div className="bg-bg-primary min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Membership />
        <Testimonials />
        <HowItWorks />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}