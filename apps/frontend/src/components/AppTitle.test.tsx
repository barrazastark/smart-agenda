import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { AppTitle } from './AppTitle'

describe('AppTitle Component', () => {
  beforeEach(() => {
    vi.mock('./AppTitleServer', () => ({
      AppTitleServer: () => <h1 className="text-3xl font-bold">SmartAgenda</h1>,
    }))
  })

  it('renders the app title', () => {
    render(<AppTitle />)
    const title = screen.getByRole('heading', { level: 1 })
    expect(title).toBeInTheDocument()
    expect(title.textContent).toBe('SmartAgenda')
  })
})
