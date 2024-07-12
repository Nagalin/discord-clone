import { z } from 'zod'
import { channelSchema } from '@/dto/channel'

const serverSchemaBase = z.object({
    serverId: z.string().uuid(),
    serverName: z.string(),
    serverImage: z.string().url(),
    ownerId: z.string(),
    
})

type ServerSchemaBaseType = z.infer<typeof serverSchemaBase> & {
    channels?: z.infer<typeof channelSchema>[]
}

export const serverSchema: z.Schema<ServerSchemaBaseType> = serverSchemaBase.extend({
    channels: channelSchema.array().optional()
})

export type ServerType = z.infer<typeof serverSchema>;

export function createServerDTO(server: ServerType) {
    return serverSchema.parse(server);
}

export function createServerWithGeneralChannelIdDTO(servers: ServerType[]) {
    return servers.map(currServer => ({
        ...createServerDTO(currServer),
        generalChannelId: currServer.channels?.find(currChannel => currChannel.channelName === 'General')?.channelId,
    }))
}
