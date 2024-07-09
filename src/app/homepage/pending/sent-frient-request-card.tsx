'use client'

import React from 'react'
import { UserType } from '@/dto/user'
import UserCard from '@/app/user-card'
import { Button } from '@/components/ui/button'
import { cancelFriendRequestAction } from './_actions/cancel-friend-request'
import { useQueryClient } from '@tanstack/react-query'

type SentFriendRequestCardPropsType = {
    friendshipId: string
    user: Omit<UserType, 'email'> 
}

const SentFriendRequestCard = ({ friendshipId, user }: SentFriendRequestCardPropsType) => {
    const queryClient = useQueryClient()
    const handleCancelFriendRequest = async () => {
        await cancelFriendRequestAction({
            friendshipId: friendshipId, recipientId: user.userId
        })
        queryClient.invalidateQueries({queryKey: ['pendingFriendRequests']})
    }
    
    return (
        <div className='flex justify-between'>
            <UserCard userId={user.userId} username={user.username} image={user.image} />

            <div className='flex items-center gap-3'>
                <div>Pending ...</div>
                <Button onClick={handleCancelFriendRequest} variant='destructive'> Cancel </Button>
            </div>
        </div>
    )
}

export default SentFriendRequestCard