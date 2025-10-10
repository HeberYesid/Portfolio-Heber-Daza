import { ExternalLink, Github } from 'lucide-react'

const Projects = () => {
  const projects = [
    {
      title: 'BlogFullStack',
      description: 'Plataforma de blog desarrollada con tecnologías full stack. Permite crear, editar y gestionar publicaciones de manera dinámica con una interfaz moderna y responsiva.',
      tech: ['JavaScript', 'NodeJS', 'Express', 'MongoDB'],
      github: 'https://github.com/HeberYesid/BlogFullStack',
      demo: null,
      featured: true,
    },
    {
      title: 'DevTrack',
      description: 'Sistema web Django para seguimiento automático de estadísticas de ejercicios de programación. Ayuda a desarrolladores a monitorear su progreso y mejorar sus habilidades.',
      tech: ['Python', 'Django', 'JavaScript', 'PostgreSQL'],
      github: 'https://github.com/HeberYesid/DevTrack',
      demo: null,
      featured: true,
    },
    {
      title: 'CRUD-MVC-Xampp',
      description: 'Implementación de un sistema CRUD siguiendo el patrón MVC, utilizando Python y XAMPP para la gestión de base de datos. Proyecto que demuestra buenas prácticas de arquitectura.',
      tech: ['Python', 'MVC', 'MySQL', 'XAMPP'],
      github: 'https://github.com/HeberYesid/CRUD-MVC-Xampp',
      demo: null,
      featured: false,
    },
    {
      title: 'Mi-Nota-Ya',
      description: 'Calculadora de notas universitaria desarrollada en Java. Permite calcular el promedio final y determinar la nota necesaria para aprobar una materia de forma rápida e intuitiva.',
      tech: ['Java', 'Android', 'Mobile'],
      github: 'https://github.com/HeberYesid/Mi-Nota-Ya',
      demo: null,
      featured: false,
    },
    {
      title: 'Projects Portfolio',
      description: 'Repositorio de proyectos personales que reúne ejemplos y prácticas de desarrollo web utilizando HTML, CSS y JavaScript. Incluye diversos ejercicios y aplicaciones web.',
      tech: ['HTML', 'CSS', 'JavaScript'],
      github: 'https://github.com/HeberYesid/Projects',
      demo: 'https://projects-six-navy.vercel.app/',
      featured: false,
    },
  ]

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Mis <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Proyectos</span>
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-16">
            Algunos de los proyectos en los que he trabajado
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`bg-white dark:bg-gray-950 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all ${
                  project.featured ? 'lg:col-span-2' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold">{project.title}</h3>
                  <div className="flex gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                        aria-label="GitHub"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                        aria-label="Demo"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="https://github.com/HeberYesid"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all"
            >
              <Github className="w-5 h-5" />
              Ver más en GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects
