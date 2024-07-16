import { useMessageNotiStore } from '@/app/_zustand/message-noti-store'
import { pusherClient } from '@/lib/pusher'
import { useSession } from 'next-auth/react'
import { useParams, usePathname } from 'next/navigation'
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'

type UnreadMessagesProviderPropsType = {
  children: ReactNode
}

type UnreadMessageContextType = {

}

const UnreadMessageContext = createContext<UnreadMessageContextType | undefined>(undefined)

export const useUnreadMessageContext = () => {
  const context = useContext(UnreadMessageContext)
  if (!context) throw new Error('Context is not initialized')

  return context
}
const UnreadMessagesProvider = ({ children }: UnreadMessagesProviderPropsType) => {
  const { data: session } = useSession()
  const incrementUnreadMessageCount = useMessageNotiStore((state) => state.incrementUnreadMessageCount)
  const pathname = usePathname()

  useEffect(() => {
    if (!session) return

    pusherClient.subscribe(`notification-${session.user.userId}`)

    pusherClient.bind('noti-message', (payload: any) => {
      if (pathname.includes('chat') && pathname.includes(payload.sender.userId)) return
      incrementUnreadMessageCount(payload.sender)
    })

    return () => {
      pusherClient.unsubscribe(`notification-${session.user.userId}`)
      pusherClient.unbind('noti-message')
    }

  }, [pathname])


  return (
    <UnreadMessageContext.Provider value={{}}>
      {children}
    </UnreadMessageContext.Provider>
  )
}

export default UnreadMessagesProvider