import { z } from 'zod'
import { userSchema, UserType } from '@/dto/user'

export const privateMessageSchema = z.object({
    privateMessageId: z.string().uuid(),
    content: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    read: z.boolean(),
    sender: userSchema.optional(),
    senderId: z.string(),
    recipientId: z.string(),
    recipient: userSchema.optional()
})

export type PrivateMessageType = z.infer<typeof privateMessageSchema>

export function createPrivateMessageDTO(privateMessage: PrivateMessageType) {
    return privateMessageSchema.parse(privateMessage)
}

export function createUnreadMessagesDTO(unreadMessages: PrivateMessageType[]) {
    console.log('here', unreadMessages)
    const userUnreadMessagesMap: Record<string, { user: UserType, unreadMessagesCount: number }> = {}

    unreadMessages.forEach(message => {
        if (message.sender) {
            const senderId = message.senderId;
            if (!userUnreadMessagesMap[senderId]) {
                userUnreadMessagesMap[senderId] = {
                    user: message.sender,
                    unreadMessagesCount: 0
                }
            }
            userUnreadMessagesMap[senderId].unreadMessagesCount += 1
        }
    })

    console.log(userUnreadMessagesMap)

    return Object.values(userUnreadMessagesMap)
}

