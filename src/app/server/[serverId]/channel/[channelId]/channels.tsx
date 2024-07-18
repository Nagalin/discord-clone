'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { getChannelsAction } from '@/app/server/[serverId]/channel/[channelId]/_actions/get-channels'
import ChannelCard from '@/app/server/[serverId]/channel/[channelId]/channel-card'
import ChannelHeader from '@/app/server/[serverId]/channel/[channelId]/channel-header'

const Channels = () => {
  const params = useParams()
  const serverId = params.serverId
  const { data: channels, isFetching } = useQuery({
    queryKey: ['channels', serverId],
    queryFn: async () => await getChannelsAction({ serverId: serverId })
  })

  if (isFetching) return

  const textChannels = channels?.data?.info?.filter(curr => curr.channelType === 'Text')
  const voiceChannels = channels?.data?.info?.filter(curr => curr.channelType === 'Voice')

  return (
    <div>
      <div>
        <ChannelHeader> Text channel</ChannelHeader>
        {textChannels?.map(currTextChannel => (
          <ChannelCard channel={currTextChannel} />
        ))}

      </div>

      <div className='mt-16'>
        <ChannelHeader> Voice channel</ChannelHeader>

        {voiceChannels?.map(currTextChannel => (
          <ChannelCard channel={currTextChannel} />
        ))}

      </div>
    </div>
  )
}

export default Channels