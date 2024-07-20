import React from 'react'
import Channels from '@/app/server/[serverId]/channel/[channelId]/channels'
import ServerHeader from '@/app/server/[serverId]/channel/[channelId]/server-header'
import ChannelMessageForm from '@/app/server/[serverId]/channel/[channelId]/channel-message-form'
import ChannelMember from './channel-member'

const ServerPage = () => {

  return (
    <div
      className='h-[calc(100vh-3.5rem)] flex'
    >
      <div className='bg-discord-direct-message-list align-self-center mb-16 w-56 p-2 h-screen'>
        <ServerHeader />
        <Channels />
      </div>

      <ChannelMessageForm />
      <ChannelMember/>
    </div>
  )
}

export default ServerPage