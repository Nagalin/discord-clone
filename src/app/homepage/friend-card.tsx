'use client'

import UserCard from '@/components/user-card'
import { UserType } from '@/dto/user'
import Image from 'next/image'
import React from 'react'
import chatLogo from '@/assets/chat.svg'
import { useRouter } from 'next/navigation'

type FriendCardPropsType = {
    friend: UserType
}

const FriendCard = ({ friend }: FriendCardPropsType) => {
    const router = useRouter()

    const handleGoToChat = async (recipientId: string) => {
        router.push(`/homepage/chat/${recipientId}`)
    }

    return (
        <div>
            <div  className='flex justify-between items-center'>
                <UserCard user={friend}/>
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