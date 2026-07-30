const Experience = () => {
  const roles = [
    {
      id: 'EXP1',
      period: 'Jun 2024 — Feb 2025',
      title: 'Soporte Técnico TI',
      company: 'EXCOMIN SAS',
      duration: '9 meses',
      highlights: [
        'Resolución de 10–30 incidentes semanales para 20–50 usuarios',
        'Gestión de Active Directory: usuarios, roles, permisos y políticas de backup',
        'Desarrollo y mantenimiento de portales web internos (CMS WordPress)',
        'Administración de infraestructura tecnológica y almacenamiento cloud',
      ],
    },
    {
      id: 'EXP2',
      period: 'Jun 2022 — Sep 2022',
      title: 'Soporte Técnico TI',
      company: 'EXCOMIN SAS',
      duration: '4 meses',
      highlights: [
        'Soporte técnico a usuarios finales (hardware y software)',
        'Gestión de infraestructura tecnológica y mantenimiento de equipos',
        'Capacitación en buenas prácticas de seguridad de la información',
      ],
    },
  ]

  return (
    <section id="experience">
      <span className="component-label text-trace mb-3 block">SIGNAL PATH · EXPERIENCE</span>
      <h2 className="text-3xl lg:text-4xl font-bold text-silkscreen tracking-tight mb-12">
        Experiencia
      </h2>

      <div className="relative">
        <div className="absolute left-[19px] top-3 bottom-3 w-px bg-trace/20 hidden sm:block" />

        <div className="space-y-8">
          {roles.map((role) => (
            <div key={role.id} className="relative pl-14 sm:pl-16">
              <div className="absolute left-[12px] sm:left-[12px] top-2.5 w-[15px] h-[15px] rounded-full border-2 border-trace/50 bg-substrate hidden sm:block" />
              <div className="absolute left-[16px] sm:left-[16px] top-3.5 w-[7px] h-[7px] rounded-full bg-trace/80 hidden sm:block animate-signal" />

              <div className="chip-body p-5 lg:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-[0.625rem] text-copper tracking-[0.15em]">
                        {role.id}
                      </span>
                      <div className="led-indicator bg-led-green" />
                    </div>
                    <h3 className="text-lg font-bold text-silkscreen">
                      {role.title}
                    </h3>
                    <p className="text-sm text-silkscreen-dim font-medium">{role.company}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-silkscreen-dim tracking-wider">
                      {role.period}
                    </span>
                    <span className="px-2 py-0.5 rounded-pad bg-trace/5 border border-trace/20 font-mono text-[0.625rem] text-trace tracking-wider">
                      {role.duration}
                    </span>
                  </div>
                </div>

                <ul className="space-y-2">
                  {role.highlights.map((h, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-silkscreen-dim">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-trace/40 flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
