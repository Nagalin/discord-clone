'use client'

import { Inter } from 'next/font/google'
import { usePathname } from 'next/navigation'
import { SessionProvider } from 'next-auth/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { EdgeStoreProvider } from '@/lib/edgestore'
import ServerList from '@/app/server-list'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const queryClient = new QueryClient()
  const pathname = usePathname()
  return (
    <html lang='en'>
      <body className={inter.className}>
        <SessionProvider>
        <EdgeStoreProvider>
          <QueryClientProvider client={queryClient}>

            <div className='flex'>
              {pathname !== '/' && <ServerList />}
              {children}
              <Toaster/>
            </div>

          </QueryClientProvider>
        </EdgeStoreProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
