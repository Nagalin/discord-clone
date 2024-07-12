'use server'

import { getRecipientInfo } from "@/data-access/private-chat";
import { getUserIdFromSession } from "@/lib/getUserIdFromSession";
import { actionClient } from "@/lib/safe-action";
import { z } from "zod";

const schema = z.object({
    privateChatId: z.string().uuid()
})

export const getRecipientAction = actionClient
.schema(schema).action(async ({parsedInput: {privateChatId}}) => {
    try {
        const senderId = await getUserIdFromSession()
        const recipient = await getRecipientInfo(privateChatId, senderId)
        return { info: recipient}
        
    } catch (error) {
        
    }
})