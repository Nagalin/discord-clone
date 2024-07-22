'use server'

import { z } from 'zod'
import { getUserIdFromSession } from '@/lib/get-user-id-from-session'
import { createChannel } from '@/data-access/channel'
import { actionClient } from '@/lib/safe-action'

const shcema = z.object({
    serverId: z.string().uuid(),
    channelName: z.string(),
    channelType: z.enum(['Text', 'Voice'])
})

export const createChannelAction = actionClient
    .schema(shcema).action(async ({ parsedInput: { serverId, channelName, channelType } }) => {
        try {
            const ownerId = await getUserIdFromSession()
            await createChannel(serverId, ownerId, channelName, channelType)

        } catch (error) {
            console.error('Error creating channel: ', error)
            return { error: 'Failed to create channel ...'}
        }
    })