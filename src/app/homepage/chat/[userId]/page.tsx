'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getPrivateChatIdAction } from '@/app/homepage/_actions/get-private-chat-id'
import MessageForm from '@/app/homepage/chat/[userId]/message-form'

type PrivateMessagePagePropsType = {
    params: {
        userId: string
    }
}

const PrivateMessagePage = ({ params }: PrivateMessagePagePropsType) => {
    const { userId } = params
    const { data: privateChat, isFetching } = useQuery({
        queryKey: ['private-chat', userId],
        queryFn: async () => await getPrivateChatIdAction({ recipientId: userId })
    })

    if (isFetching) return
    return (
        <div>
            <MessageForm
                privateChatId={privateChat?.data?.info!}
                recipientId={params.userId}
            />
        </div>
    )
}

export default PrivateMessagePage