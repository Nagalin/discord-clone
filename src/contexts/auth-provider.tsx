import { AuthException } from '@/lib/exception'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import React, { createContext, ReactNode, useContext } from 'react'

type AuthContextType = {
    userId: string,
    username: string,
    image: string,
    email: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

type AuthProviderPropsType = {
    children: ReactNode
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error('Context is not initiailized')

    return context
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
            userId: user?.userId,
            username: user?.name,
            image: user?.image,
            email: user?.email
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider