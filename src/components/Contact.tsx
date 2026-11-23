import { Mail, Phone, MapPin, Send, Github, Linkedin } from 'lucide-react'

const contactEmail = 'heberyesiddazatoloza@gmail.com'

const Contact = () => {
  const contactPads = [
    { id: 'P1', icon: Mail, label: 'EMAIL', value: contactEmail, href: `mailto:${contactEmail}` },
    { id: 'P2', icon: Phone, label: 'TEL', value: '(+57) 313 3331900', href: 'tel:+573133331900' },
    { id: 'P3', icon: MapPin, label: 'LOC', value: 'Cúcuta, Colombia', href: null },
    { id: 'P4', icon: Github, label: 'GH', value: 'github.com/HeberYesid', href: 'https://github.com/HeberYesid' },
    { id: 'P5', icon: Linkedin, label: 'LI', value: 'linkedin.com/in/heberyesid', href: 'https://www.linkedin.com/in/heberyesid/' },
  ]

  return (
    <section id="contact" className="container mx-auto px-6 max-w-4xl">
      <span className="component-label text-trace mb-3 block">CONNECTOR · J1 — CONTACT</span>
      <h2 className="text-3xl lg:text-4xl font-bold text-silkscreen tracking-tight mb-12">
        Contacto
      </h2>

      <div className="grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2 space-y-2">
          {contactPads.map((pad) => (
            <div key={pad.id}>
              {pad.href ? (
                <a
                  href={pad.href}
                  target={pad.href.startsWith('http') ? '_blank' : undefined}
                  rel={pad.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="chip-body p-3 flex items-center gap-3 group hover:border-trace/40 transition-all duration-200 block"
                >
                  <span className="font-mono text-[0.625rem] text-copper tracking-[0.15em] w-6">{pad.id}</span>
                  <div className="w-8 h-8 rounded-pad bg-trace/5 border border-trace/20 flex items-center justify-center flex-shrink-0 group-hover:border-trace/40 transition-colors">
                    <pad.icon className="w-3.5 h-3.5 text-trace" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-[0.5rem] text-silkscreen-dim tracking-[0.2em] mb-0.5">{pad.label}</p>
                    <p className="text-xs text-silkscreen break-words">{pad.value}</p>
                  </div>
                </a>
              ) : (
                <div className="chip-body p-3 flex items-center gap-3">
                  <span className="font-mono text-[0.625rem] text-copper tracking-[0.15em] w-6">{pad.id}</span>
                  <div className="w-8 h-8 rounded-pad bg-trace/5 border border-trace/20 flex items-center justify-center flex-shrink-0">
                    <pad.icon className="w-3.5 h-3.5 text-trace" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-[0.5rem] text-silkscreen-dim tracking-[0.2em] mb-0.5">{pad.label}</p>
                    <p className="text-xs text-silkscreen">{pad.value}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="lg:col-span-3">
          <div className="chip-body p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-[0.625rem] text-copper tracking-[0.15em]">MSG</span>
              <h3 className="text-lg font-bold text-silkscreen tracking-tight">Escríbeme por correo</h3>
            </div>

            <p className="text-sm text-silkscreen-dim leading-relaxed mb-5">
              El enlace abre tu aplicación de correo para que redactes y envíes el mensaje. Si no tienes una configurada, puedes copiar la dirección o usar LinkedIn.
            </p>
            <a
              href={`mailto:${contactEmail}?subject=Contacto%20desde%20el%20portafolio`}
              className="w-full px-4 py-3 bg-trace/10 border border-trace/30 text-trace-bright font-mono text-xs text-center tracking-wider rounded-pad hover:border-trace/50 transition-colors flex items-center justify-center gap-2"
            >
              <Send aria-hidden="true" className="w-3.5 h-3.5 shrink-0" />
              Abrir aplicación de correo
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
