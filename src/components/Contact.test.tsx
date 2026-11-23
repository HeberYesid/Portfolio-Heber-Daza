import { render, screen } from '@testing-library/react'
import Contact from './Contact'

describe('Contact', () => {
  it('muestra los canales de contacto con destinos utilizables', () => {
    render(<Contact />)

    expect(screen.getByRole('heading', { name: 'Contacto', level: 2 })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /heberyesiddazatoloza@gmail\.com/i }))
      .toHaveAttribute('href', 'mailto:heberyesiddazatoloza@gmail.com')
    expect(screen.getByRole('link', { name: /313 3331900/ })).toHaveAttribute('href', 'tel:+573133331900')
    expect(screen.getByRole('link', { name: /github\.com\/HeberYesid/i }))
      .toHaveAttribute('href', 'https://github.com/HeberYesid')
    expect(screen.getByRole('link', { name: /linkedin\.com\/in\/heberyesid/i }))
      .toHaveAttribute('href', 'https://www.linkedin.com/in/heberyesid/')
  })

  it('ofrece abrir el correo sin prometer un envío desde el sitio', () => {
    const { container } = render(<Contact />)

    expect(screen.getByRole('link', { name: 'Abrir aplicación de correo' }))
      .toHaveAttribute('href', 'mailto:heberyesiddazatoloza@gmail.com?subject=Contacto%20desde%20el%20portafolio')
    expect(screen.getByText(/redactes y envíes/i)).toBeInTheDocument()
    expect(container.querySelector('form')).not.toBeInTheDocument()
    expect(screen.queryByText(/mensaje enviado/i)).not.toBeInTheDocument()
  })
})
