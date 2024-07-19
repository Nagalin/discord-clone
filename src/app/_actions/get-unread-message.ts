'use server'

import { getUnreadMessages } from '@/data-access/private-messages'
import { getUserIdFromSession } from '@/lib/getUserIdFromSession'
import { actionClient } from '@/lib/safe-action'

export const getUnreadMessagesAction = actionClient
.action(async () => {
    try {

        const userId = await getUserIdFromSession()
        const unreadMessages = await getUnreadMessages(userId)
        return { info: unreadMessages }
        
    } catch (error) {
        console.error(error)
        return { error: 'Failed to get unread message notification' }
        
    }

})