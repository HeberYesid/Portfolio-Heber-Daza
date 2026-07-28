import { useState } from 'react'
import { ExternalLink, Github, FolderGit2, Star } from 'lucide-react'

type Filter = 'all' | 'featured'

const Projects = () => {
  const [filter, setFilter] = useState<Filter>('all')

  const projects = [
    {
      title: 'Investment Tracker',
      description: 'Plataforma de seguimiento de inversiones multi-broker. Backend con Next.js/TypeScript y PostgreSQL (Supabase), Row Level Security (RLS) con permisos por roles (OWNER/EDITOR/VIEWER). Suite de 540 tests automatizados (Vitest + Playwright) bajo TDD, cubriendo cálculos financieros, validaciones y parsers CSV. Rate limiting, cacheo con invalidación por tags y manejo tipado de errores en API REST.',
      tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Supabase', 'Vitest', 'Playwright', 'TDD', 'RLS', 'Vercel'],
      github: 'https://github.com/HeberYesid/investment-tracker',
      demo: 'https://investment-tracker-xi-seven.vercel.app/',
      featured: true,
    },
    {
      title: 'Code Duel',
      description: 'Plataforma de programación competitiva con backend modular en Java/Spring Boot. Capa de ejecución aislada de código mediante contenedores Docker. Comunicación en tiempo real con WebSocket y autenticación JWT. Cola de matchmaking y máquina de estados para el ciclo de vida del duelo. Monaco Editor integrado en el cliente.',
      tech: ['Java', 'Spring Boot', 'Docker', 'WebSocket', 'JWT', 'Monaco Editor', 'Render'],
      github: 'https://github.com/HeberYesid/code-duel',
      demo: 'https://code-duel-kzhs.onrender.com',
      featured: true,
    },
    {
      title: 'Aula AlDía',
      description: 'Plataforma SaaS educativa multi-tenant con Django/DRF. Aislamiento de datos por inquilino a nivel de query, planes con cuotas configurables. Autenticación JWT con claims tenant-scoped, OAuth2 (Google) y rate limiting con Redis. Máquina de estados transaccional para cierre de períodos académicos. Frontend en React con Context API, guardias de ruta multicapa y renovación de token con cola de concurrencia.',
      tech: ['Python', 'Django', 'DRF', 'React', 'Redis', 'JWT', 'OAuth2', 'PostgreSQL', 'Vercel'],
      github: 'https://github.com/HeberYesid/AulaAlDia-frontend',
      demo: 'https://aula-al-dia-frontend.vercel.app/login',
      featured: true,
    },
    {
      title: 'Concurrent Scheduler Lab',
      description: 'Planificador de procesos en Java con Binary Max-Heap y motor de aging dinámico (3 estrategias: lineal, exponencial, escalonada bajo patrón Strategy). Clean Architecture hexagonal con dependencia unidireccional estricta. 23 archivos de test con JUnit 5 y pruebas basadas en propiedades (jqwik), ≥75% branch coverage (JaCoCo), ≥60% mutation score (PIT). Benchmarking con JMH en 4 escalas (1K–500K procesos).',
      tech: ['Java', 'JUnit 5', 'jqwik', 'JaCoCo', 'PIT', 'JMH', 'Clean Architecture', 'Render'],
      github: 'https://github.com/HeberYesid/concurrent-scheduler-lab',
      demo: 'https://concurrent-scheduler-lab.onrender.com',
      featured: false,
    },
  ]

  const sortedProjects = [...projects].sort((a, b) => Number(b.featured) - Number(a.featured))

  const filteredProjects = filter === 'featured'
    ? sortedProjects.filter(p => p.featured)
    : sortedProjects

  return (
    <section id="projects" className="w-full">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
        Mis <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Proyectos</span>
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-10">
        Proyectos destacados que reflejan mi experiencia técnica
      </p>

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
                ? 'bg-white dark:bg-gray-800 border-l-4 border-l-blue-500 border border-blue-200/50 dark:border-blue-800/40 hover:shadow-xl hover:shadow-blue-500/10'
                : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-xl'
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
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
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
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
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
    </section>
  )
}

export default Projects
