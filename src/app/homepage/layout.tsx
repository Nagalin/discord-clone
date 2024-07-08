import React, { ReactNode } from 'react'
import PrivateMessages from '@/app/homepage/private-messages'
import Navbar from '@/app/homepage/navbar'
import FriendProfile from './friend-profile'

type LayoutPropsType = {
  children: ReactNode
}

const Layout = ({ children }: LayoutPropsType) => {
  return (
    <div className='flex'>
      <PrivateMessages />

      <div className="flex flex-col">
        <Navbar />

        <div className='w-[calc(100vw-42rem)] p-3'>
          {children}
        </div>

      </div>
      <FriendProfile />
    </div>
  )
}

export default Layout