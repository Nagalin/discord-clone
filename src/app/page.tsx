import React from 'react'
import DiscordSignInButton from '@/app/discord-sign-in-button'
import GoogleSignInButton from '@/app/google-sign-in-button'

const SignInPage = () => {
  return (
    <div className='flex flex-col gap-3 justify-center items-center h-screen w-screen'>
      <GoogleSignInButton />
      <DiscordSignInButton />
    </div>
  )
}

export default SignInPage