'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import chatLogo from '@/assets/chat.svg'
import UserCard from '@/components/user-card'
import { UserType } from '@/dto/user'

const FriendCard = ({ user }: { user: UserType }) => {
    const router = useRouter()

    return (
        <div>
            <div className='flex justify-between items-center'>
                <UserCard user={user} />
                <Image
                    onClick={() => router.push(`/homepage/chat/${user.userId}`)}
                    className='cursor-pointer'
                    width={25}
                    height={25}
                    src={chatLogo}
                    alt='chat logo'
                />
            </div>
        </div>
    )
}

export default FriendCard