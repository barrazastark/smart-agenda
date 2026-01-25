import { render, screen } from '@testing-library/react'
import { AppTitleServer } from './AppTitleServer'

// Mock fetch for server component
global.fetch = jest.fn()

describe('AppTitleServer Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should display app title from API', async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({
        key: 'app_title',
        value: 'SmartAgenda',
      }),
    }

    ;(global.fetch as jest.Mock).mockResolvedValue(mockResponse)

    const { container } = render(await AppTitleServer())

    const title = screen.getByRole('heading', { level: 1 })
    expect(title).toHaveTextContent('SmartAgenda')
    expect(title).toHaveClass('text-3xl', 'font-bold')
  })

  it('should display fallback title when API fails', async () => {
    const mockResponse = {
      ok: false,
      status: 500,
    }

    ;(global.fetch as jest.Mock).mockResolvedValue(mockResponse)

    const { container } = render(await AppTitleServer())

    const title = screen.getByRole('heading', { level: 1 })
    expect(title).toHaveTextContent('SmartAgenda') // Fallback title
  })

  it('should display fallback title when fetch throws error', async () => {
    ;(global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'))

    const { container } = render(await AppTitleServer())

    const title = screen.getByRole('heading', { level: 1 })
    expect(title).toHaveTextContent('SmartAgenda') // Fallback title
  })
})
