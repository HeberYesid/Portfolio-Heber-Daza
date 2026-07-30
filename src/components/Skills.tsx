const Skills = () => {
  const modules = [
    {
      id: 'M1',
      label: 'Lenguajes',
      spec: 'PROGRAMMING_LANG',
      items: ['Python', 'Java', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3'],
      pins: 6,
    },
    {
      id: 'M2',
      label: 'Backend & APIs',
      spec: 'BACKEND_STACK',
      items: ['Spring Boot', 'Django', 'FastAPI', 'Node.js', 'Express', 'REST', 'GraphQL'],
      pins: 7,
    },
    {
      id: 'M3',
      label: 'Bases de Datos',
      spec: 'DATA_LAYER',
      items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'],
      pins: 4,
    },
    {
      id: 'M4',
      label: 'Testing & Calidad',
      spec: 'QA_SUITE',
      items: ['JUnit', 'Pytest', 'Jest', 'Vitest', 'Playwright', 'SonarQube', 'ESLint'],
      pins: 7,
    },
    {
      id: 'M5',
      label: 'DevOps & Cloud',
      spec: 'INFRASTRUCTURE',
      items: ['Docker', 'AWS (EC2, S3, IAM, Lambda)', 'GCP', 'GitHub Actions', 'CI/CD'],
      pins: 5,
    },
    {
      id: 'M6',
      label: 'IA & Arquitectura',
      spec: 'AI_ARCH',
      items: ['MCP', 'Claude Code', 'OpenSpec', 'Swagger/OpenAPI', 'JWT', 'Git'],
      pins: 6,
    },
    {
      id: 'M7',
      label: 'Metodologías',
      spec: 'METHODOLOGY',
      items: ['Scrum', 'Kanban', 'TDD', 'Clean Code', 'SOLID', 'SDD'],
      pins: 6,
    },
    {
      id: 'M8',
      label: 'Soft Skills',
      spec: 'HUMAN_INTERFACE',
      items: ['Autodidacta', 'Liderazgo', 'Resolución de Problemas', 'Comunicación Efectiva', 'Pensamiento Crítico'],
      pins: 5,
    },
  ]

  return (
    <section id="skills">
      <span className="component-label text-trace mb-3 block">PERIPHERAL MODULES · SKILLS</span>
      <h2 className="text-3xl lg:text-4xl font-bold text-silkscreen tracking-tight mb-12">
        Habilidades Técnicas
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {modules.map((mod) => (
          <div key={mod.id} className="chip-body p-4 group">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[0.625rem] text-copper tracking-[0.15em]">
                {mod.id}
              </span>
              <span className="font-mono text-[0.5rem] text-silkscreen-dim tracking-[0.2em]">
                {mod.spec}
              </span>
            </div>
            <h3 className="text-sm font-bold text-silkscreen mb-3 tracking-tight">
              {mod.label}
            </h3>
            <div className="space-y-1.5">
              {mod.items.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-trace/30 flex-shrink-0" />
                  <span className="text-xs text-silkscreen-dim leading-tight">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-trace/10 flex items-center justify-between">
              <div className="flex gap-0.5">
                {Array.from({ length: mod.pins }).map((_, i) => (
                  <div key={i} className="w-1.5 h-3 rounded-pad bg-trace/20" />
                ))}
              </div>
              <span className="font-mono text-[0.5rem] text-silkscreen-dim tracking-[0.2em]">
                {mod.pins} PIN
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills
