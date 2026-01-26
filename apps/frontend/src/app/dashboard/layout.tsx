import { Sidebar } from '@/components/layout/sidebar'
import { getAppTitle } from '@/lib/settings'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const title = await getAppTitle()

  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
        <Sidebar title={title} />
      </div>
      <main className="md:pl-72 h-full bg-slate-50">{children}</main>
    </div>
  )
}
