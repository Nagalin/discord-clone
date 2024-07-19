'use client'

import React from 'react'
import useHandleFriendRequests from '@/app/homepage/pending/_hooks/use-handle-friend-requests'
import UserCard from '@/components/user-card'
import { Button } from '@/components/ui/button'
import { UserType } from '@/dto/user'

const ReceiveFriendRequestCard = ({ friendshipId, requester }: {
    friendshipId: string
    requester: Omit<UserType, 'email'>
}) => {
    const { handleFriendRequest } = useHandleFriendRequests()

    return (
        <div className='flex justify-between'>
            <UserCard user={requester} />

            <div className='flex items-center gap-3'>
                <Button
                    onClick={() => handleFriendRequest('Accept', friendshipId, requester.userId)}
                >
                    Accept
                </Button>
                <Button
                    onClick={() => handleFriendRequest('Reject', friendshipId, requester.userId)}
                    variant='destructive'
                >
                    Reject
                </Button>
            </div>
        </div>
    )
}

export default ReceiveFriendRequestCard