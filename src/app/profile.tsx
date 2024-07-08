'use client'

import React from 'react'
import { useAuth } from '@/contexts/auth-provider'
import UserCard from '@/app/user-card'

const Profile = () => {
  const auth = useAuth()
  console.log(auth)
  return (
    <div className='bg-discord-profile flex items-center ps-2 absolute bottom-0 left-20 w-56 h-14'>
      <UserCard userId={auth.userId} username={auth.username} image={auth.image} />
    </div>
  )
}

export default Profile