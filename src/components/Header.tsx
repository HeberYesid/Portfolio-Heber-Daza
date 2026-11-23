import { Menu, X } from 'lucide-react'
import { useRef, useState } from 'react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  const menuItems = [
    { label: 'Inicio', href: '#home' },
    { label: 'Sobre Mí', href: '#about' },
    { label: 'Experiencia', href: '#experience' },
    { label: 'Habilidades', href: '#skills' },
    { label: 'Proyectos', href: '#projects' },
    { label: 'Educación', href: '#education' },
    { label: 'Chat IA', href: '#chat' },
    { label: 'Idiomas', href: '#languages' },
    { label: 'Tech News', href: '#news' },
    { label: 'Contacto', href: '#contact' },
  ]

  return (
    <header className="fixed top-0 w-full z-50 bg-substrate/90 backdrop-blur-sm border-b border-trace/10">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-trace/30 to-transparent" />
      <nav
        aria-label="Principal"
        className="container mx-auto flex flex-wrap items-center justify-between gap-x-4 px-6 py-3"
        onKeyDown={(event) => {
          if (event.key !== 'Escape' || !isMenuOpen) return
          setIsMenuOpen(false)
          menuButtonRef.current?.focus()
        }}
      >
        <a
          href="#home"
          className="flex shrink-0 items-center gap-3 group"
          aria-label="Inicio del portafolio"
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="relative">
            <div className="w-9 h-9 rounded-pad bg-substrate border border-copper/50 flex items-center justify-center group-hover:border-copper group-hover:shadow-pad-hover transition-all duration-300">
              <span className="font-mono text-sm font-bold text-copper tracking-tighter">U1</span>
            </div>
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-led-green animate-led-blink" />
          </div>
          <span className="font-mono text-xs text-silkscreen-dim tracking-[0.15em] hidden sm:block">
            HEBER.DAZA
          </span>
        </a>

        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="xl:hidden min-h-9 min-w-9 rounded-pad border border-via-ring/30 bg-substrate-raised flex items-center justify-center hover:border-via-bright/50 transition-colors"
          aria-label="Menú de secciones"
          aria-expanded={isMenuOpen}
          aria-controls="section-links"
        >
          {isMenuOpen ? <X aria-hidden="true" className="w-4 h-4" /> : <Menu aria-hidden="true" className="w-4 h-4" />}
        </button>

        <ul
          id="section-links"
          className={`${isMenuOpen ? 'grid' : 'hidden'} max-h-[calc(100dvh-5rem)] w-full grid-cols-2 gap-1 overflow-y-auto border-t border-trace/10 pt-3 mt-3 xl:mt-0 xl:flex xl:w-auto xl:items-center xl:overflow-visible xl:border-0 xl:pt-0`}
        >
          {menuItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 text-xs font-mono text-silkscreen-dim hover:text-trace-bright hover:bg-trace/5 rounded-pad tracking-wider transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Header
