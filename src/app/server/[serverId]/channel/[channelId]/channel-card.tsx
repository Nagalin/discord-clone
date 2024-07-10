import { ChannelType } from '@/dto/channel'
import React from 'react'

type ChannelCardPropsType = {
  channel: ChannelType
}

const ChannelCard = ({ channel }: ChannelCardPropsType) => {
  return (
    <div>{channel.channelName}</div>
  )
}

export default ChannelCard