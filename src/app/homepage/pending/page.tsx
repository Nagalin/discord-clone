'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from '@/components/ui/skeleton'
import { getPendingFriendRequestsAction } from '@/app/homepage/pending/_actions/get-pending-friend-requests'
import SentFriendRequestCard from '@/app/homepage/pending/sent-friend-request-card'
import ReceiveFriendRequestCard from '@/app/homepage/pending/received-friend-request-card'
import Alert from '@/components/alert'

const PendingFriendRequestPage = () => {
    const { data: pendingFriendRequests, isFetching } = useQuery({
        queryKey: ['pending-friend-requests'],
        queryFn: async () => await getPendingFriendRequestsAction({})
    })

    if (isFetching) return <PendingFriendRequestLoading />
    if (pendingFriendRequests?.data?.error)
        return (
            <div className='p-3 text-xl'>
                <Alert> {pendingFriendRequests.data.error}</Alert>
            </div>
        )

    return (
        <div className='flex flex-col gap-5 p-3'>

            <div className='text-2xl'>Pending request</div>

            {
                !pendingFriendRequests?.data?.info?.length &&
                <div>no pending friend request .....</div>
            }

            {pendingFriendRequests?.data?.info?.map(curr => (
                <div key={curr.friendshipId}>
                    {
                        curr.requester &&
                        <ReceiveFriendRequestCard
                            friendshipId={curr.friendshipId}
                            requester={curr.requester}
                        />
                    }
                    {
                        curr.recipient &&
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
        <div className='p-3'>
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