'use client'

import { usePusherContext } from '@/contexts/pusher-provider'
import React from 'react'

const Homepage = () => {
  const {onlineUsers } = usePusherContext()
  console.log(onlineUsers)
  return (
      <div >
        Homepage
      </div>
  )
}

export default Homepage