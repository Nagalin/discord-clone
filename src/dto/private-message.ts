import { z } from 'zod'

export const privateMessage = z.object({
    privateMessageId: z.string().uuid(),
    content: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
})

type PrivateMessageType = z.infer<typeof privateMessage>

export function createPrivateMessageDTO(privateMessaeg: PrivateMessageType) {
    return privateMessage.parse(privateMessaeg)
}