'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from '@/components/ui/skeleton'
import { getPendingFriendRequestsAction } from '@/app/homepage/pending/_actions/get-pending-friend-requests'
import SentFriendRequestCard from '@/app/homepage/pending/sent-frient-request-card'
import ReceiveFriendRequestCard from '@/app/homepage/pending/received-friend-request-card'

const PendingFriendRequestPage = () => {
    const { data: pendingFriendRequests, isFetching } = useQuery({
        queryKey: ['pendingFriendRequests'],
        queryFn: async () => await getPendingFriendRequestsAction({})
    })

    if (isFetching) return <PendingFriendRequestLoading />
    if (pendingFriendRequests?.data?.error)
        return <div className='text-2x'>{pendingFriendRequests?.data?.error}</div>

    return (
        <div className='flex flex-col gap-5'>

            <div className='text-2xl'>Pending request</div>
            {pendingFriendRequests?.data?.info?.map(curr => (
                <div key={curr.friendshipId}>
                    {curr.requester &&
                        <ReceiveFriendRequestCard
                            friendshipId={curr.friendshipId}
                            requester={curr.requester}
                        />
                    }
                    {curr.recipient &&
                        <SentFriendRequestCard
                            friendshipId={curr.friendshipId}
                            user={curr.recipient}
                        />}
                </div>
            ))}
            
        </div>
    )
}

const PendingFriendRequestLoading = () => {
    return (
        <div>
            <div className='text-2xl mb-3'>Pending request</div>

            <div className='flex items-center space-x-4'>
                <Skeleton className='h-12 w-12 rounded-full' />
                <div className='space-y-2'>
                    <Skeleton className='h-4 w-[200px]' />
                </div>
            </div>
        </div>
    )
}

export default PendingFriendRequestPage