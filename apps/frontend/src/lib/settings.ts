import { env } from '@/config/env'

export interface AppSettings {
  key: string
  value: string
}

export async function getAppTitle(): Promise<string> {
  try {
    let baseUrl = env.NEXT_PUBLIC_API_URL

    // If we are on the server inside Docker, we need to reach the 'backend' service
    if (typeof window === 'undefined' && env.IS_DOCKER === 'true') {
      baseUrl = baseUrl.replace('localhost', 'backend')
    }

    const response = await fetch(`${baseUrl}/api/settings/app-title`, {
      cache: 'no-store', // Always fetch fresh data
    })

    if (!response.ok) {
      if (env.NODE_ENV !== 'test') {
        console.error('Failed to fetch app settings:', response.status)
      }
      return 'SmartAgenda'
    }

    const data: AppSettings = await response.json()
    return data.value
  } catch (error) {
    if (env.NODE_ENV !== 'test') {
      console.error('Error fetching app settings:', error)
    }
    return 'SmartAgenda'
  }
}
