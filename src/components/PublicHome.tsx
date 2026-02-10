import Header from './Header'
import Hero from './Hero'
import About from './About'
import Skills from './Skills'
import Footer from './Footer'
import AITools from './AITools'

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
        <Skills />
        <AITools />
      </main>
      <Footer />
    </div>
  )
}

export default PublicHome
