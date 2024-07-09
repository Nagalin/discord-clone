'use server'
import { getUserIdFromSession } from '@/lib/getUserIdFromSession';
import { actionClient } from '../../../../lib/safe-action';
import { getPendingFriendship } from '@/data-access/friendship';

export const getPendingFriendRequestsAction = actionClient.action(async () => {
    try {
        const requesterId = await getUserIdFromSession()
        const pendingFriendRequests = await getPendingFriendship(requesterId)
        return {info: pendingFriendRequests}
        
    } catch (error) {
        console.error('Error getting pending friend requests: ',error)
        return {error: 'Error occurs'}
    }

})