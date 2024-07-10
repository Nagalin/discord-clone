import React from 'react'
import Channels from '@/app/server/[serverId]/channel/[channelId]/channels'
import ServerHeader from '@/app/server/[serverId]/channel/[channelId]/server-header'

const ServerPage = () => {
   
  return (
    <div>
      <ServerHeader/>
      <Channels/>
    </div>
  )
}

export default ServerPage