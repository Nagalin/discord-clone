'use server'

import { z } from 'zod'
import { createChannelMessage } from '@/data-access/channel-message'
import { getUserIdFromSession } from '@/lib/getUserIdFromSession'
import { actionClient } from '@/lib/safe-action'

const schema = z.object({
    message: z.string(),
    channelId: z.string().uuid()
})

export const sendMessageAction = actionClient
.schema(schema).action(async ({parsedInput: {message, channelId}}) => {
    try {
        const senderId = await getUserIdFromSession()
        await createChannelMessage(senderId, channelId, message)
    } catch (error) {
        console.error(error)
        return { error: 'Error occurs' }
        
    }

})