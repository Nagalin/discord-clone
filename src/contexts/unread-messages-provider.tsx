import React, { createContext, ReactNode, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { useMessageNotiStore } from '@/app/_zustand/message-noti-store'
import { pusherClient } from '@/lib/pusher'
import { UserType } from '@/dto/user'

type UnreadMessagesProviderPropsType = {
  children: ReactNode
}

type PayloadType = {
  sender: UserType
}

const UnreadMessageContext = createContext<undefined | {}>(undefined)

const UnreadMessagesProvider = ({ children }: UnreadMessagesProviderPropsType) => {
  const { data: session } = useSession()
  const incrementUnreadMessageCount = useMessageNotiStore(state => state.incrementUnreadMessageCount)
  const pathname = usePathname()

  useEffect(() => {
    if (!session) return

    pusherClient.subscribe(`notification-${session.user.userId}`)

    pusherClient.bind('noti-message', (payload: PayloadType) => {
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