'use client'

import { usePusherContext } from '@/contexts/pusher-provider'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getFriendsAction } from './friend/_actions/get-friends'
import UserCard from '@/components/user-card'

const Homepage = () => {
  const { data: friends } = useQuery({
    queryKey: ['online-friends'],
    queryFn: async () => await getFriendsAction({})
  })

  const { onlineUsers, isUserOnline } = usePusherContext()
  return (
    <div>
      {onlineUsers.length > 1 ? (
        <div className='text-2xl mb-3'>
          Online friends: {onlineUsers.length - 1}
        </div>
      ) : (
        <div className='text-2xl mb-3'>
          No one is online ......
        </div>
      )}

      <div className='flex flex-col gap-3'>
        {friends?.data?.info?.map(currFriend => {
          const isOnline = isUserOnline(currFriend.userId)

          return (
            isOnline && (
              <UserCard
                online
                key={currFriend.userId}
                user={currFriend}
              />
            )
          )
        })}
      </div>
    </div>
  )
}


export default Homepage