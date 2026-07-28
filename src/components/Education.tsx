import { GraduationCap, BookOpen, Award } from 'lucide-react'

const Education = () => {
  const certifications = [
    'Bootcamp de Desarrollo de Software Basado en Agentes con Kiro - Código Facilito (07/2026)',
    'Curso de Fundamentos de Arquitectura - Código Facilito (07/2026)',
    'Curso de Fundamentos de AWS - Código Facilito (07/2026)',
    'Curso Profesional de Docker - Código Facilito (07/2026)',
    'Curso de Patrones de Diseño con Java - Código Facilito (07/2026)',
    'LLMOps Concepts - Datacamp (07/2026)',
    'Prompt Engineering with the OpenAI API - Datacamp (07/2026)',
    'Curso de Desarrollo de Software con Claude Code - Código Facilito (07/2026)',
    'Curso de Python Profesional - Código Facilito (07/2026)',
    'Curso de Spring Framework y Spring Boot - Código Facilito (07/2026)',
    'Curso de Java Profesional - Código Facilito (07/2026)',
    'Working with Hugging Face - Datacamp (06/2026)',
    'Working with the OpenAI API - Datacamp (06/2026)',
    'Inteligencia Artificial Básico - Talento Tech Colombia (02/2026)',
    'Calidad en el Desarrollo de Software - SENA (09/2025)',
    'Certificado Hackatón Cúcuta - Talento Tech Oriente (08/2025)',
    'Análisis Exploratorio de Datos en Python - SENA (08/2025)',
    'Bootcamp en Programación Avanzada - Talento Tech Colombia (12/2024)',
    'Python Essentials II - Cisco Networking Academy (12/2024)',
    'JavaScript Essentials 1 - Cisco Networking Academy (12/2024)',
    'English for IT 1 - Cisco Networking Academy (12/2024)',
    'English for IT 2 - Cisco Networking Academy (12/2024)',
    'Python Essentials I - Cisco Networking Academy (10/2024)',
  ]

  return (
    <section id="education" className="w-full">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Educación</span>
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-16">
        Mi formación académica y desarrollo profesional
      </p>

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow mb-8">
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          <div className="flex-shrink-0">
            <div className="p-4 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl">
              <GraduationCap className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          
          <div className="flex-grow">
            <h3 className="text-2xl font-bold mb-2">Ingeniería de Sistemas</h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-3">Universidad de Santander</p>
            
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-6">
              <BookOpen className="w-4 h-4" />
              <span>8° Semestre - En curso (2023 - Presente) | Graduación esperada: Diciembre 2027</span>
            </div>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Desarrollando habilidades en desarrollo de software, estructuras de datos, patrones de diseño, arquitectura de sistemas y bases de datos.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          <div className="flex-shrink-0">
            <div className="p-4 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl">
              <Award className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          
          <div className="flex-grow">
            <h3 className="text-2xl font-bold mb-2">Formación Adicional</h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-3">Certificaciones y Cursos</p>
            
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-6">
              <BookOpen className="w-4 h-4" />
              <span>{certifications.length} certificaciones obtenidas</span>
            </div>

            <ul className="space-y-2">
              {certifications.map((cert, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-blue-600 dark:text-blue-400 mt-1">▹</span>
                  <span className="text-gray-700 dark:text-gray-300 text-sm">{cert}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <a
                href="https://github.com/HeberYesid/Certificados"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all text-sm"
              >
                Ver soportes en GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Education
