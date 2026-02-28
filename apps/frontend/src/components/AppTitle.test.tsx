import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

vi.mock('@/lib/settings', () => ({
  getAppTitle: vi.fn().mockResolvedValue('SmartAgenda'),
}))

describe('AppTitle Component', () => {
  it('renders the app title from settings', async () => {
    const { AppTitle } = await import('./AppTitle')
    const component = await AppTitle()
    render(component)

    const title = screen.getByRole('heading', { level: 1 })
    expect(title).toBeInTheDocument()
    expect(title.textContent).toBe('SmartAgenda')
  })
})
