import { getAppTitle } from '@/lib/settings'

export async function AppTitleServer() {
  const title = await getAppTitle()

  return <h1 className="text-3xl font-bold">{title}</h1>
}
