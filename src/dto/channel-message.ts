import { z } from "zod";
import { channelSchema } from "./channel";
import { userSchema } from "./user";

const channelMessageSchema = z.object({
    channelMessageId: z.string().uuid(),
    sender: userSchema.optional(),
    senderId: z.string(),
    content: z.string(),
    channel: channelSchema.optional(),
    channelId: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
})

export type ChannelMessageType = z.infer<typeof channelMessageSchema>