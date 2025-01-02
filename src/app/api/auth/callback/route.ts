import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')

    if (code) {
        const supabase = createClient()
        const { data, error } = await supabase.auth.exchangeCodeForSession(code)

        if (!error) {
            const forwardedHost = request.headers.get('x-forwarded-host')
            const isLocalEnv = process.env.NODE_ENV === 'development'

            // Check if user's email contains @survai
            const baseUrl = isLocalEnv
                ? origin
                : forwardedHost
                  ? `https://${forwardedHost}`
                  : origin

            const redirectPath = data.user?.email?.includes('@survai')
                ? '/admin/dashboard'
                : '/dashboard/forms'

            return NextResponse.redirect(`${baseUrl}${redirectPath}`)
        }
    }

    // return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
