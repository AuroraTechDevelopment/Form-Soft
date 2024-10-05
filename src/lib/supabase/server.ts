import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { SupportedStorage } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

function supportsLocalStorage(): boolean {
    try {
        const testKey = '__test__';
        globalThis.localStorage.setItem(testKey, testKey);
        globalThis.localStorage.removeItem(testKey);
        return true;
    } catch (e) {
        return false;
    }
}

const customStorageAdapter: SupportedStorage = {
    getItem: (key) => {
        if (!supportsLocalStorage()) {
            // Configure alternate storage
            return null
        }
        return globalThis.localStorage.getItem(key)
    },
    setItem: (key, value) => {
        if (!supportsLocalStorage()) {
            // Configure alternate storage here
            return
        }
        globalThis.localStorage.setItem(key, value)
    },
    removeItem: (key) => {
        if (!supportsLocalStorage()) {
            // Configure alternate storage here
            return
        }
        globalThis.localStorage.removeItem(key)
    },
}

export function createClient() {
    const cookieStore = cookies()

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            auth: {
                debug: process.env.NODE_ENV === 'development',
                flowType: 'pkce',
            },
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options),
                        )
                    } catch {
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
        },
    )
}
