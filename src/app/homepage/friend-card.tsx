
import UserCard from '@/components/user-card'
import { UserType } from '@/dto/user'
import Image from 'next/image'
import React from 'react'
import chatLogo from '@/assets/chat.svg'
import { useQueryClient } from '@tanstack/react-query'
import { getChatIdActions } from '@/app/homepage/_actions/get-chat-id'
import { useRouter } from 'next/navigation'

type FriendCardPropsType = {
    friend: UserType
    online: boolean
}

const FriendCard = ({ friend, online }: FriendCardPropsType) => {
    const queryClient = useQueryClient()
    const router = useRouter()

    const handleGoToChat = async (recipientId: string) => {
        await queryClient.fetchQuery({
            queryKey: ['chatId'],
            queryFn: async () => {
                const res = await getChatIdActions({ recipientId: recipientId })
                router.push(`/homepage/chat/${res?.data?.info}`)
            }
        })
    }

    return (
        <div>
            <div key={friend.userId} className='flex justify-between items-center'>
                <UserCard
                    online={online}
                    key={friend.userId}
                    user={friend}
                />
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