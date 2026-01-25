import {
  renderWithServerComponent,
  APP_TITLE_FALLBACK,
} from '@/test-helpers/server-component-testing'
import { screen, render } from '@testing-library/react'
import { expect } from 'vitest'
import { AppTitleServer } from './AppTitleServer'

describe('AppTitleServer Component', () => {
  it('should display app title from API', async () => {
    const mockData = {
      key: 'app_title',
      value: 'SmartAgenda',
    }

    const { mockResponse } = await renderWithServerComponent(AppTitleServer(), mockData)

    const title = screen.getByRole('heading', { level: 1 })
    expect(title).toHaveTextContent('SmartAgenda')
    expect(title).toHaveClass('text-3xl', 'font-bold')
  })

  it('should display fallback title when API fails', async () => {
    const { mockResponse } = await renderWithServerComponent(AppTitleServer(), undefined, {
      ok: false,
      status: 500,
    })

    const title = screen.getByRole('heading', { level: 1 })
    expect(title).toHaveTextContent(APP_TITLE_FALLBACK)
  })

  it('should display fallback title when fetch throws error', async () => {
    const fetchMock = global.fetch as any
    fetchMock.mockRejectedValue(new Error('Network error'))

    const rendered = render(await AppTitleServer())

    const title = screen.getByRole('heading', { level: 1 })
    expect(title).toHaveTextContent(APP_TITLE_FALLBACK)
  })
})
