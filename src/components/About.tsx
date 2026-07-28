import { User, Heart, Users, Zap, Lightbulb, Target, Brain, TrendingUp } from 'lucide-react'

const About = () => {
  const personalSkills = [
    { icon: User, title: 'Autodidacta', description: 'Aprendizaje continuo y autónomo' },
    { icon: Users, title: 'Trabajo en Equipo', description: 'Colaboración efectiva' },
    { icon: Target, title: 'Liderazgo', description: 'Guía y motivación de equipos' },
    { icon: Heart, title: 'Resolución de Problemas', description: 'Análisis crítico y soluciones' },
    { icon: Zap, title: 'Adaptabilidad', description: 'Flexible ante cambios' },
    { icon: Lightbulb, title: 'Comunicación Efectiva', description: 'Clara y asertiva' },
    { icon: Brain, title: 'Pensamiento Crítico', description: 'Análisis profundo y lógico' },
    { icon: TrendingUp, title: 'Mentalidad de Crecimiento', description: 'Mejora constante' },
  ]

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Sobre <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Mí</span>
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-16 max-w-2xl mx-auto">
            Ingeniero de Sistemas en formación con enfoque en backend, Clean Architecture y desarrollo guiado por especificaciones.
          </p>

          <div className="bg-white dark:bg-gray-950 rounded-2xl p-8 md:p-12 shadow-lg border border-gray-200 dark:border-gray-800 mb-16">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">¿Quién soy?</h3>
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                  Desarrollador backend especializado en la construcción de sistemas robustos, escalables y de alto rendimiento utilizando Java (Spring Boot) y Python (Django/FastAPI), con capacidad para integrar entornos frontend modernos con React. Mi enfoque de desarrollo se basa en la aplicación rigurosa de Clean Architecture, patrones de diseño, principios SOLID y testing automatizado (TDD), garantizando soluciones mantenibles y de alta calidad técnica.

Poseo experiencia práctica en el diseño de bases de datos relacionales (PostgreSQL, MySQL), arquitecturas multi-tenant con aislamiento de datos, entornos contenerizados con Docker y despliegue en la nube (AWS, GCP). Soy pionero en la optimización del ciclo de vida del desarrollo mediante flujos asistidos por IA (Specification-Driven Development) y diseño guiado por especificaciones, acelerando la entrega de código verificado.
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-3xl font-bold text-center mb-12">Competencias Personales</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {personalSkills.map((skill, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-950 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-xl hover:scale-105 transition-all"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg mb-4">
                    <skill.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="font-semibold text-lg mb-2">{skill.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{skill.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
