import { z } from 'zod'
import { UserSchemaBase, UserType } from '@/dto/user'

export const PrivateMessageSchemaBase = z.object({
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


export const PrivateMessageSchemaWithSenderInfoSchema = PrivateMessageSchemaBase.extend({
    sender: UserSchemaBase,
})

const UnreadMessagesSchema = z.object({
    user: UserSchemaBase,
    unreadMessagesCount: z.number()

})

export type PrivateMessageType = z.infer<typeof PrivateMessageSchemaBase>
export type UnreadMessagesType = z.infer<typeof UnreadMessagesSchema>
export type PrivateMessageSchemaWithSenderInfoType = z.infer<typeof PrivateMessageSchemaWithSenderInfoSchema>

export function createPrivateMessageDTO(privateMessage: PrivateMessageType) {
    return PrivateMessageSchemaBase.parse(privateMessage)
}

export function createUnreadMessagesDTO(unreadMessages: PrivateMessageSchemaWithSenderInfoType[]) {
    const userUnreadMessagesArray: { user: UserType, unreadMessagesCount: number }[] = []

    unreadMessages.forEach(message => {
        if (message.sender) {
            let existingEntry = userUnreadMessagesArray.find(entry => entry.user.userId === message.sender.userId)

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

    return UnreadMessagesSchema.array().parse(userUnreadMessagesArray)
}