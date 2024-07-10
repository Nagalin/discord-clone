import z from 'zod'
import { serverSchema } from './server'
import { userSchema } from "./user"

const channelSchema = z.object({
    channelId: z.string().uuid(),
    channelName: z.string(),
    channelType: z.enum(['Text', 'Voice']),
    serverId: z.string().uuid(),
    server: serverSchema.optional(),
    members: z.array(userSchema).optional()
})

export type ChannelType = z.infer<typeof channelSchema>

export function createChannelDTO(channel: ChannelType) {
    return channelSchema.parse({
        channelId: channel.channelId,
        channelName: channel.channelName,
        channelType: channel.channelType,
        server: channel.server,
        serverId: channel.serverId,
        members: channel.members

    })
}