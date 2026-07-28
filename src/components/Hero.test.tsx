import { render, screen } from '@testing-library/react'
import Hero from './Hero'

describe('Hero', () => {
  it('renders name and role', () => {
    render(<Hero />)
    
    expect(screen.getByText(/Heber Yesid Daza Toloza/i)).toBeInTheDocument()
    expect(screen.getByText(/Backend Developer/i)).toBeInTheDocument()
    expect(screen.getByText(/Cúcuta, Colombia/i)).toBeInTheDocument()
  })

  it('renders social links', () => {
    render(<Hero />)
    
    expect(screen.getByLabelText('GitHub')).toHaveAttribute('href', 'https://github.com/HeberYesid')
    expect(screen.getByLabelText('LinkedIn')).toHaveAttribute('href', 'https://www.linkedin.com/in/heberyesid/')
  })
})
