'use client'

import { useOnlineUserContext } from '@/contexts/online-user-provider'
import React from 'react'

const OnlineFriendHeader = () => {
  const { onlineFriendNum } = useOnlineUserContext()
  return (
    <div>
      {
        !!onlineFriendNum ? (
          <div className='text-2xl mb-3'>
            Online friends: {onlineFriendNum}
          </div>
        ) : (
          <div className='text-2xl mb-3'>
            No one is online ......
          </div>
        )}
    </div>
  )
}

export default OnlineFriendHeader