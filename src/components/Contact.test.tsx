import { render, screen } from '@testing-library/react'
import Contact from './Contact'

describe('Contact', () => {
  it('renders contact section title', () => {
    render(<Contact />)
    expect(screen.getByText(/Trabajemos/i)).toBeInTheDocument()
    expect(screen.getByText(/Juntos/i)).toBeInTheDocument()
  })

  it('renders contact methods', () => {
    render(<Contact />)
    
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('heberyesiddazatoloza@gmail.com')).toBeInTheDocument()
    
    expect(screen.getByText('Teléfono')).toBeInTheDocument()
    expect(screen.getByText('LinkedIn')).toBeInTheDocument()
    expect(screen.getByText('GitHub')).toBeInTheDocument()
  })

  it('renders "Enviar Mensaje" button', () => {
    render(<Contact />)
    const button = screen.getByText('Enviar Mensaje')
    expect(button).toBeInTheDocument()
    expect(button.closest('a')).toHaveAttribute('href', 'mailto:heberyesiddazatoloza@gmail.com')
  })
})
