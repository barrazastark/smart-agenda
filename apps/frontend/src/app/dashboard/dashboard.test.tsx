import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { setupFetchMock } from '@/test-helpers/server-component-testing'
import DashboardPage from './page'

describe('Dashboard Page', () => {
  beforeEach(() => {
    setupFetchMock() // Mock fetch to avoid network errors
  })

  it('renders dashboard title', () => {
    render(<DashboardPage />)
    const title = screen.getByRole('heading', { level: 1 })
    expect(title).toBeInTheDocument()
  })

  it('renders welcome message', () => {
    render(<DashboardPage />)
    const welcome = screen.getByText(/Welcome Back/i)
    expect(welcome).toBeInTheDocument()
  })
})
