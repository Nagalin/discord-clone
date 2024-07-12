'use server'

import { createPrivateChat, getPrivateChat } from '@/data-access/private-chat'
import { getUserIdFromSession } from '@/lib/getUserIdFromSession'
import { actionClient } from '@/lib/safe-action'
import { z } from 'zod'

const schema = z.object({
    recipientId: z.string()
})

export const getPrivateChatAction = actionClient
    .schema(schema).action(async ({ parsedInput: { recipientId } }) => {
        try {
            const senderId = await getUserIdFromSession()
            const privateChat = await getPrivateChat(senderId, recipientId)
            if (privateChat) {
                return { info: privateChat }
            }
            const newPrivateChat = await createPrivateChat(senderId, recipientId)
            return { info: newPrivateChat }

        } catch (error) {
            console.error('Error getting chat id: ', error)
            return { error: 'Error occurs' }
        }
    })