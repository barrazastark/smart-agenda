interface AppSettings {
  key: string
  value: string
}

async function getAppSettings(): Promise<AppSettings | null> {
  try {
    // Skip fetch in test environment
    if (process.env.NODE_ENV === 'test') {
      return null
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4100'
    const response = await fetch(`${baseUrl}/api/settings/app-title`)

    if (!response.ok) {
      console.error('Failed to fetch app settings:', response.status)
      return null
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching app settings:', error)
    return null
  }
}

export async function AppTitleServer() {
  const appSettings = await getAppSettings()

  if (!appSettings) {
    return <h1 className="text-3xl font-bold">SmartAgenda</h1>
  }

  return <h1 className="text-3xl font-bold">{appSettings.value}</h1>
}
