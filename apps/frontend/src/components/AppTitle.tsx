import { useState, useEffect } from 'react'

interface AppSettings {
  key: string
  value: string
}

export function AppTitle() {
  const [title, setTitle] = useState<string>('SmartAgenda')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTitle = async () => {
      try {
        const response = await fetch('/api/settings/app-title')
        if (!response.ok) {
          throw new Error('Failed to fetch app title')
        }
        const data: AppSettings = await response.json()
        setTitle(data.value)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchTitle()
  }, [])

  if (loading) return <h1 className="text-3xl font-bold">Loading...</h1>
  if (error) return <h1 className="text-3xl font-bold text-red-500">Error: {error}</h1>

  return <h1 className="text-3xl font-bold">{title}</h1>
}
