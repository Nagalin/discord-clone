'use server'

import { z } from 'zod'
import { actionClient } from '@/lib/safe-action'
import { addUserToChannel, getChannelByName } from '@/data-access/channel'
import { addUserToServer } from '@/data-access/server'

const schema = z.object({
    serverId: z.string().uuid(),
    friendId: z.string(),
    channelId: z.string().uuid()
})

export const addFriendToServerAction = actionClient
    .schema(schema).action(async ({ parsedInput: { serverId, friendId, channelId } }) => {
        try {
            await addUserToServer(serverId, friendId)
            await addUserToChannel(channelId, friendId)
            const voiceGeneralChannel = await getChannelByName('General', 'Voice')
            await addUserToChannel(voiceGeneralChannel!.channelId!, friendId)
        } catch (error) {
            console.error('Error adding friend to server: ', error)
            return { error: 'Failed to add this user to server ...'}

        }
    })