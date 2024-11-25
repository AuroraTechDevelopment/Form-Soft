'use client'

import { ThemeProvider } from './theme-provider'
import { UserProvider } from '@/context/UserContext'

/**
 * Providers wrapper for all of our context providers.
 * Ex. ThemeProvider, AuthProvider, ReactQueryProvider, etc.
 * @param children
 * @returns Providers
 */

export default function Providers({
    children,
    user, // Pass the `user` prop if needed
}: Readonly<{
    children: React.ReactNode
    user: unknown // Adjust the type if the `user` has a specific structure
}>) {
    return (
        <ThemeProvider>
            <UserProvider user={user}>{children}</UserProvider>
        </ThemeProvider>
    )
}
