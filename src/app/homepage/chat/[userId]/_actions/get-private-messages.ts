'use server'

import { z } from 'zod'
import { getPrivateMessages } from '@/data-access/private-messages'
import { actionClient } from '@/lib/safe-action'

const schema = z.object({
    privateChatId: z.string().uuid()
})

export const getPrivateMessagesAction = actionClient
.schema(schema).action(async ({parsedInput: {privateChatId}}) => {
    try {
        const privateMessages = await getPrivateMessages(privateChatId)
        return { info: privateMessages}
    } catch (error) {
        return {error: 'Error occurs'}
        
    }
})