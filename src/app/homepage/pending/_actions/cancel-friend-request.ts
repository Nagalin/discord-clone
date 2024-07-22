'use server'

import { z } from 'zod'
import { deleteFriendship } from '@/data-access/friendship'
import { getUserIdFromSession } from '@/lib/get-user-id-from-session'
import { actionClient } from '@/lib/safe-action'

const schema = z.object({
    friendshipId: z.string().uuid(),
    recipientId: z.string()
})

export const cancelFriendRequestAction = actionClient
    .schema(schema).action(async ({ parsedInput: { friendshipId, recipientId } }) => {
        try {
            const requesterId = await getUserIdFromSession()
            await deleteFriendship(friendshipId, requesterId, recipientId)
        } catch (error) {
            console.error('Error cancelling friend request: ', error)
            return { error: 'Error occurs' }
        }
    })