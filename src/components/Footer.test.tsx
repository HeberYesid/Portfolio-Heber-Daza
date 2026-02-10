import { render, screen } from '@testing-library/react'
import Footer from './Footer'

describe('Footer', () => {
  it('renders copyright text properly', () => {
    render(<Footer />)
    
    expect(screen.getByText(/Heber Yesid Daza Toloza/i)).toBeInTheDocument()
    expect(screen.getByText(/Todos los derechos reservados/i)).toBeInTheDocument()
  })

  it('renders with current year', () => {
    render(<Footer />)
    const currentYear = new Date().getFullYear().toString()
    expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument()
  })
})
