import { ChannelType } from '@/dto/channel'
import React from 'react'

type ChannelCardPropsType = {
  channel: ChannelType
}

const ChannelCard = ({ channel }: ChannelCardPropsType) => {
  return (
    <div className='ms-5 mt-3 hover:bg-gray-600 rounded p-3 cursor-pointer'>
      {channel.channelType === 'Text'? '# ': 'voice'}
      {channel.channelName}
    </div>
  )
}

export default ChannelCard