'use client'

import UserCard from '@/app/user-card'
import { Button } from '@/components/ui/button'
import { UserType } from '@/dto/user'
import React from 'react'
import { acceptFriendRequestAction, rejectFriendRequestAction } from './_actions/handle-pending-friend-request'
import { useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/use-toast'

type ReceivedFriendRequestCardPropsType = {
    friendshipId: string
    requester: Omit<UserType, 'email'>

}
const ReceiveFriendRequestCard = ({ friendshipId, requester }: ReceivedFriendRequestCardPropsType) => {
    const queryClient = useQueryClient()
    const { toast } = useToast()

    const handleAcceptFriendRequest = async () => {
        const res = await acceptFriendRequestAction({
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
        queryClient.invalidateQueries({ queryKey: ['pendingFriendRequests'] })
    }

    const handleRejectFriendRequest = async () => {
        const res = await rejectFriendRequestAction({
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
                <Button onClick={handleAcceptFriendRequest}> Accept </Button>
                <Button onClick={handleRejectFriendRequest} variant='destructive'> Reject </Button>
            </div>
        </div>
    )
}

export default ReceiveFriendRequestCard