import { PropsWithChildren } from 'react'
import { ThemeProvider } from './theme-provider'
import SessionProviderWrapper from './session-provider'
import { Session } from 'next-auth'

/**
 * Providers wrapper for all of our context providers.
 * Ex. ThemeProvider, AuthProvider, ReactQueryProvider, etc.
 * @param children
 * @returns Providers
 */

export default function Providers({
    children,
    params: { session, ...params },
}: Readonly<{
    children: React.ReactNode
    params: { session: Session }
}>) {
    return (
        <ThemeProvider>
            <SessionProviderWrapper session={session}>
                {/* Nest Providers here... */}
                {children}
            </SessionProviderWrapper>
        </ThemeProvider>
    )
}
