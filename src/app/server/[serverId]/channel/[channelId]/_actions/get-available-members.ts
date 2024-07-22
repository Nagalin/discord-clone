'use server'

import { getAvailableMembers } from '@/data-access/user'
import { actionClient } from '@/lib/safe-action'
import { z } from 'zod'

const schema = z.object({
    channelId: z.string().uuid(),
    serverId: z.string().uuid()
})

export const getAvailableMembersAction = actionClient
.schema(schema).action(async ({parsedInput: {serverId, channelId}}) => {
    try {
        const members = await getAvailableMembers(serverId, channelId)
        return { info: members }
        
    } catch (error) {
        console.error(error)
        return { error : 'Failed to get member in server ...'} 
        
    }

})