import { createPrivateChatWithOutSenderInfoDTO } from '@/dto/private-chat'
import prisma from '@/lib/prisma'

export async function createPrivateChat(senderId: string, recipientId: string) {
    const privateChat = await prisma.privateChat.create({
        data: {
            participants: {
                connect: [{
                    userId: senderId
                }, {
                    userId: recipientId
                }]
            }
        }
    })

    return privateChat ?
        createPrivateChatWithOutSenderInfoDTO(privateChat, senderId) : null
}

export async function getPrivateChat(senderId: string, recipientId: string) {
    const privateChat = await prisma.privateChat.findFirst({
        where: {
            AND: [
                {
                    participants: {
                        some: {
                            userId: senderId
                        }
                    }
                },
                {
                    participants: {
                        some: {
                            userId: recipientId
                        }
                    }
                }
            ]
        },
        include: {
            participants: true
        }
    })

    return privateChat ?
        createPrivateChatWithOutSenderInfoDTO(privateChat, senderId) : null
}

export async function getPrivateChatHistory(userId: string) {
    const privateChats = await prisma.privateChat.findMany({
        where: {
            participants: {
                some: {
                    userId: userId
                }
            }
        },

        include: {
            participants: true
        },

        orderBy: {
            updatedAt: 'desc'
        }
    })

    return privateChats.map(curr => createPrivateChatWithOutSenderInfoDTO(curr, userId))
}
export async function updatePrivateChatDate(privateChatId: string) {
    await prisma.privateChat.update({
        where: {
            privateChatId: privateChatId
        },

        data: {
            updatedAt: new Date()
        }
    })
}
