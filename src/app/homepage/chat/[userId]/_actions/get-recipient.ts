'use server'

import { z } from 'zod'
import { getUserIdFromSession } from '@/lib/getUserIdFromSession'
import { actionClient } from '@/lib/safe-action'
import { getUserInfoWithId } from '@/data-access/user'

const schema = z.object({
    recipientId: z.string().uuid()
})

export const getRecipientAction = actionClient
.schema(schema).action(async ({parsedInput: {recipientId}}) => {
    try {
        const recipient = await getUserInfoWithId(recipientId)
        return { info: recipient}
        
    } catch (error) {
        
    }
})