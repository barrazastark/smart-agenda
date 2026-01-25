import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { setupFetchMock } from '@/test-helpers/server-component-testing'
import DashboardPage from './page'

describe('Dashboard Page', () => {
  beforeEach(() => {
    setupFetchMock() // Mock fetch to avoid network errors
  })

  it('renders welcome message', () => {
    render(<DashboardPage />)
    const welcome = screen.getByText(/Welcome Back/i)
    expect(welcome).toBeInTheDocument()
  })

  it('renders title element', () => {
    render(<DashboardPage />)
    const titleElement = screen.getByRole('heading', { level: 1 })
    expect(titleElement).toBeInTheDocument()
  })
})
