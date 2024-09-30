// Source: https://github.com/prisma/prisma-examples/blob/latest/typescript/rest-nextjs-api-routes/prisma/seed.ts
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
    {
        fullName: 'Alice',
        email: 'alice@prisma.io',
    },
    {
        fullName: 'Nilu',
        email: 'nilu@prisma.io',
    },
    {
        fullName: 'Mahmoud',
        email: 'mahmoud@prisma.io',
    },
]

async function main() {
    console.log(`Start seeding ...`)

    // Users
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
