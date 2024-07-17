'use server'

import { getUserIdFromSession } from '@/lib/getUserIdFromSession'
import { actionClient } from '@/lib/safe-action'
import { z } from 'zod'
import { getChannelsByserverId } from '@/data-access/channel'

const shchema = z.object({
    serverId: z.string().uuid()
})

export const getChannelsAction = actionClient
    .schema(shchema).action(async ({ parsedInput: {serverId} }) => {
        try {
            const userId = await getUserIdFromSession()
            const channels = await getChannelsByserverId(serverId, userId)
            return { info: channels}
        } catch (error) {
            console.error(error)
            return { error: 'Error occurs' }
        }
    })