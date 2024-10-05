'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
    const supabase = createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { data: resData, error } =
        await supabase.auth.signInWithPassword(data)

    console.log('resData:', resData)
    console.log('error name:', error?.name)
    console.log('error message:', error?.message)
    console.log('error code:', error?.code)
    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signup(formData: FormData) {
    const supabase = createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { data: resData, error } = await supabase.auth.signUp(data)

    console.log('resData:', resData)
    console.log('error name:', error?.name)
    console.log('error message:', error?.message)
    console.log('error code:', error?.code)
    // if (error) {
    //     redirect('/error')
    // }

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signOut() {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()
}
