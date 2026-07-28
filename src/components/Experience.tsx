import { Briefcase, Calendar } from 'lucide-react'

const Experience = () => {
  const experiences = [
    {
      role: 'Soporte Técnico TI',
      company: 'EXCOMIN SAS',
      period: 'Junio 2024 – Febrero 2025',
      responsibilities: [
        'Resolví entre 10 y 30 incidentes de soporte técnico semanales para una base de 20 a 50 usuarios, reduciendo el tiempo promedio de resolución mediante diagnóstico estructurado y documentación de procesos.',
        'Gestioné control de acceso mediante Active Directory (usuarios, roles y permisos), políticas de backup y recuperación ante desastres.',
        'Desarrollé y mantuve portales web internos: implementé nuevas funcionalidades (formularios, paneles) y brindé soporte a un CMS (WordPress).',
        'Administré infraestructura tecnológica y almacenamiento en la nube, incluyendo asignación, adquisición y mantenimiento de equipos.',
      ],
    },
    {
      role: 'Soporte Técnico TI',
      company: 'EXCOMIN SAS',
      period: 'Junio 2022 – Septiembre 2022',
      responsibilities: [
        'Brindé soporte técnico a usuarios finales, resolviendo incidencias de hardware y software.',
        'Participé en la gestión de infraestructura tecnológica y mantenimiento de equipos.',
        'Capacité a empleados en buenas prácticas de seguridad de la información.',
      ],
    },
  ]

  return (
    <section id="experience" className="w-full">
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
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow"
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
    </section>
  )
}

export default Experience
