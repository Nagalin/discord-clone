import prisma from '@/lib/prisma'
import { createPrivateMessageDTO } from '@/dto/private-message'

export async function getPrivateMessages(privateChatId: string) {
    const privateMessages = await prisma.privateMessage.findMany({
        where: {
            privateChatId: privateChatId
        },

        include: {
            sender: true,
            recipient: true
        }
    })

    return privateMessages.map(curr => createPrivateMessageDTO(curr))
}

export async function createPrivateMessage(
    privateChatId: string, senderId: string, recipientId: string, message: string
) {
    await prisma.privateMessage.create({
        data: {
            privateChatId: privateChatId,
            senderId: senderId,
            recipientId: recipientId,
            content: message,
        }
    })
}