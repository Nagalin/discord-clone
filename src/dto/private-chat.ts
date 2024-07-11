import { z } from "zod";
import { userSchema } from "./user";

const privateChatSchema = z.object({
    privateChatId: z.string().uuid(),
    createdAt: z.date(),
    updatedAt: z.date(),
    participant: userSchema.array().optional()
})

type PrivateChatType = z.infer<typeof privateChatSchema>

export function createPrivateChatDTO(privateChat: PrivateChatType) {
    return privateChatSchema.parse(privateChat)
}