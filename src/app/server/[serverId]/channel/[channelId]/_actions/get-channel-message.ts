'use server'

import { z } from 'zod'
import { getChannelMessages } from '@/data-access/channel-message'
import { actionClient } from '@/lib/safe-action'

const schema = z.object({
    channelId: z.string().uuid()
})

export const getChannelMessageAction = actionClient
    .schema(schema).action(async ({ parsedInput: { channelId } }) => {
        try {
            const channelMessages = await getChannelMessages(channelId)
            return { info: channelMessages }
        } catch (error) {
            console.error('Error getting channel message:', error)
            return { error: 'Failed to get message from this channel' }
        }
    })