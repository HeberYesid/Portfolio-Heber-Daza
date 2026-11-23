import Header from './Header'
import Hero from './Hero'
import About from './About'
import Experience from './Experience'
import Skills from './Skills'
import Projects from './Projects'
import Education from './Education'
import Chatbot from './Chatbot'
import TechNews from './TechNews'
import Contact from './Contact'
import Footer from './Footer'
import { Languages } from 'lucide-react'

const PublicHome = () => {
  return (
    <div className="min-h-screen bg-substrate text-silkscreen transition-colors duration-300">
      <Header />
      <main>
        <Hero />

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-trace/40 via-trace/10 to-transparent hidden lg:block" />
          <About />
        </div>

        <div className="relative bg-plane-ground border-y border-trace/10">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-trace/20 hidden lg:block" />
          <div className="py-24 lg:py-32">
            <div className="container mx-auto px-6 max-w-6xl">
              <Experience />
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-trace/20 via-trace/10 to-transparent hidden lg:block" />
          <div className="py-24 lg:py-32">
            <div className="container mx-auto px-6 max-w-6xl">
              <Skills />
            </div>
          </div>
        </div>

        <div className="relative bg-plane-ground border-y border-trace/10">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-trace/20 hidden lg:block" />
          <div className="py-24 lg:py-32">
            <div className="container mx-auto px-6 max-w-6xl">
              <Projects />
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-trace/20 via-trace/10 to-transparent hidden lg:block" />
          <div className="py-24 lg:py-32">
            <div className="container mx-auto px-6 max-w-6xl">
              <Education />
            </div>
          </div>
        </div>

        <div id="chat" className="relative bg-plane-ground border-y border-trace/10">
          <div className="py-24 lg:py-32">
            <div className="container mx-auto px-6 max-w-4xl">
              <Chatbot />
            </div>
          </div>
        </div>

        <div id="languages" className="relative">
          <div className="py-24 lg:py-32">
            <div className="container mx-auto px-6 max-w-2xl">
              <div className="chip-body p-8 lg:p-10">
                <div className="flex items-center gap-4 mb-8">
                  <span className="component-label text-copper">J3</span>
                  <div className="w-8 h-8 rounded-pad bg-copper/10 border border-copper/30 flex items-center justify-center">
                    <Languages className="w-4 h-4 text-copper" />
                  </div>
                  <h2 className="text-2xl font-bold text-silkscreen tracking-tight">Idiomas</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-plane-ground border border-via-ring/20 rounded-component p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-silkscreen">Español</h3>
                      <div className="led-indicator bg-led-green animate-led-blink" />
                    </div>
                    <span className="text-xs font-mono text-silkscreen-dim tracking-wider">NATIVO</span>
                  </div>
                  <div className="bg-plane-ground border border-via-ring/20 rounded-component p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-silkscreen">Inglés</h3>
                      <div className="led-indicator bg-led-amber" />
                    </div>
                    <span className="text-xs font-mono text-silkscreen-dim tracking-wider">B1 — INTERMEDIO</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative bg-plane-ground border-y border-trace/10">
          <div className="py-24 lg:py-32">
            <div className="container mx-auto px-6 max-w-6xl">
              <TechNews />
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="py-24 lg:py-32">
            <Contact />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default PublicHome
