'use server'

import { z } from 'zod'
import { getPrivateMessages, updatePrivateMessage } from '@/data-access/private-messages'
import { actionClient } from '@/lib/safe-action'
import { getUserIdFromSession } from '@/lib/getUserIdFromSession'

const schema = z.object({
    privateChatId: z.string().uuid()
})

export const getPrivateMessagesAction = actionClient
    .schema(schema).action(async ({ parsedInput: { privateChatId } }) => {
        try {
            const recipientId = await getUserIdFromSession()
            const privateMessages = await getPrivateMessages(privateChatId)
            privateMessages.map(async curr => await updatePrivateMessage(curr.privateMessageId, recipientId))
            return { info: privateMessages }
        } catch (error) {
            return { error: 'Error occurs' }
        }
    })