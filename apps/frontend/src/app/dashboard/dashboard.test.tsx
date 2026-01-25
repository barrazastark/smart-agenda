import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import DashboardPage from './page'

describe('Dashboard Page', () => {
  beforeEach(() => {
    vi.mock('@/components/AppTitle', () => ({
      AppTitle: () => <h1 className="text-3xl font-bold">SmartAgenda</h1>,
    }))
  })

  it('renders welcome message', () => {
    render(<DashboardPage />)
    const welcome = screen.getByText(/Welcome Back/i)
    expect(welcome).toBeInTheDocument()
  })
})
