import { Briefcase, Calendar } from 'lucide-react'

const Experience = () => {
  const experiences = [
    {
      role: 'Proyectos Autodidactas - DevTrack',
      company: 'Proyecto Personal',
      period: '2024 - Presente',
      responsibilities: [
        'Plataforma full-stack para la gestión académica que permite administrar cursos, inscribir estudiantes y registrar resultados.',
        'Cálculo automático de notas, roles diferenciados y notificaciones automáticas.',
        'Construida con Django REST Framework (Backend) y React (Frontend).',
        'Implementación de JWT, operaciones masivas por CSV e integración con servicios de IA y nube.',
        'Arquitectura escalable y base de datos relacional.',
      ],
    },
    {
      role: 'Auxiliar de Sistemas',
      company: 'Empresa',
      period: 'Junio 2024 - Febrero 2025',
      responsibilities: [
        'Desarrollo web de aplicaciones internas',
        'Seguridad de la información y gestión de accesos',
        'Gestión de infraestructura tecnológica',
        'Almacenamiento en la nube y respaldos',
        'Soporte técnico a usuarios finales',
      ],
    },
  ]

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Experiencia <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Laboral</span>
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-16">
            Mi trayectoria profesional en el campo de la tecnología
          </p>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-950 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="p-4 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl">
                      <Briefcase className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold mb-2">{exp.role}</h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-3">{exp.company}</p>
                    
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-6">
                      <Calendar className="w-4 h-4" />
                      <span>{exp.period}</span>
                    </div>

                    <ul className="space-y-3">
                      {exp.responsibilities.map((responsibility, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="text-blue-600 dark:text-blue-400 mt-1">▹</span>
                          <span className="text-gray-700 dark:text-gray-300">{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
