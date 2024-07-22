import prisma from '@/lib/prisma'
import { createServerDTO, createServerWithGeneralChannelIdDTO } from '@/dto/server'

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
    return createServerWithGeneralChannelIdDTO(servers)
}

export async function getServerInfo(serverId: string) {
    const server = await prisma.server.findUnique({
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

export async function addUserToServer(serverId: string, friendId: string) {
    await prisma.server.update({
        where: {
            serverId: serverId
        },
        data: {
            members: {
                connect: {
                    userId: friendId
                }
            }

        }
    })
}