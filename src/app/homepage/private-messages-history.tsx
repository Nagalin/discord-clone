'use client'

import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getPrivateMessagesListAction } from './_actions/get-private-chat-history'
import UserCard from '@/components/user-card'
import Link from 'next/link'

const PrivateMessagesHistory = () => {
    const { data: privateMessages, isFetching } = useQuery({
        queryKey: ['private-messages-list'],
        queryFn: async () => await getPrivateMessagesListAction({})
    })
    if (isFetching) return

    return (
        <div className='bg-discord-direct-message-list w-56 flex flex-col gap-4'>
            {privateMessages?.data?.info?.map(curr => (
                <Link href="/homepage/chat/[userId]" as={`/homepage/chat/${curr.participants![0].userId}`}>

                    <UserCard user={curr.participants![0]!} />
                </Link>
            ))}

        </div>
    )
}

export default PrivateMessagesHistory