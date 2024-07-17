import React from 'react'
import Channels from '@/app/server/[serverId]/channel/[channelId]/channels'
import ServerHeader from '@/app/server/[serverId]/channel/[channelId]/server-header'

const ServerPage = () => {

  return (
    <div
      className='bg-discord-server-info h-[calc(100vh-3.5rem)] w-56 p-2'
    >
      <div className='align-self-center mb-16'>
        <ServerHeader />

      </div>
      <Channels />
    </div>
  )
}

export default ServerPage