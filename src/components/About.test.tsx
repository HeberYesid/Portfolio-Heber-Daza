import { render, screen } from '@testing-library/react'
import About from './About'

describe('About', () => {
  it('renders section title', () => {
    render(<About />)
    expect(screen.getByText(/Sobre/i)).toBeInTheDocument()
    expect(screen.getByText(/Mí/i)).toBeInTheDocument()
  })

  it('renders skill cards', () => {
    render(<About />)
    const skills = [
      'Autodidacta',
      'Trabajo en Equipo',
      'Liderazgo',
      'Resolución de Problemas',
      'Adaptabilidad',
      'Comunicación Efectiva',
      'Pensamiento Crítico',
      'Mentalidad de Crecimiento',
    ]

    skills.forEach(skill => {
      expect(screen.getByText(skill)).toBeInTheDocument()
    })
  })
})
