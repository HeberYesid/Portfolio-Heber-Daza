import { GraduationCap, Award } from 'lucide-react'

const Education = () => {
  const education = {
    id: 'EDU1',
    degree: 'Ingeniería de Sistemas',
    school: 'Universidad de Santander',
    period: '2023 — Presente',
    detail: '8° Semestre. Graduación esperada: Diciembre 2027.',
  }

  const certs = [
    { id: 'CERT1', label: 'AWS', count: '3 certificaciones' },
    { id: 'CERT2', label: 'Docker & DevOps', count: '4 certificaciones' },
    { id: 'CERT3', label: 'Spring Boot & Java', count: '5 certificaciones' },
    { id: 'CERT4', label: 'Python & Django', count: '3 certificaciones' },
    { id: 'CERT5', label: 'IA & LLMOps', count: '4 certificaciones' },
    { id: 'CERT6', label: 'Arquitectura & Testing', count: '4 certificaciones' },
  ]

  return (
    <section id="education">
      <span className="component-label text-trace mb-3 block">FIRMWARE · EDUCATION</span>
      <h2 className="text-3xl lg:text-4xl font-bold text-silkscreen tracking-tight mb-12">
        Educación
      </h2>

      <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
        <div className="lg:col-span-2">
          <div className="chip-body p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-[0.625rem] text-copper tracking-[0.15em]">{education.id}</span>
              <div className="led-indicator bg-led-amber" />
            </div>
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-pad bg-trace/5 border border-trace/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <GraduationCap className="w-5 h-5 text-trace" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-silkscreen mb-0.5">{education.degree}</h3>
                <p className="text-sm text-silkscreen-dim">{education.school}</p>
              </div>
            </div>
            <div className="ml-13 pl-0 space-y-2">
              <p className="text-sm text-silkscreen-dim">{education.detail}</p>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-silkscreen-dim tracking-wider">{education.period}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-4 h-4 text-copper" />
            <span className="component-label text-copper">23 CERTIFICACIONES ADICIONALES</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {certs.map((cert) => (
              <div key={cert.id} className="chip-body p-3 flex items-center justify-between group">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[0.5rem] text-trace tracking-[0.2em]">{cert.id}</span>
                  <span className="text-xs text-silkscreen font-medium">{cert.label}</span>
                </div>
                <span className="font-mono text-[0.625rem] text-silkscreen-dim tracking-wider">{cert.count}</span>
              </div>
            ))}
          </div>
          <a
            href="https://github.com/HeberYesid/Certificados"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-4 px-3 py-1.5 rounded-pad border border-trace/30 text-xs font-mono text-trace hover:bg-trace/10 transition-all duration-200"
          >
            ver_certificados →
          </a>
        </div>
      </div>
    </section>
  )
}

export default Education
