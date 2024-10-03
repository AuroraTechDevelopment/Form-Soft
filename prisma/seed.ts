// Source: https://github.com/prisma/prisma-examples/blob/latest/typescript/rest-nextjs-api-routes/prisma/seed.ts
import { PrismaClient, Prisma } from '@prisma/client'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()

const getUsersData = async () => {
    const userData: Prisma.UserCreateInput[] = [
        {
            name: 'Alice',
            email: 'alice@prisma.io',
            password: await hash('Alice@1', process.env.SALT_ROUNDS!),
            username: 'alice',
        },
        {
            name: 'Nilu',
            email: 'nilu@prisma.io',
            password: await hash('Nilu@1', process.env.SALT_ROUNDS!),
            username: 'nilu',
        },
        {
            name: 'Mahmoud',
            email: 'mahmoud@prisma.io',
            password: await hash('Mahmoud@1', process.env.SALT_ROUNDS!),
            username: 'mahmoud',
        },
    ]
    return userData
}

async function main() {
    console.log(`Start seeding ...`)

    // Users
    const userData = await getUsersData()
    for (const u of userData) {
        const user = await prisma.user.create({
            data: u,
        })
        console.log(`Created user with id: ${user.id}`)
    }

    // Other seedings ...

    console.log(`Seeding finished.`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
