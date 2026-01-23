import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SmartAgenda',
  description: 'SmartAgenda - Your intelligent scheduling solution',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
