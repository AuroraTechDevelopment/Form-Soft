import { NextResponse } from 'next/server'
import prisma from '@/server/prisma'

export async function GET() {
    try {
        // Get the last 30 days date for comparison
        const thirtyDaysAgo = new Date()
        const sevenDaysAgo = new Date()
        const twentyFourHoursAgo = new Date()

        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
        twentyFourHoursAgo.setDate(twentyFourHoursAgo.getDate() - 1)

        // New Users Data
        const lastWeekUsers = await prisma.user.count({
            where: {
                createdAt: {
                    gte: sevenDaysAgo,
                },
            },
        })

        const lastMonthUsers = await prisma.user.count({
            where: {
                createdAt: {
                    gte: thirtyDaysAgo,
                },
            },
        })

        // Forms Created Data
        const last24HForms = await prisma.forms.count({
            where: {
                createdAt: {
                    gte: twentyFourHoursAgo,
                },
            },
        })

        const lastWeekForms = await prisma.forms.count({
            where: {
                createdAt: {
                    gte: sevenDaysAgo,
                },
            },
        })

        const lastMonthForms = await prisma.forms.count({
            where: {
                createdAt: {
                    gte: thirtyDaysAgo,
                },
            },
        })

        // Active Users Data
        const activeUsers = await prisma.user.count({
            where: {
                forms: {
                    some: {
                        createdAt: {
                            gte: sevenDaysAgo,
                        },
                    },
                },
            },
        })

        const totalUsers = await prisma.user.count()
        const inactiveUsers = totalUsers - activeUsers

        // Forms Filled Data (Submissions)
        const last24HSubmissions = await prisma.submissions.count({
            where: {
                createdAt: {
                    gte: twentyFourHoursAgo,
                },
            },
        })

        const lastWeekSubmissions = await prisma.submissions.count({
            where: {
                createdAt: {
                    gte: sevenDaysAgo,
                },
            },
        })

        const lastMonthSubmissions = await prisma.submissions.count({
            where: {
                createdAt: {
                    gte: thirtyDaysAgo,
                },
            },
        })

        // Feedback and Reports Data
        const last24HReports = await prisma.reports.count({
            where: {
                createAt: {
                    gte: twentyFourHoursAgo,
                },
            },
        })

        const lastWeekReports = await prisma.reports.count({
            where: {
                createAt: {
                    gte: sevenDaysAgo,
                },
            },
        })

        const lastMonthReports = await prisma.reports.count({
            where: {
                createAt: {
                    gte: thirtyDaysAgo,
                },
            },
        })

        return NextResponse.json({
            newUsers: [
                { name: 'Last Week', value: lastWeekUsers },
                { name: 'Last Month', value: lastMonthUsers },
            ],
            formsCreated: [
                { name: 'Last 24h', value: last24HForms },
                { name: 'Last Week', value: lastWeekForms },
                { name: 'Last Month', value: lastMonthForms },
            ],
            activeUsers: [
                { name: 'Active Users', value: activeUsers },
                { name: 'Inactive Users', value: inactiveUsers },
            ],
            formsFilled: [
                { name: 'Last 24h', value: last24HSubmissions },
                { name: 'Last 7 days', value: lastWeekSubmissions },
                { name: 'Last 30 days', value: lastMonthSubmissions },
            ],
            feedbackReports: [
                { name: 'Last 24h', value: last24HReports },
                { name: 'Last 7 days', value: lastWeekReports },
                { name: 'Last 30 days', value: lastMonthReports },
            ],
        })
    } catch (error) {
        console.error('Dashboard API Error:', error)
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 },
        )
    }
}
