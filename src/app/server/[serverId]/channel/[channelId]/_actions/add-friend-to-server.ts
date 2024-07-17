'use server'

import { addUserToGeneralChannel } from "@/data-access/channel"
import { addUserToServer } from "@/data-access/server"
import { getUserIdFromSession } from "@/lib/getUserIdFromSession"
import { actionClient } from "@/lib/safe-action"
import { z } from "zod"

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
        } catch (error) {
            console.error(error)

        }


    })