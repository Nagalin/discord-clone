'use server'

import { z } from 'zod'
import { actionClient } from '@/lib/safe-action'
import { getUserInfoById } from '@/data-access/user'

const schema = z.object({
    recipientId: z.string().uuid()
})

export const getRecipientAction = actionClient
.schema(schema).action(async ({parsedInput: {recipientId}}) => {
    try {
        const recipient = await getUserInfoById(recipientId)
        return { info: recipient}
        
    } catch (error) {
        
    }
})