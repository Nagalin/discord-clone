import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getUnreadMessagesAction } from './_actions/get-unread-message'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'

const NotificationMessage = () => {
  const { data: unreadMessages, isFetching } = useQuery({
    queryKey: ['unread-messages'],
    queryFn: async () => await getUnreadMessagesAction({})
  })
  if (isFetching) return

  if (unreadMessages?.data?.error) return

  return (
    <div className='flex flex-col gap-2'>
      {unreadMessages?.data?.info?.map(curr => (
        <div className='relative'>
            <Link href="/homepage/chat/[userId]" as={`/homepage/chat/${curr.user.userId}`}>
          <Avatar className='w-12 h-12'>
            <AvatarImage src={curr.user.image} />
            <AvatarFallback />
          </Avatar>
          </Link>

          <div 
          className='flex justify-center absolute right-0 -bottom-1 bg-red-500  rounded-full w-6 h-6'
          >

            {curr.unreadMessagesCount}
          </div>
        </div>
      ))}
    </div>
  )
}

export default NotificationMessage