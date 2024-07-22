'use server'

import { getUserIdFromSession } from '@/lib/get-user-id-from-session'
import { actionClient } from '@/lib/safe-action'
import { getPrivateChatHistory } from '@/data-access/private-chat'

export const getPrivateChatHistoryAction = actionClient
    .action(async () => {
        try {
            const userId = await getUserIdFromSession()
            const privateChatHistory = await getPrivateChatHistory(userId)
            return { info: privateChatHistory }
        } catch (error) {
            console.error(error)
            return { error: 'Failed to get data ...' }
        }
    })