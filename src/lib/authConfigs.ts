import { AuthOptions } from 'next-auth'
import discordProvider from 'next-auth/providers/discord'
import googleProvider from 'next-auth/providers/google'
import { ServerMisconfigurationException } from '@/lib/exception'
import { getUserInfoWithId, upsertUser } from '@/data-access/user'

const googleClientId = process.env.GOOGLE_CLIENT_ID
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET
const discordClientId = process.env.DISCORD_CLIENT_ID
const discordClientSecret = process.env.DISCORD_CLIENT_SECRET


if (!googleClientId || !googleClientSecret || !discordClientId || !discordClientSecret) 
    throw new ServerMisconfigurationException()

export const authConfigs: AuthOptions = {
    providers: [
        googleProvider({
            clientId: googleClientId,
            clientSecret: googleClientSecret
        }),

        discordProvider({
            clientId: discordClientId,
            clientSecret: discordClientSecret
        })
    ],

    session: { strategy: 'jwt' },
    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                const { id, name, email, image } = user
                try {
                    await upsertUser(id, name as string, email as string, image as string)
                    token.userId = id
                } catch (error) {
                    console.error('Error upserting user: ', error)
                }
            }
            return token
        },

        async session({ session, token }) {
            const userId = token.userId as string
            try {
                const user = await getUserInfoWithId(userId)
                if (session.user) {
                    session.user.userId = userId
                    session.user.name = user?.username
                    session.user.email = user?.email
                    session.user.image = user?.image
                } else {
                    session.user = {
                        userId: userId,
                        name: user?.username,
                        email: user?.email,
                        image: user?.image
                    }
                }
            } catch (error) {
                console.error('Error fetching user info: ', error)
            }
            return session
        }
    }
}
