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
    expect(heading).toBeInTheDocument()
    // Wait for effect to finish to avoid act() warning
    await waitFor(() => {
      expect(screen.getByText(/Backend Connection Status/i)).toBeInTheDocument()
    })
  })

  it('shows connection status section', async () => {
    render(<Home />)
    expect(screen.getByText(/Backend Connection Status/i)).toBeInTheDocument()
    await waitFor(() => {})
  })
})
