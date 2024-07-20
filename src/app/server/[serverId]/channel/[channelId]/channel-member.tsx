'use client'

import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import React from 'react'
import { getChannelMemberAction } from './_actions/get-channel-member'
import UserCard from '@/components/user-card'

const ChannelMember = () => {
  const params = useParams()
  const { channelId } = params
  const { data: channelMembers } = useQuery({
    queryKey: ['channel-member', channelId],
    queryFn: async () => getChannelMemberAction({ channelId: channelId })
  })

  console.log(channelMembers)
  return (
    <div className='bg-discord-server-info h-screen w-60 flex flex-col gap-5 pt-5'>
      {channelMembers?.data?.info?.map(curr => (
        <div className='ps-2'>
          <UserCard user={curr} />
        </div>
      ))}

    </div>
  )
}

export default ChannelMember