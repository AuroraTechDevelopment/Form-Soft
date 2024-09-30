import prisma from '@/server/prisma'
import { Prisma } from '@prisma/client'
import { hash } from 'bcrypt'
import { NextRequest } from 'next/server'
import { faker } from '@faker-js/faker'

/**
 * Create a new user.
 * @param req request
 * @param res response
 * @async
 * @returns Response object with status 200 and the created user or an error message
 */
export async function POST(req: NextRequest) {
    try {
        const { email, password, fullName, role } = await req.json()
        console.log('email', email)
        console.log('password', password)
        console.log('fullName', fullName)
        console.log('role', role)

        if (!email || !password) {
            return new Response(
                'Error: Email and Password are required to create a User.\n',
                { status: 400 },
            )
        }
        if (role && role.toUpperCase() == 'ADMIN') {
            return new Response('Error: Cannot create an Admin User.\n', {
                status: 400,
            })
        }

        // Random username if fullName is not provided (Faster signup process)
        const name = fullName || faker.internet.userName()
        console.log('email', email)
        console.log('password', password)
        console.log('fullName', fullName)
        console.log('role', role)

        const hashedPassword = await hash(
            password,
            Number(process.env.SALT_ROUNDS!),
        )

        const user = await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
                username: email.split('@')[0],
                fullName: name,
                role: role || 'USER',
            },
        })
        return new Response('User Created Successfully.\n', { status: 200 })
    } catch (error) {
        console.error(error)
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return new Response(
                    'Error: Email already exists. Please use a different email.',
                    { status: 400 },
                )
            }
        }
        return new Response('Error Creating User(s).\n' + error, {
            status: 500,
        })
    }
}
