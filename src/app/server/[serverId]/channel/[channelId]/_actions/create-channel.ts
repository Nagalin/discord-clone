'use server'

import { createChannel } from "@/data-access/channel"
import { getUserIdFromSession } from "@/lib/getUserIdFromSession"
import { actionClient } from "@/lib/safe-action"
import { z } from "zod"

const shcema = z.object({
    serverId: z.string().uuid(),
    channelName: z.string(),
    channelType: z.enum(['Text', 'Voice'])
})

export const  createChannelAction = actionClient
.schema(shcema).action(async ({parsedInput: {serverId, channelName, channelType}}) => {
    try {
        const ownerId = await getUserIdFromSession()
        await createChannel(serverId, ownerId, channelName, channelType)

    } catch (error) {
        console.error(error)
        
    }
})