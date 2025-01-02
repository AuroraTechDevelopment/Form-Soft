'use client'

import { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
} from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

type ChartData = {
    name: string
    value: number
}

type DashboardData = {
    newUsers: ChartData[]
    formsCreated: ChartData[]
    activeUsers: ChartData[]
    formsFilled: ChartData[]
    feedbackReports: ChartData[]
}

const AdminDashboard = () => {
    const [data, setData] = useState<DashboardData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await fetch('/api/admin/dashboard')
                if (!response.ok) {
                    throw new Error('Failed to fetch dashboard data')
                }
                const dashboardData = await response.json()
                setData(dashboardData)
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : 'An error occurred',
                )
            } finally {
                setLoading(false)
            }
        }

        fetchDashboardData()
    }, [])

    if (loading) {
        return <div>Loading dashboard data...</div>
    }

    if (error) {
        return <div>Error loading dashboard: {error}</div>
    }

    if (!data) {
        return <div>No data available</div>
    }

    return (
        <div className='grid grid-cols-1 gap-4 py-4 md:grid-cols-3'>
            {/* New Users Card */}
            <Card>
                <CardHeader>
                    <CardTitle>New Users</CardTitle>
                    <CardDescription>
                        Over the last week and month
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer
                        config={{
                            value: {
                                label: 'New Users',
                                color: 'hsl(var(--chart-1))',
                            },
                        }}
                        className='h-[160px] w-full'
                    >
                        <BarChart data={data.newUsers}>
                            <CartesianGrid strokeDasharray='3 3' />
                            <XAxis dataKey='name' />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey='value' fill='var(--color-value)' />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            {/* Forms Created Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Forms Created</CardTitle>
                    <CardDescription>
                        Over different time periods
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer
                        config={{
                            value: {
                                label: 'Forms Created',
                                color: 'hsl(var(--chart-2))',
                            },
                        }}
                        className='h-[160px] w-full'
                    >
                        <LineChart data={data.formsCreated}>
                            <CartesianGrid strokeDasharray='3 3' />
                            <XAxis dataKey='name' />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Line
                                type='monotone'
                                dataKey='value'
                                stroke='var(--color-value)'
                            />
                        </LineChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            {/* Forms Filled Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Forms Filled</CardTitle>
                    <CardDescription>
                        Total amount over different periods
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer
                        config={{
                            value: {
                                label: 'Forms Filled',
                                color: 'hsl(var(--chart-4))',
                            },
                        }}
                        className='h-[160px] w-full'
                    >
                        <BarChart data={data.formsFilled}>
                            <CartesianGrid strokeDasharray='3 3' />
                            <XAxis dataKey='name' />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey='value' fill='var(--color-value)' />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            {/* Active Users Card */}
            <Card className='md:col-span-2'>
                <CardHeader>
                    <CardTitle>Recently Active Users</CardTitle>
                    <CardDescription>
                        Created a form in the last 7 days
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer
                        config={{
                            value: {
                                label: 'Active Users',
                                color: 'hsl(var(--chart-3))',
                            },
                        }}
                        className='h-[160px] w-full'
                    >
                        <PieChart>
                            <Pie
                                data={data.activeUsers}
                                cx='50%'
                                cy='50%'
                                labelLine={false}
                                outerRadius={80}
                                fill='#8884d8'
                                dataKey='value'
                            >
                                {data.activeUsers.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <ChartTooltip content={<ChartTooltipContent />} />
                        </PieChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            {/* Feedback and Reports Card */}
            <Card className='md:col-span-1'>
                <CardHeader>
                    <CardTitle>Feedback and Reports</CardTitle>
                    <CardDescription>
                        Number of tickets over time
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer
                        config={{
                            value: {
                                label: 'Tickets',
                                color: 'hsl(var(--chart-5))',
                            },
                        }}
                        className='h-[160px] w-full'
                    >
                        <LineChart data={data.feedbackReports}>
                            <CartesianGrid strokeDasharray='3 3' />
                            <XAxis dataKey='name' />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Line
                                type='monotone'
                                dataKey='value'
                                stroke='var(--color-value)'
                            />
                        </LineChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    )
}

export default AdminDashboard
