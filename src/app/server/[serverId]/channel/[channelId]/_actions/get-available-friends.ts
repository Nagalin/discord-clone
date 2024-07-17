'use server'

import { getAvailableFriends } from "@/data-access/friendship"
import { getUserIdFromSession } from "@/lib/getUserIdFromSession"
import { actionClient } from "@/lib/safe-action"
import { z } from "zod"

const schema = z.object({
    serverId: z.string().uuid()
})

export const getAvailableFriendsAction = actionClient
.schema(schema).action(async ({parsedInput: {serverId}}) => {
    try {
        const ownerId = await getUserIdFromSession()
        const availableFriends = await getAvailableFriends(serverId, ownerId)
        return { info: availableFriends}
        
    } catch (error) {
        console.error('Error getting available friends: ', error)
        return { error: 'Error occurs'}
    }
})