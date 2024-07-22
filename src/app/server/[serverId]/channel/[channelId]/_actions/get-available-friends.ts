'use server'

import { z } from 'zod'
import { actionClient } from '@/lib/safe-action'
import { getAvailableFriends } from '@/data-access/friendship'
import { getUserIdFromSession } from '@/lib/get-user-id-from-session'

const schema = z.object({
    serverId: z.string().uuid()
})

export const getAvailableFriendsAction = actionClient
    .schema(schema).action(async ({ parsedInput: { serverId } }) => {
        try {
            const ownerId = await getUserIdFromSession()
            const availableFriends = await getAvailableFriends(serverId, ownerId)
            return { info: availableFriends }

        } catch (error) {
            console.error('Error getting available friends: ', error)
            return { error: 'Error occurs' }
        }
    })