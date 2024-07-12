'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getPrivateChatAction } from '../../_actions/get-private-chat'
import UserCard from '@/components/user-card'

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
            <UserCard online user={privateChat?.data?.info?.participants![0]!} />
        </div>
    )
}

export default PrivateMessagePage