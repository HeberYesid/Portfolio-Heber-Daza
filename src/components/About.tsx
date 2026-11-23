import { Cpu, Layers, TestTube, Brain } from 'lucide-react'

const About = () => {
  const specs = [
    {
      id: 'U1A',
      icon: Cpu,
      label: 'Core Architecture',
      value: 'Backend Systems',
      detail: 'Java Spring Boot · Python Django/FastAPI · Node.js Express',
    },
    {
      id: 'U1B',
      icon: Layers,
      label: 'Design Pattern',
      value: 'Clean Architecture',
      detail: 'SOLID · Hexagonal · Domain-Driven Design · Multi-tenant isolation',
    },
    {
      id: 'U1C',
      icon: TestTube,
      label: 'Quality Assurance',
      value: 'TDD & 540+ Tests',
      detail: 'JUnit · Pytest · Vitest · Playwright · SonarQube · Mutation Testing',
    },
    {
      id: 'U1D',
      icon: Brain,
      label: 'AI-Augmented',
      value: 'SDD Workflow',
      detail: 'Claude Code · MCP · Specification-Driven Development · Prompt Engineering',
    },
  ]

  return (
    <section id="about" className="py-24 lg:py-32">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <span className="component-label text-copper mb-3 block">COMPONENT · U1 — DATASHEET</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-silkscreen tracking-tight mb-6">
                {'Sobre el '}<span className="block">desarrollador</span>
              </h2>
              <div className="space-y-4 text-silkscreen-dim leading-relaxed text-sm lg:text-base">
                <p>
                  Ingeniero de Sistemas en formación (8° semestre, Universidad de Santander)
                  con enfoque en el desarrollo de sistemas backend robustos, escalables y de alto
                  rendimiento.
                </p>
                <p>
                  Mi práctica diaria combina Clean Architecture, patrones de diseño, SOLID y
                  testing automatizado con flujos de trabajo aumentados por IA bajo el paradigma
                  Specification-Driven Development.
                </p>
                <p>
                  He diseñado bases de datos relacionales con aislamiento multi-tenant,
                  entornos contenerizados con Docker, y sistemas con Row-Level Security.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {specs.map((spec) => (
                <div
                  key={spec.id}
                  className="chip-body p-5 group cursor-default"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <span className="font-mono text-[0.625rem] text-trace tracking-[0.15em] mt-0.5">
                      {spec.id}
                    </span>
                    <div className="w-7 h-7 rounded-pad bg-trace/5 border border-trace/20 flex items-center justify-center flex-shrink-0">
                      <spec.icon className="w-3.5 h-3.5 text-trace" />
                    </div>
                  </div>
                  <div className="ml-10">
                    <p className="text-[0.625rem] font-mono text-silkscreen-dim tracking-[0.15em] uppercase mb-1">
                      {spec.label}
                    </p>
                    <p className="text-sm font-semibold text-silkscreen mb-1.5">
                      {spec.value}
                    </p>
                    <p className="text-xs text-silkscreen-dim leading-relaxed">
                      {spec.detail}
                    </p>
                  </div>
                  <div className="mt-4 ml-10 flex items-center gap-1.5">
                    <div className="h-px flex-1 bg-trace/10" />
                    <div className="via-dot" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
