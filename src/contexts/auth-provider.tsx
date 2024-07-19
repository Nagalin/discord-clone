import React, { createContext, ReactNode, useContext } from 'react'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { AuthException } from '@/lib/exception'
import { UserType } from '@/dto/user'

const AuthContext = createContext<UserType | undefined>(undefined)

export const useAuthContext = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error('Context is not initiailized')

    return context
}

type AuthProviderPropsType = {
    children: ReactNode
}

const AuthProvider = ({ children }: AuthProviderPropsType) => {
    const { data: session, status } = useSession()
    const pathname = usePathname()

    if (pathname === '/')
        return <>{children}</>
    if (status === 'loading') return
    if (!session) throw new AuthException()

    const user = session.user
    return (
        <AuthContext.Provider value={{
            userId: user.userId,
            username: user.name,
            image: user.image,
            email: user.email
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider