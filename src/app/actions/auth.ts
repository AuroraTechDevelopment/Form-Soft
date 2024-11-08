'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'
import { Provider, User } from '@supabase/supabase-js'
import {
    signInSchema,
    type SignInSchema,
    signUpSchema,
    type SignUpSchema,
} from '@/zod-schemas/auth'
import { cache } from 'react'
import { ReturnValueWithData } from '@/types/types'

export const getCurrentUser = cache(
    async (): Promise<
        ReturnValueWithData<{
            user: User
        }>
    > => {
        try {
            const supabase = createClient()
            const {
                data: { user },
                error,
            } = await supabase.auth.getUser()

            if (error) {
                return {
                    success: false,
                    error: error.message,
                }
            }

            if (user == null) {
                return {
                    success: false,
                    error: 'You need to be logged in to perform this action',
                }
            }

            return {
                success: true,
                data: {
                    user,
                },
            }
        } catch (error) {
            return {
                success: false,
                error: 'An error occurred while fetching user data' + error,
            }
        }
    },
)

export async function login(data: SignInSchema) {
    // validate the form
    const validCredentials = signInSchema.safeParse(data)
    if (!validCredentials.success) {
        return {
            success: false,
            error: validCredentials.error,
        }
    }

    const { success } = await getCurrentUser()
    if (success) {
        return {
            success: false,
            error: {
                message: 'You are already logged in',
            },
        }
    }

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword(data)
    if (error) {
        return {
            success: false,
            error: {
                ...error,
                message: error.message,
            },
        }
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function loginOAuth(provider: string) {
    // const { success } = await getCurrentUser()
    // if (success) {
    //     return {
    //         success: false,
    //         error: {
    //             message: 'You are already logged in',
    //         },
    //     }
    // }

    const supabase = createClient()
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider as Provider,
        options: {
            redirectTo: `${process.env.NEXT_PUBLIC_OAUTH_URL}/api/auth/callback`,
        },
    })

    if (error) {
        return {
            success: false,
            error: {
                ...error,
                message: error.message,
            },
        }
    }

    revalidatePath('/', 'layout')
    if (data.url) {
        redirect(data.url) // use the redirect API for your server framework
    }
    redirect('/')
}

export async function signup(data: SignUpSchema) {
    let redirectPath: string | null = null

    try {
        // validate the form
        const validCredentials = signUpSchema.safeParse(data)
        if (!validCredentials.success) {
            return {
                success: false,
                error: validCredentials.error,
            }
        }

        const { success } = await getCurrentUser()
        if (success) {
            return {
                success: false,
                error: {
                    message: 'You are already logged in',
                },
            }
        }

        const supabase = createClient()
        const { data: supabaseData, error } = await supabase.auth.signUp(data)

        console.log('supabaseData', supabaseData)
        console.log('error', error)

        // If user already exists supabase can return fake user data: https://github.com/orgs/supabase/discussions/1282
        if (supabaseData.user && supabaseData.user.identities) {
            const updated_at = new Date(supabaseData.user.updated_at!)
            const created_at = new Date(supabaseData.user.created_at)
            if (supabaseData.user.identities.length === 0)
                return {
                    success: false,
                    error: {
                        message:
                            'User already registered. Please sign in. Note: If you cannot sign in, you might be using a wrong provider (Try Google instead of Email)',
                    },
                }
            else if (updated_at.getTime() - created_at.getTime() >= 1000) {
                redirectPath = '/'
            }
        } else if (error) {
            console.log(error)
            return {
                success: false,
                error: {
                    ...error,
                    message: error.message,
                },
            }
        }
    } catch (error) {
        return {
            success: false,
            error: {
                message:
                    'An error occurred while signing up: ' +
                    (error as Error).message,
            },
        }
    } finally {
        if (redirectPath) {
            revalidatePath('/', 'layout')
            redirect(redirectPath)
        }
    }

    return {
        success: true,
        redirectPath: '/',
    }
}

export async function signOut() {
    const supabase = createClient()
    await supabase.auth.signOut()

    revalidatePath('/', 'layout')
    redirect('/')
}
