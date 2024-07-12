import { createPrivateChatDTO } from '@/dto/private-chat'
import { createUserDTO } from '@/dto/user'
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

    return createPrivateChatDTO(privateChat)
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
    return privateChat?  createPrivateChatDTO(privateChat) : null
}

export async function getRecipientInfo(privateChatId: string, senderId: string) {
    const privateChat = await prisma.privateChat.findFirst({
        where: {
            privateChatId: privateChatId
        },

        include: {
            participants: true
        }
    })
    const recipient = privateChat?.participants.find(currParticipant => currParticipant.userId !== senderId)!
    return createUserDTO(recipient)

}