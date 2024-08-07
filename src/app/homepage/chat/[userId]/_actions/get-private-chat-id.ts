'use server'

import { z } from 'zod'
import { createPrivateChat, getPrivateChat } from '@/data-access/private-chat'
import { getUserIdFromSession } from '@/lib/get-user-id-from-session'
import { actionClient } from '@/lib/safe-action'

const schema = z.object({
    recipientId: z.string()
})

export const getPrivateChatIdAction = actionClient
    .schema(schema).action(async ({ parsedInput: { recipientId } }) => {
        try {
            const senderId = await getUserIdFromSession()
            const privateChat = await getPrivateChat(senderId, recipientId)
            if (privateChat) {
                return { info: privateChat.privateChatId }
            }
            const newPrivateChat = await createPrivateChat(senderId, recipientId)
            return { info: newPrivateChat?.privateChatId }

        } catch (error) {
            console.error('Error getting chat id: ', error)
            return { error: 'Something went wrong ...' }
        }
    })