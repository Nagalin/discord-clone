'use client'

import React from 'react'
import { useAuth } from '@/contexts/auth-provider'
import UserCard from '@/components/user-card'

const Profile = () => {
  const auth = useAuth()

  return (
    <div className='bg-discord-profile flex items-center ps-2 absolute bottom-0 left-20 w-56 h-14'>
      <UserCard online user={auth} />
    </div>
  )
}

export default Profile