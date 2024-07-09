import { getServerSession } from 'next-auth'
import { AuthException } from '@/lib/exception'
import { authConfigs } from '@/lib/authConfigs'

export async function getUserIdFromSession() {
    const session = await getServerSession(authConfigs)
    if(!session) throw new AuthException()

    return session.user.userId
}