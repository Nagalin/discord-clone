'use server'

import { getPrivateChatList } from "@/data-access/private-chat";
import { getUserIdFromSession } from "@/lib/getUserIdFromSession";
import { actionClient } from "@/lib/safe-action";

export const getPrivateMessagesListAction = actionClient
.action(async () => {
    try {
        const userId = await getUserIdFromSession()
        const privateChatList = await getPrivateChatList(userId)
        return { info: privateChatList}
        
    } catch (error) {
        console.error(error)
        return {error: 'Error occurs'}
        
    }
})