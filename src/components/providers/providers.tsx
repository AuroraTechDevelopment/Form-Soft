import { ThemeProvider } from './theme-provider'

/**
 * Providers wrapper for all of our context providers.
 * Ex. ThemeProvider, AuthProvider, ReactQueryProvider, etc.
 * @param children
 * @returns Providers
 */

export default function Providers({
    children,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <ThemeProvider>
            {/* Nest Providers here... */}
            {children}
        </ThemeProvider>
    )
}
