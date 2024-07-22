'use server'

import { addUserToChannel } from '@/data-access/channel'
import { actionClient } from '@/lib/safe-action'
import { z } from 'zod'

const schema = z.object({
    channelId: z.string().uuid(),
    userId: z.string()
})

export const addMemberToChannelAction = actionClient
.schema(schema).action(async ({parsedInput: {channelId, userId}}) => {
    try {
        await addUserToChannel(channelId, userId)
        
    } catch (error) {
        console.error('Error adding member to channel: ', error)
        return { error: 'Failed to add this member to channel ...'}
        
    }

})
