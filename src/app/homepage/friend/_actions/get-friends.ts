'use server'

import { getFriendsByUserId } from '@/data-access/friendship'
import { getUserIdFromSession } from '@/lib/getUserIdFromSession'
import { actionClient } from '@/lib/safe-action'

export const getFriendsAction = actionClient.action(async () => {
    try {
        const userId = await getUserIdFromSession()
        const friends = await getFriendsByUserId(userId)
        return { info: friends }
    } catch (error) {
        console.error('Error getting friends: ', error)
        return { error: 'Error occurs' }
    }
})