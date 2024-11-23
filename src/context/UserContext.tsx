'use client'
import { createContext, useContext } from 'react'

interface UserContextType {
    user: unknown;
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider: React.FC<{
    user: unknown
    children: React.ReactNode
}> = ({ user, children }) => {
    return (
        <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext)
    if (!context) {
        console.error(
            'UserContext is not available. Did you forget to wrap your component with UserProvider?',
        )
        throw new Error('useUser must be used within a UserProvider')
    }
    return context
}
