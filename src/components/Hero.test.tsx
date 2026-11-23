import { render, screen } from '@testing-library/react'
import Hero from './Hero'

describe('Hero', () => {
  it('muestra el nombre completo como encabezado principal y el rol profesional', () => {
    render(<Hero />)
    
    expect(screen.getByRole('heading', { name: 'Heber Yesid Daza Toloza', level: 1 })).toBeInTheDocument()
    expect(screen.getByText(/Backend Developer/i)).toBeInTheDocument()
    expect(screen.getByText(/Cúcuta, Colombia/i)).toBeInTheDocument()
  })

  it('identifica el enlace a la sección Sobre mí', () => {
    render(<Hero />)
    expect(screen.getByRole('link', { name: 'Ir a Sobre mí' })).toHaveAttribute('href', '#about')
  })

  it('renders social links', () => {
    render(<Hero />)
    
    expect(screen.getByLabelText('GitHub')).toHaveAttribute('href', 'https://github.com/HeberYesid')
    expect(screen.getByLabelText('LinkedIn')).toHaveAttribute('href', 'https://www.linkedin.com/in/heberyesid/')
  })
})
