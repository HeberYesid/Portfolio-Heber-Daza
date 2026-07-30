import { Sun, Menu, X } from 'lucide-react'
import { useState } from 'react'

interface HeaderProps {
  darkMode: boolean
  toggleDarkMode: () => void
}

const Header = ({ darkMode, toggleDarkMode }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
      <nav className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <a
            href="#home"
            className="flex items-center gap-3 group"
            aria-label="Inicio"
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

          <ul className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="px-3 py-1.5 text-xs font-mono text-silkscreen-dim hover:text-trace-bright tracking-wider transition-colors duration-200 relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-3 right-3 h-px bg-trace/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="w-8 h-8 rounded-pad border border-via-ring/30 bg-substrate-raised flex items-center justify-center hover:border-via-bright/50 transition-colors"
              aria-label={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            >
              <Sun className={`w-3.5 h-3.5 transition-colors ${darkMode ? 'text-copper-dim' : 'text-copper'}`} />
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden w-8 h-8 rounded-pad border border-via-ring/30 bg-substrate-raised flex items-center justify-center hover:border-via-bright/50 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-3.5 h-3.5 text-silkscreen" /> : <Menu className="w-3.5 h-3.5 text-silkscreen" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-3 border-t border-trace/10 pt-4">
            <ul className="grid grid-cols-2 gap-1">
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
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header
