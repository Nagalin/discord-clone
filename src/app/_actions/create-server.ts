'use server'

import z from 'zod'
import { createChannel } from '@/data-access/channel'
import { createServer } from '@/data-access/server'
import { getUserIdFromSession } from '@/lib/getUserIdFromSession'
import { actionClient } from '@/lib/safe-action'

const schema = z.object({
    serverName: z.string(),
    serverImage: z.string().url()
})

export const createServerAction = actionClient
    .schema(schema).action(async ({ parsedInput: { serverName, serverImage } }) => {
        try {
            const ownerId = await getUserIdFromSession()
            const server = await createServer(ownerId, serverName, serverImage)

            await createChannel(server.serverId, ownerId, 'General', 'Text')
            await createChannel(server.serverId, ownerId, 'General', 'Voice')

            return { success: 'Server created!!' }

        } catch (error) {
            console.error('Error creating server: ', error)
            return { error: 'Error occurs' }
        }
    })