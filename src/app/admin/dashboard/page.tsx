'use client'

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

// Data Definitions
const newUsersData = [
    { name: 'Last Week', value: 120 },
    { name: 'Last Month', value: 450 },
]

const formsCreatedData = [
    { name: 'Last 24h', value: 50 },
    { name: 'Last Week', value: 300 },
    { name: 'Last Month', value: 1160 },
]

const activeUsersData = [
    { name: 'Active Users', value: 75 },
    { name: 'Inactive Users', value: 25 },
]

const formsFilledData = [
    { name: 'Last 24h', value: 160 },
    { name: 'Last 7 days', value: 1600 },
    { name: 'Last 30 days', value: 6000 },
]

const feedbackReportsData = [
    { name: 'Last 24h', value: 10 },
    { name: 'Last 7 days', value: 75 },
    { name: 'Last 30 days', value: 300 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const AdminDashboard = () => (
    <div className='grid grid-cols-1 gap-4 py-4 md:grid-cols-3'>
        {/* New Users Card */}
        <Card>
            <CardHeader>
                <CardTitle>New Users</CardTitle>
                <CardDescription>Over the last week and month</CardDescription>
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
                    <BarChart data={newUsersData}>
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
                <CardDescription>Over different time periods</CardDescription>
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
                    <LineChart data={formsCreatedData}>
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
                    <BarChart data={formsFilledData}>
                        <CartesianGrid strokeDasharray='3 3' />
                        <XAxis dataKey='name' />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey='value' fill='var(--color-value)' />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>

        {/* Active Users Card (Takes Full Width) */}
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
                            data={activeUsersData}
                            cx='50%'
                            cy='50%'
                            labelLine={false}
                            outerRadius={80}
                            fill='#8884d8'
                            dataKey='value'
                        >
                            {activeUsersData.map((entry, index) => (
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

        {/* Feedback and Reports Card (Takes Full Width) */}
        <Card className='md:col-span-1'>
            <CardHeader>
                <CardTitle>Feedback and Reports</CardTitle>
                <CardDescription>Number of tickets over time</CardDescription>
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
                    <LineChart data={feedbackReportsData}>
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

export default AdminDashboard
