import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import DashboardPage from './page'

describe('Dashboard Page', () => {
  it('renders the dashboard title', () => {
    render(<DashboardPage />)
    const title = screen.getByRole('heading', { level: 2, name: /Dashboard/i })
    expect(title).toBeInTheDocument()
  })

  it('renders the welcome message', () => {
    render(<DashboardPage />)
    const welcome = screen.getByText(/Welcome Back/i)
    expect(welcome).toBeInTheDocument()
  })
})
