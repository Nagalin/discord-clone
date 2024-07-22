import { z } from 'zod'
import { UserSchemaBase, UserType } from '@/dto/user'

export const privateMessageSchema = z.object({
    privateMessageId: z.string().uuid(),
    content: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    read: z.boolean(),
    sender: UserSchemaBase.optional(),
    senderId: z.string(),
    recipientId: z.string(),
    recipient: UserSchemaBase.optional()
})

const unreadMessagesSchema = z.object({
    user: UserSchemaBase,
    unreadMessagesCount: z.number()

})

export type PrivateMessageType = z.infer<typeof privateMessageSchema>
export type UnreadMessagesType = z.infer<typeof unreadMessagesSchema>

export function createPrivateMessageDTO(privateMessage: PrivateMessageType) {
    return privateMessageSchema.parse(privateMessage)
}

export function createUnreadMessagesDTO(unreadMessages: PrivateMessageType[]) {
    // Create an array to hold the unread messages data
    const userUnreadMessagesArray: { user: UserType, unreadMessagesCount: number }[] = []

    unreadMessages.forEach(message => {
        if (message.sender) {
            let existingEntry = userUnreadMessagesArray.find(entry => entry.user.userId === message.sender!.userId)

            if (existingEntry) {
                existingEntry.unreadMessagesCount += 1
            } else {
                userUnreadMessagesArray.push({
                    user: message.sender,
                    unreadMessagesCount: 1
                })
            }
        }
    })

    return z.array(unreadMessagesSchema).parse(userUnreadMessagesArray)
}