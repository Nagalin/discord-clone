'use server'

import { z } from 'zod'
import { createFriendship, getFriendship } from '@/data-access/friendship'
import { getUserInfoWithName } from '@/data-access/user'
import { getUserIdFromSession } from '@/lib/getUserIdFromSession'
import { actionClient } from '@/lib/safe-action'

const schema = z.object({
    username: z.string()
})

export const addFriendAction = actionClient
    .schema(schema).action(async ({ parsedInput: { username } }) => {
        try {
            const requesterId = await getUserIdFromSession()
            const recipient = await getUserInfoWithName(username)

            if (!recipient) return { error: 'Recipient not found' }

            const existFriendship = await getFriendship(requesterId, recipient.userId)

            if (existFriendship?.status === 'Friend') return { error: 'This user is already your friend' }
            if (existFriendship?.status === 'Pending') return { error: 'Already sent friend request' }

            await createFriendship(requesterId, recipient.userId)
            return { success: 'Friend request sent!!' }

        } catch (error) {
            console.error('Error adding friend: ', error)
            return { error: 'Failed to add friend, please try again later' }
        }
    })