import { NextResponse } from 'next/server'
import prisma from '@/server/prisma'

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } },
) {
    try {
        // Parse the request body
        const {
            title,
            description,
            questions,
            status,
            manySubmission,
            editable,
            deadline,
        } = await request.json()

        // Find the form by ID and update the form fields
        const updatedForm = await prisma.forms.update({
            where: { id: params.id }, // Using the ID passed in the URL to find the form
            data: {
                title,
                description,
                questions,
                status,
                manySubmission,
                editable,
                deadline,
            },
        })

        // Return the updated form in the response
        return NextResponse.json(updatedForm)
    } catch (error) {
        console.error('Error updating form:', error)
        return NextResponse.json(
            { error: 'Failed to update form' },
            { status: 500 },
        )
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } },
) {
    try {
        const { status } = await request.json()

        // Update the form's status
        const updatedForm = await prisma.forms.update({
            where: { id: params.id },
            data: { status },
        })

        return NextResponse.json(updatedForm)
    } catch (error) {
        console.error('Error updating form status:', error)
        return NextResponse.json(
            { error: 'Failed to update form status' },
            { status: 500 },
        )
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } },
) {
    try {
        // Start a transaction to delete both the form and related submissions
        await prisma.$transaction([
            // Delete submissions associated with the form
            prisma.submissions.deleteMany({
                where: {
                    formID: params.id,
                },
            }),
            // Delete the form
            prisma.forms.delete({
                where: { id: params.id },
            }),
        ])

        // Return a success message
        return NextResponse.json({
            message: 'Form and related submissions deleted',
        })
    } catch (error) {
        console.error('Error deleting form and submissions:', error)
        return NextResponse.json(
            { error: 'Failed to delete form and submissions' },
            { status: 500 },
        )
    }
}

export async function GET(
    request: Request,
    { params }: { params: { id: string } },
) {
    try {
        // Find the form by ID
        const form = await prisma.forms.findUnique({
            where: { id: params.id },
        })

        // Return the form in the response
        return NextResponse.json(form)
    } catch (error) {
        console.error('Error fetching form:', error)
        return NextResponse.json(
            { error: 'Failed to fetch form' },
            { status: 500 },
        )
    }
}
// form submission
export async function POST(
    request: Request,
    { params }: { params: { id: string } },
) {
    try {
        const { userID, answers } = await request.json()

        // Extract formId from params
        const formId = params.id

        // Validate required fields
        if (!formId || !answers) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 },
            )
        }

        // Check if the form exists and is OPENED
        const form = await prisma.forms.findUnique({
            where: { id: formId },
        })

        if (!form) {
            return NextResponse.json(
                { error: 'Form not found' },
                { status: 404 },
            )
        }

        if (form.status !== 'OPENED') {
            return NextResponse.json(
                { error: 'Submissions are not allowed for this form' },
                { status: 403 },
            )
        }

        // Perform both operations in a transaction
        const [submission] = await prisma.$transaction([
            // Create the submission
            prisma.submissions.create({
                data: {
                    id: crypto.randomUUID(),
                    userID: userID,
                    formID: formId,
                    answers: answers,
                },
            }),
            // Increment the submission count
            prisma.forms.update({
                where: { id: formId },
                data: {
                    submissionCount: {
                        increment: 1,
                    },
                },
            }),
        ])

        return NextResponse.json(submission)
    } catch (error) {
        console.error('Failed to create submission:', error)
        return NextResponse.json(
            { error: 'Failed to create submission' },
            { status: 500 },
        )
    }
}
