import prisma from '@/lib/prisma'
import { createPrivateMessageDTO, createUnreadMessagesDTO } from '@/dto/private-message'

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
    const privateMessage = await prisma.privateMessage.create({
        data: {
            privateChatId: privateChatId,
            senderId: senderId,
            recipientId: recipientId,
            content: message,
        },
        include: {
            sender: true
        }
    })
    return createPrivateMessageDTO(privateMessage)
}

export async function getUnreadMessages(recipientId: string) {
    const unreadMessages = await prisma.privateMessage.findMany({
        where: {
            recipientId: recipientId,
            read: false
        },
        include: {
            sender: true
        }
    })
    return createUnreadMessagesDTO(unreadMessages)
}

export async function updatePrivateMessage(privateMessageId: string, recipientId: string) {
    const privateMessage = await prisma.privateMessage.findUnique({
        where: {
            privateMessageId: privateMessageId,
            recipientId: recipientId,
            read: false
        }
    })
    if(!privateMessage) return
    console.log('debug: ',privateMessage)
    await prisma.privateMessage.update({
        where: {
            privateMessageId: privateMessageId,
            read: false
        },

        data: {
            read: true
        }
    })
}