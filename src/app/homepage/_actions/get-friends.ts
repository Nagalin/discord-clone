'use server'

import { getUserIdFromSession } from '@/lib/get-user-id-from-session'
import { actionClient } from '@/lib/safe-action'
import { getFriends } from '@/data-access/user'

export const getFriendsAction = actionClient.action(async () => {
    try {
        const userId = await getUserIdFromSession()
        const friends = await getFriends(userId)
        return { info: friends }
    } catch (error) {
        console.error('Error getting friends: ', error)
        return { error: 'Failed to get friends .....' }
    }
})