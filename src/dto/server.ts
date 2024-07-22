import { z } from 'zod'
import { ChannelSchemaBase } from '@/dto/channel'

export const ServerSchemaBase = z.object({
    serverId: z.string().uuid(),
    serverName: z.string(),
    serverImage: z.string().url(),
    ownerId: z.string()
})

const ServerWithChannelsInfoSchema = ServerSchemaBase.extend({
    channels: z.array(ChannelSchemaBase)
})

const ServerWithGeneralChannelId = ServerSchemaBase.extend({
    generalChannelId: z.string().uuid()
})

type ServerType = z.infer<typeof ServerSchemaBase>
type ServerWithChannelsInfoSType = z.infer<typeof ServerWithChannelsInfoSchema>

export function createServerDTO(server: ServerType) {
    return ServerSchemaBase.parse(server)
}

export function createServerWithGeneralChannelIdDTO(servers: ServerWithChannelsInfoSType[]) {
    return servers.map(currServer => {
        return ServerWithGeneralChannelId.parse({
            ...createServerDTO(currServer),
            generalChannelId: currServer.channels?.find(currChannel => currChannel.channelName === 'General')?.channelId
        })
    })
}

