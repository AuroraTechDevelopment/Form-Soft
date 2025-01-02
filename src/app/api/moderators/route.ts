import { NextResponse } from 'next/server'
import prisma from '@/server/prisma'

export async function GET() {
    try {
        const moderators = await prisma.users.findMany({
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
    const { name, username } = await req.json()

    try {
        const newModerator = await prisma.users.create({
            data: {
                id:crypto.randomUUID(),
                name,
                username,
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
    const { id, name, username } = await req.json()

    try {
        const updatedModerator = await prisma.users.update({
            where: { id },
            data: {
                name,
                username,         
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
        await prisma.users.delete({ where: { id } })
        return NextResponse.json({ message: 'moderator deleted successfully' })
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: 'Error deleting moderator' },
            { status: 500 },
        )
    }
}
