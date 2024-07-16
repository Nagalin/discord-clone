'use client'

import { Inter } from 'next/font/google'
import { usePathname } from 'next/navigation'
import { SessionProvider } from 'next-auth/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { EdgeStoreProvider } from '@/lib/edgestore'
import ServerList from '@/app/server-list'
import { Toaster } from '@/components/ui/toaster'
import AuthProvider from '@/contexts/auth-provider'
import OnlineUserProvider from '@/contexts/online-user-provider'
import Profile from '@/app/profile'
import DiscordLogo from '@/app/discord-logo'
import NotificationMessage from '@/app/notification-message'
import UnreadMessagesProvider from '@/contexts/unread-messages-provider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  return (
    <html lang='en'>
      <body className={inter.className}>

        <SessionProvider>
          <AuthProvider>
            <EdgeStoreProvider>
              <QueryClientProvider client={queryClient}>
                <UnreadMessagesProvider>
                  <OnlineUserProvider>

                    <div className='flex'>
                      {pathname !== '/' &&
                        <div
                          className='
                          bg-discord-server-list relative h-screen w-20 
                          flex flex-col  gap-2 items-center pt-2'
                        >
                          <DiscordLogo />
                          <NotificationMessage />
                          <ServerList />
                          <Profile />
                        </div>
                      }
                      {children}
                      <Toaster />
                    </div>

                  </OnlineUserProvider>
                </UnreadMessagesProvider>
              </QueryClientProvider>
            </EdgeStoreProvider>
          </AuthProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
