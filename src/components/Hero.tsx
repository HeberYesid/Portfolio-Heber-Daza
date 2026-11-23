import { Github, Linkedin, ChevronDown } from 'lucide-react'

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 pb-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,200,200,0.03)_0%,transparent_70%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-trace/20 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">

          <div className="flex flex-col items-center text-center mb-7 lg:mb-8">
            <div className="mb-7 lg:mb-8 relative">
              <div className="w-28 h-28 lg:w-36 lg:h-36 rounded-pad bg-substrate border-2 border-copper/40 shadow-component flex items-center justify-center relative group">
                <div className="absolute inset-0 rounded-pad bg-copper/5 group-hover:bg-copper/10 transition-colors duration-500" />
                <span className="font-mono text-4xl lg:text-5xl font-bold text-copper tracking-tighter relative z-10">
                  U1
                </span>
                <div className="absolute top-0.5 right-0.5 w-2.5 h-2.5 rounded-full bg-led-green animate-led-blink" />
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-max px-2 py-1 bg-substrate border border-trace/20 rounded-pad">
                  <span className="block font-mono text-[0.5rem] leading-none text-silkscreen-dim tracking-[0.2em]">STATUS: ACTIVE</span>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <span className="component-label text-trace">PROCESSOR · U1</span>
            </div>

            <h1 className="text-display text-silkscreen text-balance mb-3 max-w-4xl">
              {'Heber Yesid '}
              <span className="block text-trace-bright">Daza Toloza</span>
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mb-4">
              <span className="font-mono text-sm text-silkscreen-dim tracking-wider">Cúcuta, Colombia</span>
              <span className="w-1 h-1 rounded-full bg-via-ring/50" />
              <span className="font-mono text-sm text-trace tracking-wider">BACKEND DEVELOPER</span>
            </div>

            <p className="text-base lg:text-lg text-silkscreen-dim max-w-2xl leading-relaxed font-light">
              Ingeniero de Sistemas en formación. Especializado en sistemas backend robustos con
              Java (Spring Boot) y Python (Django/FastAPI). Clean Architecture, TDD, y flujos de
              desarrollo asistidos por IA — Specification-Driven Development.
            </p>
          </div>

          <div className="flex justify-center gap-3 mb-8 lg:mb-10">
            <a
              href="https://github.com/HeberYesid"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-pad border border-via-ring/30 bg-substrate-raised flex items-center justify-center hover:border-pad hover:shadow-pad-hover transition-all duration-300 group"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4 text-silkscreen-dim group-hover:text-pad transition-colors" />
            </a>
            <a
              href="https://www.linkedin.com/in/heberyesid/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-pad border border-via-ring/30 bg-substrate-raised flex items-center justify-center hover:border-pad hover:shadow-pad-hover transition-all duration-300 group"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4 text-silkscreen-dim group-hover:text-pad transition-colors" />
            </a>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a
              href="#projects"
              className="group px-6 py-3 bg-trace/10 border border-trace/30 text-trace-bright font-mono text-sm tracking-wider rounded-pad hover:bg-trace/15 hover:border-trace/50 hover:shadow-trace-glow transition-all duration-300 text-center"
            >
              <span className="mr-2 text-trace-dim">{'>'}</span>
              ver_proyectos
            </a>
            <a
              href="#contact"
              className="group px-6 py-3 border border-copper/30 text-copper font-mono text-sm tracking-wider rounded-pad hover:bg-copper/5 hover:border-copper/50 hover:shadow-pad-hover transition-all duration-300 text-center"
            >
              <span className="mr-2 text-copper-dim">{'>>'}</span>
              contactar
            </a>
          </div>

          <a href="#about" aria-label="Ir a Sobre mí" className="flex items-center justify-center mx-auto w-9 h-9 mt-8 lg:mt-12">
            <ChevronDown aria-hidden="true" className="w-5 h-5 text-trace animate-signal" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
