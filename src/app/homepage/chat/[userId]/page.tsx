'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getPrivateChatAction } from '../../_actions/get-private-chat'
import MessageForm from './message-form'

type PrivateMessagePagePropsType = {
    params: {
        userId: string
    }
}

const PrivateMessagePage = ({ params }: PrivateMessagePagePropsType) => {
    const { userId } = params
    const { data: privateChat, isFetching } = useQuery({
        queryKey: ['chat', userId],
        queryFn: async () => await getPrivateChatAction({ recipientId: userId })
    })

    if (isFetching) return
    return (
        <div>
            <MessageForm
                privateChatId={privateChat?.data?.info?.privateChatId!}
                recipientId={params.userId}
            />
        </div>
    )
}

export default PrivateMessagePage