'use client'

import { render, screen, waitFor } from '@testing-library/react'
import Home from './page'
import { vi, describe, it, beforeEach, expect } from 'vitest'

// Correct fetch mocking using Vitest style
const fetchMock = vi.fn() as any
global.fetch = fetchMock

describe('Home Page', () => {
  beforeEach(() => {
    fetchMock.mockClear()
    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ status: 'ok', version: '1.0.0' }),
    } as Response)
  })

  it('renders the main heading', async () => {
    render(<Home />)
    const heading = screen.getByRole('heading', { level: 1, name: /SmartAgenda/i })
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
