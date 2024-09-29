import { PropsWithChildren } from 'react'
import { ThemeProvider } from './theme-provider'

/**
 * Providers wrapper for all of our context providers.
 * Ex. ThemeProvider, AuthProvider, ReactQueryProvider, etc.
 * @param children
 * @returns Providers
 */

export default function Providers({ children }: PropsWithChildren) {
    return (
        <ThemeProvider>
            {/* Nest Providers here... */}
            {children}
        </ThemeProvider>
    )
}
