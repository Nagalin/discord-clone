'use server'

import { getChannelMessages } from "@/data-access/channel-message"
import { actionClient } from "@/lib/safe-action"
import { z } from "zod"

const schema = z.object({
    channelId: z.string().uuid()
})

export const getChannelMessageAction = actionClient
    .schema(schema).action(async ({ parsedInput: { channelId } }) => {
        try {
            const channelMessages = await getChannelMessages(channelId)
            return { info: channelMessages }

        } catch (error) {
            console.error(error)
            return { error: 'Error occurs' }

        }

    })