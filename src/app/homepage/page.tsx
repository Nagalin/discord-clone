'use client'

import { usePusherContext } from '@/contexts/pusher-provider'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getFriendsAction } from '@/app/homepage/_actions/get-friends'
import UserCard from '@/components/user-card'
import FriendCard from './_components/friend-card'
import OnlineFriendHeader from './online-friend-header'

const Homepage = () => {
  const { data: friends } = useQuery({
    queryKey: ['online-friends'],
    queryFn: async () => await getFriendsAction({})
  })

  const { onlineUsers, isUserOnline } = usePusherContext()
  return (
    <div>
      <OnlineFriendHeader
        isFriendsOnline={!!(onlineUsers.length - 1)}
        onlineFriendsNum={onlineUsers.length - 1}
      />

      <div className='flex flex-col gap-3'>
        {friends?.data?.info?.map(currFriends => {

          const userOnline = isUserOnline(currFriends.userId)

          return (
            <div>
              {userOnline && <FriendCard friend={currFriends} online />}
            </div>

          )
        })}
      </div>
    </div>
  )
}


export default Homepage