'use client'

import { Inter } from 'next/font/google'
import { usePathname } from 'next/navigation'
import { SessionProvider } from 'next-auth/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { EdgeStoreProvider } from '@/lib/edgestore'
import ServerList from '@/app/server-list'
import { Toaster } from '@/components/ui/toaster'
import AuthContextProivder from '@/contexts/auth-provider'
import Profile from '@/app/profile'
import './globals.css'
import PusherProvider from '@/contexts/pusher-provider'

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
          <AuthContextProivder>
            <EdgeStoreProvider>
              <QueryClientProvider client={queryClient}>
                <PusherProvider>


                  <div className='flex'>
                    {pathname !== '/' &&
                      <div className='relative'>
                        <ServerList />
                        <Profile />
                      </div>
                    }
                    {children}
                    <Toaster />
                  </div>

                </PusherProvider>
              </QueryClientProvider>
            </EdgeStoreProvider>
          </AuthContextProivder>
        </SessionProvider>
      </body>
    </html>
  )
}
