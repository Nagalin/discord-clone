'use client'

import UserCard from '@/components/user-card'
import { Button } from '@/components/ui/button'
import { UserType } from '@/dto/user'
import React from 'react'
import { acceptFriendRequestAction, rejectFriendRequestAction } from '@/app/homepage/pending/_actions/handle-friend-request'
import { useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/use-toast'

type ReceivedFriendRequestCardPropsType = {
    friendshipId: string
    requester: Omit<UserType, 'email'>

}
const ReceiveFriendRequestCard = ({ friendshipId, requester }: ReceivedFriendRequestCardPropsType) => {
    const queryClient = useQueryClient()
    const { toast } = useToast()

    const handleFriendRequest = async (action: 'Accept' | 'Reject') => {
        const actionFunction = action === 'Accept' ? acceptFriendRequestAction : rejectFriendRequestAction
        const res = await actionFunction({
            friendshipId: friendshipId, requesterId: requester.userId
        })

        if (!res?.data?.error) {
            queryClient.invalidateQueries({ queryKey: ['pendingFriendRequests'] })
        } else {
            toast({
                title: 'Oops ...',
                description: res.data.error,
                variant: 'destructive'
            })
        }
    }

    return (
        <div className='flex justify-between'>
            <UserCard
                userId={requester.userId}
                username={requester.username}
                image={requester.image}
            />

            <div className='flex items-center gap-3'>
                <Button onClick={() => handleFriendRequest('Accept')}> Accept </Button>
                <Button onClick={() => handleFriendRequest('Reject')} variant='destructive'> Reject </Button>
            </div>
        </div>
    )
}

export default ReceiveFriendRequestCard