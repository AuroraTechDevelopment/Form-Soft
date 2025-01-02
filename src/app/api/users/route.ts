import { NextResponse } from 'next/server'
import prisma from '@/server/prisma'

export async function GET() {
    try {
        const users = await prisma.user.findMany({
            where: { role: 'USER' },
            include: {
                forms: true,
            },
        })
        return NextResponse.json(users)
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: 'Error fetching users' },
            { status: 500 },
        )
    }
}

// export async function POST(req: Request) {
//     const { username, email, role } = await req.json()

//     try {
//         const newUser = await prisma.user.create({
//             data: {
//                 id: crypto.randomUUID(),
//                 username,
//                 email,
//                 role,
//             },
//         })
//         return NextResponse.json(newUser)
//     } catch (error) {
//         console.error(error)
//         return NextResponse.json(
//             { error: 'Error creating user' },
//             { status: 500 },
//         )
//     }
// }

export async function PUT(req: Request) {
    const { id, username, email, role } = await req.json()

    try {
        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                username,
                email,
                role,
            },
        })
        return NextResponse.json(updatedUser)
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: 'Error updating user' },
            { status: 500 },
        )
    }
}

export async function DELETE(req: Request) {
    const { id } = await req.json()

    try {
        await prisma.user.delete({ where: { id } })
        return NextResponse.json({ message: 'user deleted successfully' })
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: 'Error deleting user' },
            { status: 500 },
        )
    }
}
