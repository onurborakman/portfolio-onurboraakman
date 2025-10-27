import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ClientTheme from '@/components/ClientTheme'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Onur Bora Akman — Portfolio',
  description: 'Frontend Engineer • Next.js • React • Three.js • MUI',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientTheme>{children}</ClientTheme>
      </body>
    </html>
  )
}
