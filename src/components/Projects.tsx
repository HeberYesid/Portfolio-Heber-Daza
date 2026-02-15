import { useState } from 'react'
import { ExternalLink, Github, FolderGit2, Star } from 'lucide-react'

type Filter = 'all' | 'featured'

const Projects = () => {
  const [filter, setFilter] = useState<Filter>('all')

  const projects = [
    {
      title: 'DevTrack',
      description: 'Sistema web Django para seguimiento automático de estadísticas de ejercicios de programación. Ayuda a desarrolladores a monitorear su progreso y mejorar sus habilidades.',
      tech: ['Python', 'Django', 'JavaScript', 'PostgreSQL', 'React', 'Vite', 'Vercel', 'Render'],
      github: 'https://github.com/HeberYesid/DevTrack',
      demo: 'https://dev-track-lyart.vercel.app/',
      featured: true,
    },
    {
      title: 'Web Scrapping',
      description: 'Herramienta de web scrapping + alertas bot de telegram',
      tech: ['Python', 'BeautifulSoup', 'Requests', 'Telegram Bot API'],
      github: 'https://github.com/HeberYesid/webscrapping',
      demo: null,
      featured: true,
    },
    {
      title: 'Ecommerce',
      description: 'Amazon Ecommerce MVP',
      tech: ['TypeScript', 'Supabase', 'React', 'Vite', 'Vercel'],
      github: 'https://github.com/HeberYesid/ecommerce',
      demo: 'https://ecommerce-tan-six-94.vercel.app/',
      featured: true,
    },
    {
      title: 'Django-auth-crud',
      description: 'Aplicación de gestión de tareas (To-Do App) desarrollada con Django, que implementa un sistema completo de autenticación de usuarios y operaciones CRUD.',
      tech: ['Python', 'Django', 'Render', 'PostgreSQL'],
      github: 'https://github.com/HeberYesid/django-auth-crud',
      demo: 'https://django-auth-crud-y118.onrender.com/',
      featured: false,
    },
    {
      title: 'Neobank-frontend',
      description: 'Dashboard para neobanco. Diseño limpio, moderno y minimalista, optimizado para una experiencia de usuario intuitiva.',
      tech: ['Javascript', 'React', 'Vercel'],
      github: 'https://github.com/HeberYesid/neobank-frontend',
      demo: 'https://neobank-frontend-three.vercel.app/',
      featured: false,
    },
    {
      title: 'django-auth-crud',
      description: 'Aplicación de gestión de tareas (To-Do App) desarrollada con Django, que implementa un sistema completo de autenticación de usuarios y operaciones CRUD.',
      tech: ['Python', 'Django', 'Render', 'PostgreSQL'],
      github: 'https://github.com/HeberYesid/django-auth-crud',
      demo: 'https://django-auth-crud-y118.onrender.com/',
      featured: false,
    }
  ]

  // Sort: featured first, then non-featured
  const sortedProjects = [...projects].sort((a, b) => Number(b.featured) - Number(a.featured))

  // Filter based on selected tab
  const filteredProjects = filter === 'featured'
    ? sortedProjects.filter(p => p.featured)
    : sortedProjects

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Mis <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Proyectos</span>
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-10">
            Algunos de los proyectos en los que he trabajado
          </p>

          {/* Filter Buttons */}
          <div className="flex justify-center gap-3 mb-12">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500'
              }`}
            >
              Todos ({projects.length})
            </button>
            <button
              onClick={() => setFilter('featured')}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 inline-flex items-center gap-1.5 ${
                filter === 'featured'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500'
              }`}
            >
              <Star className="w-3.5 h-3.5" />
              Destacados ({projects.filter(p => p.featured).length})
            </button>
          </div>

          <div className="space-y-8">
            {filteredProjects.map((project, index) => (
              <div
                key={index}
                className={`rounded-2xl p-8 shadow-lg transition-all duration-300 ${
                  project.featured
                    ? 'bg-white dark:bg-gray-950 border-l-4 border-l-blue-500 border border-blue-200/50 dark:border-blue-800/40 hover:shadow-xl hover:shadow-blue-500/10'
                    : 'bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 hover:shadow-xl'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className={`p-4 rounded-xl ${
                      project.featured
                        ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 dark:from-blue-500/15 dark:to-purple-500/15 ring-1 ring-blue-500/20'
                        : 'bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30'
                    }`}>
                      <FolderGit2 className={`w-8 h-8 ${
                        project.featured
                          ? 'text-blue-500 dark:text-blue-400'
                          : 'text-blue-600 dark:text-blue-400'
                      }`} />
                    </div>
                  </div>

                  <div className="flex-grow">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-2xl font-bold">{project.title}</h3>
                        {project.featured && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60">
                            <Star className="w-3 h-3 fill-current" />
                            Destacado
                          </span>
                        )}
                      </div>
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
