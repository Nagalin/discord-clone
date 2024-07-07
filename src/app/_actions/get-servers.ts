'use server'

import { getServers } from '@/data-access/server'
import { getUserIdFromSession } from '@/lib/getUserIdFromSession'
import { actionClient } from '@/lib/safe-action'

export const getServersAction = actionClient.action(async () => {
    try {
        const userId = await getUserIdFromSession()
        const servers = await getServers(userId)
        return  {info: servers}
        
    } catch (error) {
        console.error('Error getting servers: ', error)
        return {error: 'Error occurs'}
    }
})