import prisma from '@/lib/prisma'
import { createServerDTO } from '@/dto/server'

export async function getServers(userId: string) {
    const servers = await prisma.server.findMany({
        where: {
            members: {
                some: {
                    userId: userId
                }
            }
        },

        include: {
            channels: true
        }
    })

    return servers.map(currServer => (
        {
            ...createServerDTO(currServer),
            generalChannelId: currServer.channels.find(currChannel => currChannel.channelName === 'General')!.channelId
        }
    ))
}

export async function getServer(serverId: string) {
    const server = await prisma.server.findFirst({
        where: {
            serverId: serverId
        }
    })
    return server ? createServerDTO(server) : null
}

export async function createServer(
    ownerId: string, serverName: string, serverImage: string
) {
    const server = await prisma.server.create({
        data: {
            ownerId: ownerId,
            serverName: serverName,
            serverImage: serverImage,
            members: {
                connect: {
                    userId: ownerId
                }
            }
        }
    })
    return createServerDTO(server)
}