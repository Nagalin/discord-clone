import { pusherClient } from '@/lib/pusher'
import { useSession } from 'next-auth/react'
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
  const [isSubscribed, setIsSubscribed] = useState(false)

  
  return (
    <UnreadMessageContext.Provider value={{}}>
      {children}
    </UnreadMessageContext.Provider>
  )
}

export default UnreadMessagesProvider