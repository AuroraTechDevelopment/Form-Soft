import { NextResponse } from 'next/server'
import prisma from '@/server/prisma'

export async function GET() {
    try {
        const feedbacks = await prisma.feedbacks.findMany({
            include: {
                users: true,
            },
        })

        return NextResponse.json(feedbacks)
    } catch (error) {
        console.error('Error Getting feedbacks:', error)
        return NextResponse.json(
            { error: 'Error fetching feedback' },
            { status: 500 },
        )
    }
}

export async function DELETE(req: Request) {
    try {
        const { id } = await req.json()

        // Check if the ID is provided
        if (!id) {
            return NextResponse.json(
                { error: 'Feedback ID is required' },
                { status: 400 },
            )
        }

        // Delete the feedback
        await prisma.feedbacks.delete({
            where: {
                id: id,
            },
        })

        return NextResponse.json({ message: 'Feedback deleted successfully' })
    } catch (error) {
        console.error('Error deleting feedback:', error)
        return NextResponse.json(
            { error: 'Error deleting feedback' },
            { status: 500 },
        )
    }
}
