'use server'

import { z } from 'zod'
import { actionClient } from '@/lib/safe-action'
import { getServerInfo } from '@/data-access/server'

const schema = z.object({
    serverId: z.string().uuid()
})

export const getServerInfoAction = actionClient
    .schema(schema).action(async ({ parsedInput: { serverId } }) => {
        try {
            const server = await getServerInfo(serverId)
            return { info: server }
        } catch (error) {
            console.error(error)
            return { error: 'Failed to get server info ...' }
        }
    })