'use client'

import React from 'react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { getPrivateChatHistoryAction } from '@/app/homepage/_actions/get-private-chat-history'
import UserCard from '@/components/user-card'
import { Skeleton } from '@/components/ui/skeleton'

const PrivateMessagesHistory = () => {
    const { data: privateChatsHistory, isFetching } = useQuery({
        queryKey: ['private-messages-list'],
        queryFn: async () => await getPrivateChatHistoryAction({})
    })
    if (isFetching) return <PrivateMessagesHistoryLoading />

    return (
        <div
            className='bg-discord-direct-message-list w-56 flex flex-col gap-4 p-2'
        >
            <div className='text-2xl mt-5 mb-5'> Private messages</div>

            <div className='flex flex-col gap-2'>
                {privateChatsHistory?.data?.info?.map(curr => (
                    <Link
                        className='hover:bg-gray-600 rounded p-3'
                        href='/homepage/chat/[userId]'
                        as={`/homepage/chat/${curr.participants![0].userId}`}
                    >
                        <UserCard user={curr.participants[0]} />
                    </Link>
                ))}
            </div>

        </div>
    )
}

const PrivateMessagesHistoryLoading = () => {
    return (
        <div className='bg-discord-direct-message-list w-56 flex flex-col gap-3 p-2'>
            <div className='text-2xl mt-5 mb-5'> Private messages</div>

            <div className='flex items-center gap-3 p-2'>
                <Skeleton className='h-12 w-12 rounded-full' />
                <div className='space-y-2'>
                    <Skeleton className='h-4 w-[100px]' />
                </div>
            </div>

            <div className='flex items-center gap-3 p-2'>
                <Skeleton className='h-12 w-12 rounded-full' />
                <div className='space-y-2'>
                    <Skeleton className='h-4 w-[100px]' />
                </div>
            </div>

            <div className='flex items-center gap-3 p-2'>
                <Skeleton className='h-12 w-12 rounded-full' />
                <div className='space-y-2'>
                    <Skeleton className='h-4 w-[100px]' />
                </div>
            </div>


        </div>
    )
}

export default PrivateMessagesHistory