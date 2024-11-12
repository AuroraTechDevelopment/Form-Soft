import { NextResponse } from 'next/server'
import prisma from '@/server/prisma'

// POST method to handle feedback submission
export async function POST(req: Request) {
    try {
        const { category, comment, userID } = await req.json()

        // Create feedback entry in the database using Prisma
        const feedback = await prisma.feedbacks.create({
            data: {
                id: crypto.randomUUID(), // Generate a unique ID
                category,
                comment,
                userID,
                createdAt: new Date(), // Consider Adding --> createdAt DateTime @default(now()) in schema.prisma
            },
        })

        return NextResponse.json(
            { message: 'Feedback submitted successfully', feedback },
            { status: 200 },
        )
    } catch (error) {
        console.error('Error submitting feedback:', error)
        return NextResponse.json(
            { error: 'Failed to submit feedback' },
            { status: 500 },
        )
    }
}
