'use server'

import { z } from 'zod'
import { getUserInfoById } from '@/data-access/user'
import { actionClient } from '@/lib/safe-action'

const schema = z.object({
    friendId: z.string()
})

export const getFriendProfileAction = actionClient
.schema(schema).action(async ({parsedInput: {friendId}}) => {
    try {
        const friendInfo = await getUserInfoById(friendId)
        return { info: friendInfo }
    } catch (error) {
        
    }
})