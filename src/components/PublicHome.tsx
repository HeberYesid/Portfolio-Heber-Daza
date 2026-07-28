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

interface PublicHomeProps {
  darkMode: boolean
  toggleDarkMode: () => void
}

const PublicHome = ({ darkMode, toggleDarkMode }: PublicHomeProps) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-200">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main>
        <Hero />
        <About />

        <div className="bg-gray-50 dark:bg-gray-900 py-16">
          <div className="container mx-auto px-6">
            <Experience />
          </div>
        </div>

        <div className="py-16">
          <div className="container mx-auto px-6">
            <Skills />
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 py-16">
          <div className="container mx-auto px-6">
            <Projects />
          </div>
        </div>

        <div className="py-16">
          <div className="container mx-auto px-6">
            <Education />
          </div>
        </div>

        <div id="chat" className="bg-gray-50 dark:bg-gray-900 py-16">
          <div className="container mx-auto px-6 max-w-3xl">
            <Chatbot />
          </div>
        </div>

        <div id="languages" className="py-16">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl">
                  <Languages className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Idiomas</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Español</h3>
                  <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-medium">
                    Nativo
                  </span>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Inglés</h3>
                  <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-medium">
                    B1
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 py-16">
          <div className="container mx-auto px-6">
            <TechNews />
          </div>
        </div>

        <div className="py-16">
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default PublicHome