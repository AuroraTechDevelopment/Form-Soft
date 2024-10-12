'use client'

import { useState, useEffect } from 'react'
import { Pencil, Trash } from 'lucide-react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Report } from '@/types/types'

const ReportsManagementContent = () => {
    const [reports, setReports] = useState<Report[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const [currentReport, setCurrentReport] = useState<Report>({
        id: '',
        formID: '',
        userID: '',
        category: '',
        comment: '',
        createAt: new Date(),
        forms: { id: '' }, // Adjust to match your form data structure
        users: { id: '' }, // Adjust to match your user data structure
    })

    // Fetch reports from the API when the component mounts
    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await fetch('/api/reports')
                const data = await response.json()
                setReports(data)
            } catch (error) {
                console.error('Error fetching reports:', error)
            }
        }

        fetchReports()
    }, [])

    // Handle editing a report
    const handleEdit = (report: Report) => {
        setCurrentReport(report)
        setIsOpen(true)
    }

    // Handle deleting a report
    const handleDelete = async (id: string) => {
        try {
            const response = await fetch('/api/reports', {
                method: 'DELETE',
                body: JSON.stringify({ id }),
            })
            if (response.ok) {
                setReports(reports.filter((report) => report.id !== id))
            } else {
                console.error('Error deleting report:', response.statusText)
            }
        } catch (error) {
            console.error('Error deleting report:', error)
        }
    }

    // Handle submitting the updated report
    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        try {
            const response = await fetch(`/api/reports/${currentReport.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(currentReport),
            })
            if (response.ok) {
                setReports(
                    reports.map((report) =>
                        report.id === currentReport.id ? currentReport : report,
                    ),
                )
                setIsOpen(false)
            } else {
                console.error('Error updating report:', response.statusText)
            }
        } catch (error) {
            console.error('Error updating report:', error)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Reports Management</CardTitle>
                <CardDescription>Overview of all reports</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Report ID</TableHead>
                            <TableHead>Reported By (User ID)</TableHead>
                            <TableHead>Form ID</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Comment</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {reports.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className='text-center'>
                                    No reports available
                                </TableCell>
                            </TableRow>
                        ) : (
                            reports.map((report) => (
                                <TableRow key={report.id}>
                                    <TableCell>{report.id}</TableCell>
                                    <TableCell>{report.userID}</TableCell>
                                    <TableCell>{report.formID}</TableCell>
                                    <TableCell>{report.category}</TableCell>
                                    <TableCell>{report.comment}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant='ghost'
                                            size='sm'
                                            onClick={() => handleEdit(report)}
                                        >
                                            <Pencil className='h-4 w-4' />
                                        </Button>
                                        <Button
                                            variant='ghost'
                                            size='sm'
                                            onClick={() =>
                                                handleDelete(report.id)
                                            }
                                        >
                                            <Trash className='h-4 w-4' />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </CardContent>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Report</DialogTitle>
                        <DialogDescription>
                            Edit the report details below
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className='grid gap-4 py-4'>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='userID' className='text-right'>
                                    Reported By (User ID)
                                </Label>
                                <Input
                                    id='userID'
                                    value={currentReport.userID || ''}
                                    onChange={(e) =>
                                        setCurrentReport({
                                            ...currentReport,
                                            userID: e.target.value,
                                        })
                                    }
                                    className='col-span-3'
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='formID' className='text-right'>
                                    Form ID
                                </Label>
                                <Input
                                    id='formID'
                                    value={currentReport.formID}
                                    onChange={(e) =>
                                        setCurrentReport({
                                            ...currentReport,
                                            formID: e.target.value,
                                        })
                                    }
                                    className='col-span-3'
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label
                                    htmlFor='category'
                                    className='text-right'
                                >
                                    Category
                                </Label>
                                <Input
                                    id='category'
                                    value={currentReport.category}
                                    onChange={(e) =>
                                        setCurrentReport({
                                            ...currentReport,
                                            category: e.target.value,
                                        })
                                    }
                                    className='col-span-3'
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='comment' className='text-right'>
                                    Comment
                                </Label>
                                <Input
                                    id='comment'
                                    value={currentReport.comment}
                                    onChange={(e) =>
                                        setCurrentReport({
                                            ...currentReport,
                                            comment: e.target.value,
                                        })
                                    }
                                    className='col-span-3'
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type='submit'>Save Changes</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </Card>
    )
}

export default ReportsManagementContent
