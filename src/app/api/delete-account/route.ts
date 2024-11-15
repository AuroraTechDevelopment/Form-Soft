import { NextResponse } from 'next/server'
import prisma from '@/server/prisma'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client with admin privileges
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!, 
)

export async function DELETE(req: Request) {
    try {
        const { userId } = await req.json()

        // Delete the user from Prisma database
        await prisma.user.delete({
            where: { id: userId },
        })

        // Delete the user from Supabase Authentication
        const { error } = await supabaseAdmin.auth.admin.deleteUser(userId)
        if (error) {
            console.error('Supabase error:', error)
            return NextResponse.json(
                { message: 'Error deleting user from Supabase' },
                { status: 500 },
            )
        }

        return NextResponse.json(
            { message: 'Account deleted successfully' },
            { status: 200 },
        )
    } catch (error) {
        console.error(error) // Log any errors for debugging
        return NextResponse.json(
            { message: 'Error deleting account' },
            { status: 500 },
        )
    }
}
