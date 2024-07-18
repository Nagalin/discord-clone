'use server'

import { addUserToGeneralChannel, getChannelByName } from '@/data-access/channel'
import { addUserToServer } from '@/data-access/server'
import { actionClient } from '@/lib/safe-action'
import { z } from 'zod'

const schema = z.object({
    serverId: z.string().uuid(),
    friendId: z.string(),
    channelId: z.string().uuid()
})

export const addFriendToServerAction = actionClient
    .schema(schema).action(async ({ parsedInput: { serverId, friendId, channelId } }) => {
        try {
            await addUserToServer(serverId, friendId)
            await addUserToGeneralChannel(channelId, friendId)
            const voiceGeneralChannel = await getChannelByName('General', 'Voice')
            await addUserToGeneralChannel(voiceGeneralChannel!.channelId!, friendId)
        } catch (error) {
            console.error(error)

        }
    })