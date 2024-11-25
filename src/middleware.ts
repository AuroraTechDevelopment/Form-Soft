import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Define public routes that do not require authentication
    const publicPaths = ['/', '/login', '/signup', '/about', '/contact']
    const protectedPaths = ['/admin', '/account']

    // Allow access to public routes
    if (publicPaths.some((path) => pathname.startsWith(path))) {
        return NextResponse.next()
    }

    // Enforce session updates for protected paths
    if (protectedPaths.some((path) => pathname.startsWith(path))) {
        return await updateSession(request, { protectedPaths })
    }

    // Default response for unhandled paths
    return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
    matcher: [
        /*
         * Exclude paths like:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - Static assets (e.g., images)
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
