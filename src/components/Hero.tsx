import { Github, Linkedin, ChevronDown, LogIn, X } from 'lucide-react'
import { useState } from 'react'

const Hero = () => {
  const [showModal, setShowModal] = useState(false)

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 p-1">
              <div className="w-full h-full rounded-full bg-white dark:bg-gray-950 flex items-center justify-center">
                <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  HY
                </span>
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Heber Yesid Daza Toloza
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-800 dark:text-gray-200 mb-2 font-semibold">
            Cúcuta, Colombia
          </p>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-4">
            Fullstack Developer
          </p>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Apasionado por la tecnología y el aprendizaje continuo. Me adapto rápidamente a nuevos retos 
            y disfruto trabajar en equipo para desarrollar soluciones innovadoras.
          </p>

          <div className="flex justify-center gap-4 mb-12">
            <a
              href="https://github.com/HeberYesid"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/heberyesid/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => setShowModal(true)}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all w-full sm:w-auto"
            >
              Ver Proyectos
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="px-8 py-3 border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 rounded-lg font-medium hover:bg-blue-50 dark:hover:bg-blue-950 transition-all w-full sm:w-auto"
            >
              Contáctame
            </button>
          </div>

          <a href="#about" className="inline-block mt-16 animate-bounce">
            <ChevronDown className="w-8 h-8 text-gray-400" />
          </a>
        </div>
      </div>

      {/* Modal de Acceso Requerido */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-sm w-full shadow-2xl transform animate-in zoom-in-95 duration-300 border border-gray-200 dark:border-gray-800">
            <div className="flex justify-end mb-2">
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogIn className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              
              <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                Acceso Privado
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Para ver mis proyectos detallados y mis medios de contacto, por favor inicia sesión.
              </p>
              
              <div className="flex flex-col gap-3">
                <a
                  href="/login"
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold hover:shadow-lg transition-all text-center flex items-center justify-center gap-2"
                >
                  <LogIn className="w-5 h-5" />
                  Ir al Login
                </a>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full py-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm font-medium"
                >
                  Tal vez más tarde
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Hero
