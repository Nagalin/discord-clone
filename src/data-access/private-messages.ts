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