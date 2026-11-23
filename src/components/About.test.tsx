import { render, screen } from '@testing-library/react'
import About from './About'

describe('About', () => {
  it('muestra el título de la sección', () => {
    render(<About />)
    expect(screen.getByRole('heading', { name: 'Sobre el desarrollador', level: 2 })).toBeInTheDocument()
  })

  it('muestra las cuatro áreas del perfil técnico', () => {
    render(<About />)
    const skills = [
      'Backend Systems',
      'Clean Architecture',
      'Quality Assurance',
      'SDD Workflow',
    ]

    skills.forEach(skill => {
      expect(screen.getByText(skill)).toBeInTheDocument()
    })
  })
})
