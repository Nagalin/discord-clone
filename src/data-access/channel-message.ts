import { createChannelMessageWithSenderInfoDTO } from '@/dto/channel-message'
import prisma from '@/lib/prisma'

export async function getChannelMessages(channelId: string) {
    const channelMessage = await prisma.channelMessage.findMany({
        where: {
            channelId: channelId
        },

        include: {
            sender: true
        }
    })
    return channelMessage.map(curr => createChannelMessageWithSenderInfoDTO(curr))
}

export async function createChannelMessage(senderId: string, channelId: string, message: string) {
    const channelMessage = await prisma.channelMessage.create({
        data: {
            channelId: channelId,
            senderId: senderId,
            content: message
        },
        include: {
            sender: true
        }
    })
    createChannelMessageWithSenderInfoDTO(channelMessage)
}