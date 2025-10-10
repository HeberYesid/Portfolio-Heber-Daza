import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react'

const Hero = () => {
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
            Heber Yesid
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-4">
            Estudiante de Ingeniería de Sistemas
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
            <a
              href="#contact"
              className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Contact"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#projects"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all"
            >
              Ver Proyectos
            </a>
            <a
              href="#contact"
              className="px-8 py-3 border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 rounded-lg font-medium hover:bg-blue-50 dark:hover:bg-blue-950 transition-all"
            >
              Contáctame
            </a>
          </div>

          <a href="#about" className="inline-block mt-16 animate-bounce">
            <ChevronDown className="w-8 h-8 text-gray-400" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
