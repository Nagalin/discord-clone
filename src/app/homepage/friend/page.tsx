'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getFriendsAction } from '@/app/homepage/friend/_actions/get-friends'
import UserCard from '@/components/user-card'
import { Skeleton } from '@/components/ui/skeleton'
import Alert from '@/components/alert'

const FriendPage = () => {
  const { data: friends, isFetching } = useQuery({
    queryKey: ['friends'],
    queryFn: async () => getFriendsAction({})
  })

  if (isFetching) return <FriendLoading />
  if (friends?.data?.error) return <Alert> {friends.data.error} </Alert>

  return (
    <div>
      <div className='text-2xl mb-3'>Friends</div>

      {!friends?.data?.info?.length && <div>No friends ......</div>}

      {friends?.data?.info?.map(currFriend => (
        <UserCard
          user={currFriend}
        />
      ))}

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