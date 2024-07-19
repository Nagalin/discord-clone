'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { getUnreadMessagesAction } from '@/app/_actions/get-unread-message'
import { useMessageNotiStore } from '@/app/_zustand/message-noti-store'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useToast }  from '@/components/ui/use-toast'

const NotificationMessage = () => {
  const unreadMessage = useMessageNotiStore(state => state.unreadMessages)
  const setUnreadMessage = useMessageNotiStore(state => state.setUnreadMessage)
  const {toast} = useToast()

  const { data: unreadMessages, isFetching } = useQuery({
    queryKey: ['unread-messages'],
    queryFn: async () => {
      const res = await getUnreadMessagesAction({})
      setUnreadMessage(res?.data?.info!)
      return res
    }
  })

  useEffect(() => {
    if (unreadMessages?.data?.error) {
      toast({
        title: 'Oops ....',
        description: unreadMessages.data.error,
        variant: 'destructive'
      })
    }
  }, [unreadMessages, toast])
  
  return (
    <div className='flex flex-col gap-2'>
      {unreadMessage?.map(curr => (
        <div className='relative'>
          <Link href='/homepage/chat/[userId]' as={`/homepage/chat/${curr.user.userId}`}>
            <Avatar className='w-12 h-12'>
              <AvatarImage src={curr.user.image} />
              <AvatarFallback />
            </Avatar>
          </Link>

          <div
            className='flex justify-center absolute right-0 -bottom-1 
            bg-red-500  rounded-full w-6 h-6'
          >

            {curr.unreadMessagesCount}
          </div>
        </div>
      ))}
    </div>
  )
}

export default NotificationMessage