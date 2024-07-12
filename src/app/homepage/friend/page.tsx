'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getFriendsAction } from '@/app/homepage/_actions/get-friends'
import { Skeleton } from '@/components/ui/skeleton'
import Alert from '@/components/alert'
import { usePusherContext } from '@/contexts/pusher-provider'
import FriendCard from '@/app/homepage/friend-card'
import FriendsHeader from '@/app/homepage/friend/friends-header'

const FriendPage = () => {
  const { data: friends, isFetching } = useQuery({
    queryKey: ['friends'],
    queryFn: async () => getFriendsAction({})
  })
  const { isUserOnline } = usePusherContext()


  if (isFetching) return <FriendLoading />
  if (friends?.data?.error) return <Alert> {friends.data.error} </Alert>

  return (
    <div>
      <FriendsHeader
        hasFriend={!!friends?.data?.info?.length}
        onlineFriendsNum={friends?.data?.info?.length as number}
      />

      <div className='flex flex-col gap-3' >

        {friends?.data?.info?.map(currFriend => {
          const online = isUserOnline(currFriend.userId)
          return (
            <div>
              <FriendCard friend={currFriend} online={online} />
            </div>
          )
        })}
      </div>

    </div>
  )
}

const FriendLoading = () => {
  return (
    <div>
      <div className='text-2xl mb-3'>Friends</div>

      <div className='flex items-center space-x-4'>
        <Skeleton className='h-12 w-12 rounded-full' />
        <div className='space-y-2'>
          <Skeleton className='h-4 w-[200px]' />
        </div>
      </div>
    </div>
  )

}
export default FriendPage