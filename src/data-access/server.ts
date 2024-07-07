import { createServerDTO } from '@/dto/server'
import prisma from '@/lib/prisma'

export async function getServers(userId: string) {
    const servers = await prisma.server.findMany({
        where: {
            members: {
                some: {
                    userId: userId
                }
            }
        }
    })

    return servers.map(currServer => createServerDTO(currServer))
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