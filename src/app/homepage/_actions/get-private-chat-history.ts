'use server'

import { getUserIdFromSession } from '@/lib/get-user-id-from-session'
import { actionClient } from '@/lib/safe-action'
import { getPrivateChatHistory } from '@/data-access/private-chat'

export const getPrivateChatHistoryAction = actionClient
    .action(async () => {
        try {
            const userId = await getUserIdFromSession()
            const privateChatList = await getPrivateChatHistory(userId)
            return { info: privateChatList }
        } catch (error) {
            console.error(error)
            return { error: 'Error occurs' }
        }
    })