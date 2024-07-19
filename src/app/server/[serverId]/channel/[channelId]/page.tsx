import React from 'react'
import Channels from '@/app/server/[serverId]/channel/[channelId]/channels'
import ServerHeader from '@/app/server/[serverId]/channel/[channelId]/server-header'
import ChannelMessageForm from '@/app/server/[serverId]/channel/[channelId]/channel-message-form'

const ServerPage = () => {

  return (
    <div
      className='bg-discord-server-info h-[calc(100vh-3.5rem)]  p-2 flex'
    >
      <div className='align-self-center mb-16 w-[185px]'>
        <ServerHeader />
        <Channels />
      </div>

      <ChannelMessageForm />
    </div>
  )
}

export default ServerPage