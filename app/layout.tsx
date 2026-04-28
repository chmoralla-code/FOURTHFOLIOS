import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Architectural Portfolio',
  description: 'Showcase of architectural designs and projects',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white text-black">{children}</body>
    </html>
  )
}
