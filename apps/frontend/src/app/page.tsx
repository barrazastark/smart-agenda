'use client'

import { useState, useEffect, useCallback } from 'react'

interface ApiResponse {
  message?: string
  status?: string
  version?: string
  timestamp?: string
}

export default function Home() {
  const [apiData, setApiData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4100'

  const fetchApiData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_URL}/api`)
      if (!response.ok) {
        throw new Error('Failed to fetch API data')
      }
      const data = await response.json()
      setApiData(data)
      console.log('[Frontend] API response:', data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      console.error('[Frontend] Error fetching API:', err)
    } finally {
      setLoading(false)
    }
  }, [API_URL])

  useEffect(() => {
    fetchApiData()
  }, [fetchApiData])

  return (
    <main className="main">
      <div className="hero">
        <h1 className="title">SmartAgenda</h1>
        <p className="subtitle">
          Your intelligent scheduling solution powered by Next.js and Express
        </p>
      </div>

      <div className="card" style={{ width: '100%', maxWidth: '500px' }}>
        <h2>Backend Connection Status</h2>
        <div className="status">
          <div className={`status-indicator ${error ? 'error' : ''}`}></div>
          <span>{error ? 'Disconnected' : 'Connected'}</span>
        </div>

        {apiData && (
          <div className="api-response">
            <pre>{JSON.stringify(apiData, null, 2)}</pre>
          </div>
        )}

        {error && (
          <div className="api-response" style={{ color: '#ef4444' }}>
            Error: {error}
          </div>
        )}

        <div className="flex gap-4 mt-4">
          <button className="button" onClick={fetchApiData} disabled={loading}>
            {loading ? 'Loading...' : 'Refresh'}
          </button>

          <a
            href="/dashboard"
            className="button"
            style={{
              backgroundColor: '#111827',
              textDecoration: 'none',
              display: 'inline-block',
              textAlign: 'center',
            }}
          >
            Go to Dashboard
          </a>
        </div>
      </div>

      <div className="card" style={{ width: '100%', maxWidth: '500px', marginTop: '1rem' }}>
        <h3>🚀 Getting Started</h3>
        <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem', color: 'var(--text-muted)' }}>
          <li>
            Frontend: <code>http://localhost:3100</code>
          </li>
          <li>
            Backend API: <code>http://localhost:4100/api</code>
          </li>
          <li>
            Health Check: <code>http://localhost:4100/health</code>
          </li>
        </ul>
      </div>
    </main>
  )
}
