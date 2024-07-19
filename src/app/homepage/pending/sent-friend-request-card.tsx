'use client'

import React from 'react'
import { UserType } from '@/dto/user'
import UserCard from '@/components/user-card'
import { Button } from '@/components/ui/button'
import useCancelFriendRequests from '@/app/homepage/pending/_hooks/use-cancel-friend-requests'


const SentFriendRequestCard = ({ friendshipId, user }: {
    friendshipId: string
    user: Omit<UserType, 'email'>
}) => {
    const { handleCancelFriendRequest } = useCancelFriendRequests()

    return (
        <div className='flex justify-between'>
            <UserCard user={user} />

            <div className='flex items-center gap-3'>
                <div>Pending ...</div>
                <Button
                    onClick={() => handleCancelFriendRequest(friendshipId, user.userId)}
                    variant='destructive'
                >
                    Cancel
                </Button>
            </div>
        </div>
    )
}

export default SentFriendRequestCard