'use server'

import { z } from 'zod'
import { getChannelMessages } from '@/data-access/channel-message'
import { actionClient } from '@/lib/safe-action'
import { pusherServer } from '@/lib/pusher'

const schema = z.object({
    channelId: z.string().uuid()
})

export const getChannelMessageAction = actionClient
    .schema(schema).action(async ({ parsedInput: { channelId } }) => {
        try {
            const channelMessages = await getChannelMessages(channelId)
            return { info: channelMessages }

        } catch (error) {
            console.error(error)
            return { error: 'Error occurs' }
        }
    })