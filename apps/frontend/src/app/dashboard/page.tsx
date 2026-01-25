import { AppTitle } from '@/components/AppTitle'

export const metadata = {
  title: 'Dashboard - SmartAgenda',
  description: 'Your intelligent agenda, redefined.',
}

export default function DashboardPage() {
  return (
    <div className="flex-1 min-h-screen bg-black text-white p-8 pt-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="space-y-2">
          <AppTitle />
          <p className="text-gray-400 text-lg">Your intelligent agenda, redefined.</p>
        </header>

        <main className="grid gap-6">
          <div className="p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-xl shadow-2xl transition-all hover:border-white/20">
            <h3 className="text-xl font-semibold mb-2">Welcome Back</h3>
            <p className="text-gray-400 leading-relaxed">
              Start building your schedule by adding your first service or customer. Efficiency
              starts here.
            </p>
            <div className="mt-6">
              <button className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-200 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
