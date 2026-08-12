import Hero from '../components/Hero'
import About from '../components/About'
import Services from '../components/Services'
import Gallery from '../components/Gallery'
import Membership from '../components/Membership'
import HowItWorks from '../components/HowItWorks'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="bg-bg-primary min-h-screen">
      <main>
        <Hero />
        <About />
        <Services />
        <Membership />
        <Gallery />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  )
}
