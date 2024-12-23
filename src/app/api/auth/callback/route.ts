import { NextResponse } from 'next/server'
// The client you created from the Server-Side Auth instructions
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    console.log('searchParams:', searchParams)
    const code = searchParams.get('code')
    // if "next" is in param, use it as the redirect URL
    // const next = searchParams.get('next') ?? '/'

    if (code) {
        const supabase = createClient()
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        if (!error) {
            const forwardedHost = request.headers.get('x-forwarded-host') // original origin before load balancer
            const isLocalEnv = process.env.NODE_ENV === 'development'
            if (isLocalEnv) {
                console.log('isLocalEnv:', isLocalEnv)
                // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
                return NextResponse.redirect(`${origin}/dashboard/forms`)
            } else if (forwardedHost) {
                console.log('forwardedHost:', forwardedHost)
                return NextResponse.redirect(
                    `https://${forwardedHost}/dashboard/forms`,
                )
            } else {
                console.log('origin:', origin)
                return NextResponse.redirect(`${origin}$/dashboard/forms`)
            }
        }
    }

    // return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
