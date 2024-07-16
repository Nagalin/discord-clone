'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getFriendsAction } from '@/app/homepage/_actions/get-friends'
import FriendCard from '@/app/homepage/friend-card'
import OnlineFriendHeader from '@/app/homepage/online-friend-header'
import { useOnlineUserContext } from '@/contexts/online-user-provider'
import { Skeleton } from '@/components/ui/skeleton'

const Homepage = () => {
  const { data: friends, isFetching } = useQuery({
    queryKey: ['online-friends'],
    queryFn: async () => await getFriendsAction({})
  })

  const { isUserOnline } = useOnlineUserContext()

  if (isFetching) return <HomepageLoading />
  if (friends?.data?.error)
    return <div className='text-2xl p-3 '>{friends.data.error}</div>

  return (
    <div className='p-3'>
      <OnlineFriendHeader />

      <div className='flex flex-col gap-3'>
        {friends?.data?.info?.map(currFriends => {

          const userOnline = isUserOnline(currFriends.userId)

          return (
            <div>
              {userOnline && <FriendCard friend={currFriends} />}
            </div>

          )
        })}
      </div>
    </div>
  )
}

const HomepageLoading = () => {
  return (
    <div className='p-3'>
      <div className='text-2xl mb-3'> Online friends: </div>

      <div className='flex items-center space-x-4'>
        <Skeleton className='h-12 w-12 rounded-full' />
        <div className='space-y-2'>
          <Skeleton className='h-4 w-[200px]' />
        </div>
      </div>
    </div>
  )

}

export default Homepage