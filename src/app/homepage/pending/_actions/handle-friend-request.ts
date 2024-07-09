'use server'

import { updateFriendship, deleteFriendship } from '@/data-access/friendship'
import { getUserIdFromSession } from '@/lib/getUserIdFromSession'
import { actionClient } from '@/lib/safe-action'
import { z } from 'zod'

const schema = z.object({
    friendshipId: z.string().uuid(),
    requesterId: z.string()
})

export const acceptFriendRequestAction = actionClient
    .schema(schema).action(async ({ parsedInput: { friendshipId, requesterId } }) => {
        try {
            const recipientId = await getUserIdFromSession()
            await updateFriendship(friendshipId, requesterId, recipientId)
        } catch (error) {
            console.error('Error accepting friend request: ', error)
            return { error: 'Something went wrong, please try again' }
        }
    })

export const rejectFriendRequestAction = actionClient
    .schema(schema).action(async ({ parsedInput: { friendshipId, requesterId } }) => {
        try {
            const recipientId = await getUserIdFromSession()
            await deleteFriendship(friendshipId, requesterId, recipientId)
        } catch (error) {
            console.error('Error accepting friend request: ', error)
            return { error: 'Something went wrong, please try again' }
        }
    })