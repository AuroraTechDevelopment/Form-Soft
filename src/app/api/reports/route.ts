import { NextResponse } from 'next/server'
import prisma from '@/server/prisma'

// GET all reports
export async function GET() {
    try {
        const reports = await prisma.reports.findMany({
            include: {
                forms: true,
                users: true,
            },
        })

        return NextResponse.json(reports)
    } catch (error) {
        console.error('Error getting reports:', error)
        return NextResponse.json(
            { error: 'Error fetching reports' },
            { status: 500 },
        )
    }
}

// DELETE a report by id
export async function DELETE(request: Request) {
    try {
        const { id } = await request.json()

        if (!id) {
            return NextResponse.json(
                { error: 'Report ID is required' },
                { status: 400 },
            )
        }

        const deletedReport = await prisma.reports.delete({
            where: {
                id: id,
            },
        })

        return NextResponse.json(deletedReport)
    } catch (error) {
        console.error('Error deleting report:', error)
        return NextResponse.json(
            { error: 'Error deleting report' },
            { status: 500 },
        )
    }
}
