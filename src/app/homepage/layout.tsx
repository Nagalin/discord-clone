import React, { ReactNode } from 'react'
import PrivateMessagesHistory from '@/app/homepage/private-messages-history'
import Navbar from '@/app/homepage/navbar'
import FriendProfile from '@/app/homepage/friend-profile'

type LayoutPropsType = {
  children: ReactNode
}

const Layout = ({ children }: LayoutPropsType) => {
  return (
    <div className='flex'>
      <PrivateMessagesHistory />

      <div className='flex flex-col'>
        <Navbar />

        <div className='w-[calc(100vw-42rem)]'>
          {children}
        </div>

      </div>
      <FriendProfile />
    </div>
  )
}

export default Layout