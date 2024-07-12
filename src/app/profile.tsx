'use client'

import React from 'react'
import { useAuthContext } from '@/contexts/auth-provider'
import UserCard from '@/components/user-card'

const Profile = () => {
  const user = useAuthContext()

  return (
    <div className='bg-discord-profile flex items-center ps-2 absolute bottom-0 left-20 w-56 h-14'>
      <UserCard user={user} />
    </div>
  )
}

export default Profile