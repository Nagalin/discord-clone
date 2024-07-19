'use client'

import React from 'react'
import Image from 'next/image'
import UserCard from '@/components/user-card'
import { UserType } from '@/dto/user'
import chatLogo from '@/assets/chat.svg'
import { useRouter } from 'next/navigation'

const FriendCard = ({ friend }: { friend: UserType }) => {
    const router = useRouter()

    const handleGoToChat = async (recipientId: string) => {
        router.push(`/homepage/chat/${recipientId}`)
    }

    return (
        <div>
            <div className='flex justify-between items-center'>
                <UserCard user={friend} />
                <Image
                    onClick={() => handleGoToChat(friend.userId)}
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