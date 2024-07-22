'use client'

import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import React from 'react'
import { getFriendProfileAction } from '@/app/homepage/chat/[userId]/_actions/get-friend-profile'
import UserCard from '@/components/user-card'

const FriendProfile = () => {
  const params = useParams()
  const friendId = params.userId
  const { data: friendInfo, isFetching } = useQuery({
    queryKey: ['friend-profile', friendId],
    queryFn: async () => await getFriendProfileAction({friendId: friendId})
  })

  if(isFetching) return

  return (
    <div className='bg-discord-profile w-[367px] h-[calc(100vh-3.5rem)] p-5'>

      <UserCard user={friendInfo?.data?.info!}/>
    </div>
  )
}

export default FriendProfile