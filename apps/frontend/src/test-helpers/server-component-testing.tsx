import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'

// Global fetch mock setup
export function setupFetchMock(
  responseData?: any,
  options: { ok?: boolean; status?: number } = {}
) {
  const mockResponse = {
    ok: options.ok ?? true,
    status: options.status ?? 200,
    json: vi.fn().mockResolvedValue(responseData || {}),
  }

  global.fetch = vi.fn().mockResolvedValue(mockResponse)

  return {
    fetch: global.fetch as any,
    response: mockResponse,
  }
}

// Cleanup function
export function cleanupFetchMock() {
  vi.clearAllMocks()
}

// Helper to mock server component with fetch
export async function renderWithServerComponent(
  component: Promise<JSX.Element>,
  mockResponse?: any,
  options?: { ok?: boolean; status?: number }
) {
  const { response } = setupFetchMock(mockResponse, options)

  const rendered = render(await component)

  return {
    ...rendered,
    mockResponse: response,
  }
}

// Common fallback value for app settings
export const APP_TITLE_FALLBACK = 'SmartAgenda'
