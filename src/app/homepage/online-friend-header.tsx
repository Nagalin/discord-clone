'use client'

import { useOnlineUserContext } from '@/contexts/online-user-provider'
import React from 'react'

const OnlineFriendHeader = () => {
  const { getUserOnlineNum } = useOnlineUserContext()

  return (
    <div>
      {
        !!getUserOnlineNum() ? (
          <div className='text-2xl mb-3'>
            Online friends: {getUserOnlineNum()}
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