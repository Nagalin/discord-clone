'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getFriendsAction } from '@/app/homepage/friend/_actions/get-friends'
import UserCard from '@/components/user-card'
import { Skeleton } from '@/components/ui/skeleton'
import Alert from '@/components/alert'
import { usePusherContext } from '@/contexts/pusher-provider'

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

      {friends?.data?.info?.length ?
        <div className='text-2xl mb-3'>
          All friends: {friends?.data?.info?.length}
        </div> :

        <div className='text-2xl mb-3'>
          No friends ......
        </div>
      }

      <div className='flex flex-col gap-3' >
        {friends?.data?.info?.map(currFriend => {
          const online = isUserOnline(currFriend.userId)

          return (
            <UserCard
              online={online}
              key={currFriend.userId}
              user={currFriend}
            />

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