import { GraduationCap, BookOpen } from 'lucide-react'

const Education = () => {
  return (
    <section id="education" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Educación</span>
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-16">
            Mi formación académica y desarrollo profesional
          </p>

          <div className="bg-white dark:bg-gray-950 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-shadow">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="flex-shrink-0">
                <div className="p-4 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl">
                  <GraduationCap className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              
              <div className="flex-grow">
                <h3 className="text-2xl font-bold mb-2">Ingeniería de Sistemas</h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-3">Universidad</p>
                
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-6">
                  <BookOpen className="w-4 h-4" />
                  <span>6to Semestre - Actualmente cursando</span>
                </div>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Desarrollando habilidades en desarrollo de software, arquitectura de sistemas, 
                  bases de datos, y tecnologías emergentes. Enfocado en crear soluciones tecnológicas 
                  innovadoras y eficientes que respondan a las necesidades del mundo actual.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Education
