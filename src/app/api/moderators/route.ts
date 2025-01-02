import { NextResponse } from 'next/server'
import prisma from '@/server/prisma'

export async function GET() {
    try {
        const moderators = await prisma.user.findMany({
            where: { role: 'MODERATOR' },
            include: {
                forms: true,
            },
        })
        return NextResponse.json(moderators)
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: 'Error fetching moderators' },
            { status: 500 },
        )
    }
}

export async function POST(req: Request) {
    const { username, email , password } = await req.json()

    try {
        const newModerator = await prisma.user.create({
            data: {
                id: crypto.randomUUID(),
                username,
                email,
                password,
                role: 'MODERATOR',
            },
        })
        return NextResponse.json(newModerator)
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: 'Error creating moderator' },
            { status: 500 },
        )
    }
}

export async function PUT(req: Request) {
    const { id, username, email } = await req.json()

    try {
        const updatedModerator = await prisma.user.update({
            where: { id },
            data: {
                username,
                email,
            },
        })
        return NextResponse.json(updatedModerator)
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: 'Error updating moderator' },
            { status: 500 },
        )
    }
}

export async function DELETE(req: Request) {
    const { id } = await req.json()

    try {
        await prisma.user.delete({ where: { id } })
        return NextResponse.json({ message: 'moderator deleted successfully' })
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: 'Error deleting moderator' },
            { status: 500 },
        )
    }
}
