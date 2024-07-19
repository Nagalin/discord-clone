import React, { ReactNode } from 'react'
import PrivateChatsHistory from '@/app/homepage/private-chats-history'
import Navbar from '@/app/homepage/navbar'
import FriendProfile from '@/app/homepage/friend-profile'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='flex'>
      <PrivateChatsHistory />

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