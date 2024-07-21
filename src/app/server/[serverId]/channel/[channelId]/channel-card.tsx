'use client'

import React from 'react'
import { ChannelType } from '@/dto/channel'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import AddMemberToChannel from './add-member-to-channel'
import Speaker from '@/assets/speaker.svg'
import Image from 'next/image'

const ChannelCard = ({ channel }: { channel: ChannelType }) => {
  const params = useParams()
  const { serverId } = params


  return (
    <div className='flex justify-between items-center'>

      <Link
        href='/server/[serverId]/channel/[channelId]'
        as={`/server/${serverId}/channel/${channel.channelId}`}
        className='flex flex-col ms-5  hover:bg-gray-600 rounded p-3 cursor-pointer'
      >
        {channel.channelType === 'Text' ?
          '# ' :
          <Image
            height={16}
            width={16}
            src={Speaker}
            alt='Speaker logo'
          />}
        {channel.channelName}
      </Link>
      <AddMemberToChannel channelId={channel.channelId} />

    </div>
  )
}

export default ChannelCard