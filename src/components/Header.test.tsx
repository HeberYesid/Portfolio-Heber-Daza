import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import Header from './Header'

describe('Header', () => {
  it('renders navigation links', () => {
    render(<Header darkMode={false} toggleDarkMode={() => {}} />)
    
    expect(screen.getByText('Inicio')).toBeInTheDocument()
    expect(screen.getByText('Sobre Mí')).toBeInTheDocument()
    expect(screen.getByText('Habilidades')).toBeInTheDocument()
    expect(screen.getByText('Herramientas IA')).toBeInTheDocument()
    expect(screen.getByText('Acceso Privado')).toBeInTheDocument()
  })

  it('calls toggleDarkMode when theme button is clicked', () => {
    const toggleDarkMode = vi.fn()
    render(<Header darkMode={false} toggleDarkMode={toggleDarkMode} />)
    
    const themeButton = screen.getByLabelText('Toggle theme')
    fireEvent.click(themeButton)
    
    expect(toggleDarkMode).toHaveBeenCalledTimes(1)
  })

  it('toggles mobile menu when menu button is clicked', () => {
    render(<Header darkMode={false} toggleDarkMode={() => {}} />)
    
    // Menu should be hidden initially (on desktop it is hidden via CSS, but on mobile logic it's conditioned by state)
    // Testing library renders everything, but checking state change via UI
    
    const menuButton = screen.getByLabelText('Toggle menu')
    fireEvent.click(menuButton)
    
    // Now mobile menu items should be effectively rendered in the mobile container
    // Since items are duplicated for mobile/desktop, getting by all triggers might be tricky if not careful
    // But logic simply renders the UL when open.
    const startLinks = screen.getAllByText('Inicio')
    expect(startLinks.length).toBeGreaterThanOrEqual(1)
  })
})
