'use server'

import { getUserIdFromSession } from '@/lib/get-user-id-from-session'
import { actionClient } from '@/lib/safe-action'
import { getServers } from '@/data-access/server'

export const getServersAction = actionClient.action(async () => {
    try {
        const userId = await getUserIdFromSession()
        const servers = await getServers(userId)
        return { info: servers }
    } catch (error) {
        console.error('Error getting servers: ', error)
        return { error: 'Failed to get your servers' }
    }
})