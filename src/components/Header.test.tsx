import { fireEvent, render, screen, within } from '@testing-library/react'
import Header from './Header'

describe('Header', () => {
  it('enlaza a los destinos públicos y no ofrece un tema claro sin implementar', () => {
    render(<Header />)
    const nav = within(screen.getByRole('navigation'))

    expect(nav.getByRole('link', { name: 'Proyectos' })).toHaveAttribute('href', '#projects')
    expect(nav.getByRole('link', { name: 'Chat IA' })).toHaveAttribute('href', '#chat')
    expect(nav.getByRole('link', { name: 'Contacto' })).toHaveAttribute('href', '#contact')
    expect(nav.queryByRole('button', { name: /cambiar a modo/i })).not.toBeInTheDocument()
  })

  it('anuncia el estado del menú móvil y lo cierra al elegir una sección', () => {
    render(<Header />)
    const menu = screen.getByRole('button', { name: 'Menú de secciones' })
    expect(menu).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByRole('list')).toHaveAttribute('id', menu.getAttribute('aria-controls'))

    fireEvent.click(menu)
    expect(menu).toHaveAttribute('aria-expanded', 'true')
    fireEvent.click(screen.getByRole('link', { name: 'Proyectos' }))
    expect(menu).toHaveAttribute('aria-expanded', 'false')
  })

  it('cierra el menú con Escape y devuelve el foco al botón', () => {
    render(<Header />)
    const menu = screen.getByRole('button', { name: 'Menú de secciones' })
    fireEvent.click(menu)
    const link = screen.getByRole('link', { name: 'Proyectos' })
    link.focus()
    fireEvent.keyDown(link, { key: 'Escape' })

    expect(menu).toHaveAttribute('aria-expanded', 'false')
    expect(menu).toHaveFocus()
  })
})
