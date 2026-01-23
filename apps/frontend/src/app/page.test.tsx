'use client'

import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import Home from './page'

// Mock fetch global
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ status: 'ok', version: '1.0.0' }),
  })
) as jest.Mock

describe('Home Page', () => {
  it('renders the main heading', async () => {
    render(<Home />)
    const heading = screen.getByRole('heading', { level: 1, name: /SmartAgenda/i })
    // Use expect with a semicolon before to avoid ASI issues with parentheses
    expect(heading).toBeInTheDocument()

    // Wait for effect to finish to avoid act() warning
    await waitFor(() => {
      const statusSection = screen.getByText(/Backend Connection Status/i)
      expect(statusSection).toBeInTheDocument()
    })
  })

  it('shows connection status section', async () => {
    render(<Home />)
    const statusText = screen.getByText(/Backend Connection Status/i)
    expect(statusText).toBeInTheDocument()
    await waitFor(() => {})
  })
})
