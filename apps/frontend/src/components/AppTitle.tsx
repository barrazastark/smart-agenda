import { getAppTitle } from '@/lib/settings'

export async function AppTitle() {
  const title = await getAppTitle()

  return (
    <h1 data-testid="dashboard-title" className="text-3xl font-bold">
      {title}
    </h1>
  )
}
