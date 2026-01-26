export interface AppSettings {
  key: string
  value: string
}

export async function getAppTitle(): Promise<string> {
  try {
    let baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4100'

    // If we are on the server inside Docker, we need to reach the 'backend' service
    if (typeof window === 'undefined' && process.env.IS_DOCKER === 'true') {
      baseUrl = baseUrl.replace('localhost', 'backend')
    }

    const response = await fetch(`${baseUrl}/api/settings/app-title`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      console.error('Failed to fetch app settings:', response.status)
      return 'SmartAgenda'
    }

    const data: AppSettings = await response.json()
    return data.value
  } catch (error) {
    console.error('Error fetching app settings:', error)
    return 'SmartAgenda'
  }
}
