'use server'

import { getServer } from '@/data-access/server'
import { actionClient } from '@/lib/safe-action'
import { z } from 'zod'

const schema = z.object({
    serverId: z.string().uuid()
})

export const getServerAction = actionClient
.schema(schema).action(async ({parsedInput: {serverId}}) => {
    try {
        const server = await getServer(serverId)
        return { info: server}
    } catch (error) {
        console.error(error)
        return { error: 'Error occurs'}
        
    }
})