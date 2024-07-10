import { createChannelDTO } from '@/dto/channel'
import prisma from '@/lib/prisma'

export async function createChannel(
    serverId: string,
    ownerId: string,
    channelName: string,
    channelType: 'Text' | 'Voice'
) {
    await prisma.channel.create({
        data: {
            serverId: serverId,
            channelName: channelName,
            channelType: channelType,
            members: {
                connect: {
                    userId: ownerId
                }
            }
        }
    })
}

export async function getChannels(serverId: string, userId: string) {
    const channels = await prisma.channel.findMany({
        where: {
            serverId: serverId,
            members: {
                some: {
                    userId: userId
                }
            }
        },
    })

    return channels.map(channel => createChannelDTO(channel))
}
