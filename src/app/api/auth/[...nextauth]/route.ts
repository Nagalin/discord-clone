import NextAuth from 'next-auth/next'
import { authConfigs } from '@/lib/authConfigs'

const handler = NextAuth(authConfigs)

export { handler as GET, handler as POST}