'use server'

import { createPrivateMessage } from "@/data-access/private-messages"
import { PrivateChatType } from "@/dto/private-chat"
import { PrivateMessageType } from "@/dto/private-message"
import { getUserIdFromSession } from "@/lib/getUserIdFromSession"
import { pusherServer } from "@/lib/pusher"
import { actionClient } from "@/lib/safe-action"
import { z } from "zod"

const schema = z.object({
    privateChatId: z.string().uuid(),
    recipientId: z.string(),
    message: z.string()
})

export const sendMessageAction = actionClient
    .schema(schema)
    .action(async ({ parsedInput: { privateChatId, recipientId, message } }) => {
        try {
            const senderId = await getUserIdFromSession()
            const newMessage =  await createPrivateMessage(privateChatId, senderId, recipientId, message)

            const payload: PrivateMessageType = {
                ...newMessage
            }
            pusherServer.trigger(`channel-${privateChatId}`, 'message',payload)  
        } catch (error) {
            console.error(error)
            
        }
        
    })
