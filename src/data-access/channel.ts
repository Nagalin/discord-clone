import prisma from '@/lib/prisma'
import { createChannelDTO } from '@/dto/channel'

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

export async function getChannelsByserverId(serverId: string, userId: string) {
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

export async function getChannelByName(channelName: string, channelType: 'Text' | 'Voice') {
    const channel = await prisma.channel.findFirst({
        where: {
            channelName: channelName,
            channelType: channelType
        }
    })
    return channel ? createChannelDTO(channel) : null
}

export async function addUserToChannel(channelId: string, friendId: string) {
    await prisma.channel.update({
        where: { 
            channelId: channelId,
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