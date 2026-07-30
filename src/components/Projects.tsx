import { ExternalLink, Github } from 'lucide-react'

const Projects = () => {
  const projects = [
    {
      id: 'IC1',
      ref: 'INVESTMENT_TRACKER',
      name: 'Investment Tracker',
      role: 'Featured',
      desc: 'Plataforma de seguimiento de inversiones multi-broker con Row Level Security (RLS) por roles. Suite de 540 tests automatizados bajo TDD. Rate limiting, cacheo y manejo tipado de errores.',
      stack: 'Next.js · TypeScript · PostgreSQL · Supabase · Vitest · Playwright · Vercel',
      github: 'https://github.com/HeberYesid/investment-tracker',
      demo: 'https://investment-tracker-xi-seven.vercel.app/',
      pins: 8,
    },
    {
      id: 'IC2',
      ref: 'CODE_DUEL',
      name: 'Code Duel',
      role: 'Featured',
      desc: 'Plataforma de programación competitiva con ejecución aislada de código en Docker. WebSocket para tiempo real, JWT, cola de matchmaking y máquina de estados.',
      stack: 'Java · Spring Boot · Docker · WebSocket · JWT · Monaco Editor · Render',
      github: 'https://github.com/HeberYesid/code-duel',
      demo: 'https://code-duel-kzhs.onrender.com',
      pins: 7,
    },
    {
      id: 'IC3',
      ref: 'AULA_ALDIA',
      name: 'Aula AlDía',
      role: 'Featured',
      desc: 'Plataforma SaaS educativa multi-tenant con aislamiento de datos por inquilino. JWT con claims tenant-scoped, OAuth2 (Google), rate limiting con Redis.',
      stack: 'Python · Django · DRF · React · Redis · JWT · OAuth2 · PostgreSQL',
      github: 'https://github.com/HeberYesid/AulaAlDia-frontend',
      demo: 'https://aula-al-dia-frontend.vercel.app/login',
      pins: 8,
    },
    {
      id: 'IC4',
      ref: 'CONCURRENT_SCHEDULER',
      name: 'Concurrent Scheduler Lab',
      role: 'Academic',
      desc: 'Planificador de procesos con Binary Max-Heap y aging dinámico (3 estrategias bajo patrón Strategy). 23 tests, ≥75% branch coverage, ≥60% mutation score.',
      stack: 'Java · JUnit 5 · jqwik · JaCoCo · PIT · JMH · Clean Architecture',
      github: 'https://github.com/HeberYesid/concurrent-scheduler-lab',
      demo: 'https://concurrent-scheduler-lab.onrender.com',
      pins: 7,
    },
  ]

  return (
    <section id="projects">
      <span className="component-label text-trace mb-3 block">INTEGRATED CIRCUITS · PROJECTS</span>
      <h2 className="text-3xl lg:text-4xl font-bold text-silkscreen tracking-tight mb-12">
        Proyectos
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {projects.map((proj) => (
          <div key={proj.id} className="chip-body p-5 lg:p-6 group flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-[0.625rem] text-copper tracking-[0.15em]">
                    {proj.id}
                  </span>
                  <span className="font-mono text-[0.5rem] text-silkscreen-dim tracking-[0.2em]">
                    {proj.ref}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-silkscreen">{proj.name}</h3>
              </div>
              <span className="px-2 py-0.5 rounded-pad bg-copper/10 border border-copper/20 font-mono text-[0.625rem] text-copper tracking-wider flex-shrink-0">
                {proj.role}
              </span>
            </div>

            <p className="text-sm text-silkscreen-dim leading-relaxed mb-4 flex-1">
              {proj.desc}
            </p>

            <div className="mb-4">
              <p className="font-mono text-[0.625rem] text-silkscreen-dim tracking-wider mb-1.5">
                STACK:
              </p>
              <p className="text-xs text-silkscreen-dim leading-relaxed">
                {proj.stack}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-trace/10">
              <div className="flex gap-2">
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-pad border border-via-ring/30 text-xs font-mono text-silkscreen-dim hover:text-trace-bright hover:border-trace/50 transition-all duration-200"
                >
                  <Github className="w-3 h-3" />
                  src
                </a>
                <a
                  href={proj.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-pad border border-trace/30 text-xs font-mono text-trace hover:bg-trace/10 transition-all duration-200"
                >
                  <ExternalLink className="w-3 h-3" />
                  demo
                </a>
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: proj.pins }).map((_, i) => (
                  <div key={i} className="w-1.5 h-3 rounded-pad bg-pad/20" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Projects
