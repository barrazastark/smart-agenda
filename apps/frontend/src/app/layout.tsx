import type { Metadata } from 'next'
import './globals.css'
import { getAppTitle } from '@/lib/settings'
import { Toaster } from '@/components/ui/toaster'

export async function generateMetadata(): Promise<Metadata> {
  const title = await getAppTitle()
  return {
    title: {
      default: title,
      template: `%s - ${title}`,
    },
    description: `${title} - Your intelligent scheduling solution`,
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-black text-white antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  )
}
