'use server'

import { getUserIdFromSession } from '@/lib/get-user-id-from-session'
import { actionClient } from '@/lib/safe-action'
import { getUnreadMessages } from '@/data-access/private-messages'

export const getUnreadMessagesAction = actionClient
    .action(async () => {
        try {
            const userId = await getUserIdFromSession()
            const unreadMessages = await getUnreadMessages(userId)
            return { info: unreadMessages }
        } catch (error) {
            console.error('Error getting unread message: ',error)
            return { error: 'Failed to get unread message notification ...' }
        }
    })