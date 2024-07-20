'use client'

import React from 'react'
import { ChannelType } from '@/dto/channel'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const ChannelCard = ({ channel }: { channel: ChannelType }) => {
  const params = useParams()
  const { serverId } = params
  return (
    <Link
      href='/server/[serverId]/channel/[channelId]'
      as={`/server/${serverId}/channel/${channel.channelId}`}
      className='flex flex-col ms-5 mt-3 hover:bg-gray-600 rounded p-3 cursor-pointer'
    >
      {channel.channelType === 'Text' ? '# ' : 'voice'}
      {channel.channelName}
    </Link>
  )
}

export default ChannelCard