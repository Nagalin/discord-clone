'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getPrivateChatIdAction } from '@/app/homepage/_actions/get-private-chat-id'
import MessageForm from '@/app/homepage/chat/[userId]/message-form'
import FriendProfile from '../../friend-profile'

const PrivateMessagePage = ({ params }: {
    params: {
        userId: string
    }
}) => {
    const { userId } = params
    const { data: privateChat, isFetching } = useQuery({
        queryKey: ['private-chat', userId],
        queryFn: async () => await getPrivateChatIdAction({ recipientId: userId })
    })

    if (isFetching) return
    return (
        <div className='flex'>

            <MessageForm
                privateChatId={privateChat?.data?.info!}
                recipientId={params.userId}
            />

            <div>
                <FriendProfile />
            </div>
        </div>
    )
}


export default PrivateMessagePage