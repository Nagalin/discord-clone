'use server'

import { createPrivateMessage } from "@/data-access/private-messages"
import { getUserIdFromSession } from "@/lib/getUserIdFromSession"
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
            await createPrivateMessage(privateChatId, senderId, recipientId, message)

            
        } catch (error) {
            console.error(error)
            
        }
        
    })
