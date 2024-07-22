import { z } from 'zod'

export const ChannelSchemaBase = z.object({
    channelId: z.string().uuid(),
    channelName: z.string(),
    channelType: z.enum(['Text', 'Voice']),
    serverId: z.string().uuid(),
})

type ChannelType = z.infer<typeof ChannelSchemaBase>

export function createChannelDTO(channel: ChannelType) {
    return ChannelSchemaBase.parse(channel)
}
