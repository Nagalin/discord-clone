'use server'

import { z } from 'zod'
import { createChannelMessage } from '@/data-access/channel-message'
import { getUserIdFromSession } from '@/lib/get-user-id-from-session'
import { actionClient } from '@/lib/safe-action'
import { pusherServer } from '@/lib/pusher'

const schema = z.object({
    message: z.string(),
    channelId: z.string().uuid()
})

export const sendMessageAction = actionClient
    .schema(schema).action(async ({ parsedInput: { message, channelId } }) => {
        try {
            const senderId = await getUserIdFromSession()
            const channelMessage = await createChannelMessage(senderId, channelId, message)
            const payload = {
                ...channelMessage
            }
            pusherServer.trigger(`channel-${channelId}`, 'incoming-message', payload)

        } catch (error) {
            console.error('Error sending messaeg: ', error)
            return { error: 'Failed to send message ...' }

        }

    })