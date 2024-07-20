'use server'

import { getChannelMembers } from "@/data-access/user"
import { actionClient } from "@/lib/safe-action"
import { z } from "zod"

const schema = z.object({
    channelId: z.string().uuid()
})

export const getChannelMemberAction = actionClient
.schema(schema).action(async ({parsedInput: {channelId}}) => {
    try {
        const channelMembers = await getChannelMembers(channelId)
        return { info: channelMembers }
        
    } catch (error) {
        console.error(error)
        return { error: 'Error occurs'}
        
    }
})