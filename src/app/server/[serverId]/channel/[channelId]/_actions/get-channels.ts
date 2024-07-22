'use server'

import { z } from 'zod'
import { getUserIdFromSession } from '@/lib/get-user-id-from-session'
import { actionClient } from '@/lib/safe-action'
import { getChannelsByserverId } from '@/data-access/channel'

const shchema = z.object({
    serverId: z.string().uuid()
})

export const getChannelsAction = actionClient
    .schema(shchema).action(async ({ parsedInput: { serverId } }) => {
        try {
            const userId = await getUserIdFromSession()
            const channels = await getChannelsByserverId(serverId, userId)
            return { info: channels }
        } catch (error) {
            console.error('Error getting channels: ', error)
            return { error: 'Failed to get channel ...' }
        }
    })