'use server'

import { z } from 'zod'
import { updatePrivateChatDate } from '@/data-access/private-chat'
import { createPrivateMessage } from '@/data-access/private-messages'
import { PrivateMessageType } from '@/dto/private-message'
import { getUserIdFromSession } from '@/lib/get-user-id-from-session'
import { pusherServer } from '@/lib/pusher'
import { actionClient } from '@/lib/safe-action'

const schema = z.object({
    privateChatId: z.string().uuid(),
    recipientId: z.string(),
    message: z.string()
})

export const sendMessageAction = actionClient
    .schema(schema).action(async ({ parsedInput: { privateChatId, recipientId, message } }) => {
        try {
            const senderId = await getUserIdFromSession()
            const newMessage = await createPrivateMessage(privateChatId, senderId, recipientId, message)
            await updatePrivateChatDate(privateChatId)

            const payload: PrivateMessageType = {
                ...newMessage
            }
            pusherServer.trigger(`channel-${privateChatId}`, 'incoming-message', payload)
            pusherServer.trigger(`notification-${recipientId}`, 'noti-message', { sender: newMessage.sender })
        } catch (error) {
            console.error('Error sending message: ', error)
            return { error: 'Failed to send message ...'}
        }
    })
