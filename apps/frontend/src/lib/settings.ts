import { env } from '@/config/env'

export async function getAppTitle(): Promise<string> {
  const isServer = typeof window === 'undefined'

  // Base URL resolution
  let baseUrl = env.NEXT_PUBLIC_API_URL

  if (isServer && env.IS_DOCKER === 'true') {
    // Inside Docker container server-side, communicate with 'backend' service
    baseUrl = baseUrl.replace('localhost', 'backend').replace('127.0.0.1', 'backend')
  }

  try {
    const url = `${baseUrl}/settings?t=${Date.now()}`

    const response = await fetch(url, {
      cache: 'no-store',
      signal: AbortSignal.timeout(3000),
    })

    if (response.ok) {
      const data = await response.json()
      return data.pageTitle || 'SmartAgenda'
    }

    return 'SmartAgenda'
  } catch {
    if (env.NODE_ENV !== 'test') {
      console.log(
        `[Settings] Falling back to default title... (Backend at ${baseUrl} might be starting up)`
      )
    }
    return 'SmartAgenda'
  }
}
