import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Customizer from './components/Customizer'
import Home from './pages/Home'
import InquiryForm from './pages/InquiryForm'
import SectionToolbar from './components/SectionToolbar'

function App() {
  return (
    <BrowserRouter>
      <div className="bg-bg-primary min-h-screen flex flex-col">
        <Navbar />
        <SectionToolbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inquiry" element={<InquiryForm />} />
          </Routes>
        </div>
        <Footer />
        {/* Vendor-facing live editor — see README "The Live Customizer" */}
        <Customizer />
      </div>
    </BrowserRouter>
  )
}

export default App
