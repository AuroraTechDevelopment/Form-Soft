import { NextResponse } from 'next/server'
import prisma from '@/server/prisma'

export async function DELETE() {
    const userId = '9f78eb4d-d2b5-4365-822a-a11d2ecc28h1' // Temporarily hardcode the user ID

    try {
        await prisma.user.delete({
            where: { id: userId },
        })
        // Optionally log out the user or perform additional cleanup actions
        return NextResponse.json(
            { message: 'Account deleted successfully' },
            { status: 200 },
        )
    } catch (error) {
        console.error(error) // Log the error for debugging
        return NextResponse.json(
            { message: 'Error deleting account' },
            { status: 500 },
        )
    }
}
