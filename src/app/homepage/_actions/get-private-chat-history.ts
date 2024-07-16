'use server'

import { getPrivateChatHistory } from '@/data-access/private-chat'
import { getUserIdFromSession } from '@/lib/getUserIdFromSession'
import { actionClient } from '@/lib/safe-action'

export const getPrivateMessagesListAction = actionClient
.action(async () => {
    try {
        const userId = await getUserIdFromSession()
        const privateChatList = await getPrivateChatHistory(userId)
        return { info: privateChatList}
        
    } catch (error) {
        console.error(error)
        return {error: 'Error occurs'}
        
    }
})