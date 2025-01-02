import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import prisma from '@/server/prisma'

export async function GET(request: NextRequest) {
    try {
        // Get the userId from the URL search params
        const { searchParams } = new URL(request.url)
        const userId = searchParams.get('userId')

        // If userId is provided, fetch forms for that user
        // If not, fetch all forms (admin functionality)
        const forms = await prisma.forms.findMany({
            where: userId
                ? {
                      userID: userId, // Assuming your form model has a userId field
                  }
                : undefined,
            orderBy: {
                createdAt: 'desc',
            },
        })

        return NextResponse.json(forms)
    } catch (error) {
        console.error('[FORMS_GET]', error)
        return NextResponse.json(
            { error: 'Error fetching forms' },
            { status: 500 },
        )
    }
}

// export async function POST(req: Request) {
//     try {
//         const {
//             userID,
//             title,
//             description,
//             questions,
//             manySubmission,
//             editable,
//             deadline,
//         } = await req.json()

//         if (!userID) {
//             return new NextResponse('Unauthorized', { status: 401 })
//         }

//         // Validation
//         if (!title) {
//             return new NextResponse('Title is required', { status: 400 })
//         }

//         if (!questions || !Array.isArray(questions) || questions.length === 0) {
//             return new NextResponse('At least one question is required', {
//                 status: 400,
//             })
//         }

//         // Create the form
//         const form = await prisma.forms.create({
//             data: {
//                 id: crypto.randomUUID(),
//                 userID,
//                 title,
//                 description: description || '',
//                 questions: questions, // Prisma will automatically stringify this
//                 manySubmission: manySubmission || false,
//                 editable: editable || false,
//                 viewCount: 0,
//                 status: 'DRAFT',
//                 submissionCount: 0,
//                 deadline: deadline
//                     ? new Date(deadline)
//                     : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Default 30 days from now
//                 // users: { connect: { id: userID } }, // assuming userID is the id of the user
//             },
//         })

//         return NextResponse.json(form)
//     } catch (error) {
//         console.error('[FORMS_POST]', error)
//         return new NextResponse('Internal Error', { status: 500 })
//     }
// }

// creating a default valued form as a DRAFT with an id
export async function POST(request: Request) {
    try {
        const { userID } = await request.json()

        const draftForm = await prisma.forms.create({
            data: {
                id: crypto.randomUUID(),
                userID,
                title: 'Untitled Form',
                description: 'Write a description for your form',
                questions: [],
                manySubmission: false,
                editable: false,
                viewCount: 0,
                status: 'DRAFT',
                submissionCount: 0,
                deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Default 30 days from now
            },
        })

        return NextResponse.json(draftForm)
    } catch (error) {
        console.error('Error creating draft form:', error)
        return NextResponse.json(
            { error: 'Failed to create draft form' },
            { status: 500 },
        )
    }
}

// export async function PATCH(
//     request: Request,
//     { params }: { params: { id: string } },
// ) {
//     try {
//         const formId = params.id
//         console.log('formId', formId)

//         const updatedData = await request.json()
//         console.log('updatedData', updatedData)
//         const updatedForm = await prisma.forms.update({
//             where: { id: formId },
//             data: updatedData,
//         })

//         return NextResponse.json(updatedForm)
//     } catch (error) {
//         console.error('Error saving form:', error)
//         return NextResponse.json(
//             { error: 'Failed to save form' },
//             { status: 500 },
//         )
//     }
// }
