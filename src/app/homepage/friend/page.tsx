'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getFriendsAction } from '@/app/homepage/_actions/get-friends'
import { Skeleton } from '@/components/ui/skeleton'
import Alert from '@/components/alert'
import FriendCard from '@/app/homepage/friend-card'
import FriendsHeader from '@/app/homepage/friend/friends-header'

const FriendPage = () => {
  const { data: friends, isFetching } = useQuery({
    queryKey: ['all-friends'],
    queryFn: async () => getFriendsAction({})
  })

  if (isFetching) return <FriendLoading />
  if (friends?.data?.error)
    return (
      <div>
        <Alert> {friends.data.error} </Alert>
      </div>
    )

  return (
    <div className='p-3'>
      <FriendsHeader
        hasFriend={!!friends?.data?.info?.length}
        friendsNum={friends?.data?.info?.length as number}
      />

      <div className='flex flex-col gap-3' >

        {friends?.data?.info?.map(currFriend => {
          return (
            <div key={currFriend.userId}>
              <FriendCard friend={currFriend} />
            </div>
          )
        })}
      </div>

    </div>
  )
}

const FriendLoading = () => {
  return (
    <div className='p-3'>
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