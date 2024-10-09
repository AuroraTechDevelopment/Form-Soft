'use client'

import { SetStateAction, useState } from 'react'
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

const ReportsManagementContent = () => {
    const [reports, setReports] = useState([
        {
            id: 'R001',
            reportedBy: 'User123',
            formId: 'F002',
            reason: 'Inappropriate content',
            status: 'Pending',
        },
        {
            id: 'R002',
            reportedBy: 'User456',
            formId: 'F001',
            reason: 'Spam',
            status: 'Resolved',
        },
        {
            id: 'R003',
            reportedBy: 'User789',
            formId: 'F003',
            reason: 'Offensive language',
            status: 'Under review',
        },
    ])

    const [isOpen, setIsOpen] = useState(false)
    const [currentReport, setCurrentReport] = useState({
        id: '',
        reportedBy: '',
        formId: '',
        reason: '',
        status: '',
    })

    const handleEdit = (report: SetStateAction<{ id: string; reportedBy: string; formId: string; reason: string; status: string }>) => {
        setCurrentReport(report)
        setIsOpen(true)
    }

    const handleDelete = (id: string) => {
        setReports(reports.filter((report) => report.id !== id))
    }

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        setReports(
            reports.map((report) =>
                report.id === currentReport.id ? currentReport : report,
            ),
        )
        setIsOpen(false)
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
                            <TableHead>Reported By</TableHead>
                            <TableHead>Form ID</TableHead>
                            <TableHead>Reason</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {reports.map((report) => (
                            <TableRow key={report.id}>
                                <TableCell>{report.id}</TableCell>
                                <TableCell>{report.reportedBy}</TableCell>
                                <TableCell>{report.formId}</TableCell>
                                <TableCell>{report.reason}</TableCell>
                                <TableCell>{report.status}</TableCell>
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
                                        onClick={() => handleDelete(report.id)}
                                    >
                                        <Trash className='h-4 w-4' />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
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
                                <Label
                                    htmlFor='reportedBy'
                                    className='text-right'
                                >
                                    Reported By
                                </Label>
                                <Input
                                    id='reportedBy'
                                    value={currentReport.reportedBy}
                                    onChange={(e) =>
                                        setCurrentReport({
                                            ...currentReport,
                                            reportedBy: e.target.value,
                                        })
                                    }
                                    className='col-span-3'
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='formId' className='text-right'>
                                    Form ID
                                </Label>
                                <Input
                                    id='formId'
                                    value={currentReport.formId}
                                    onChange={(e) =>
                                        setCurrentReport({
                                            ...currentReport,
                                            formId: e.target.value,
                                        })
                                    }
                                    className='col-span-3'
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='reason' className='text-right'>
                                    Reason
                                </Label>
                                <Input
                                    id='reason'
                                    value={currentReport.reason}
                                    onChange={(e) =>
                                        setCurrentReport({
                                            ...currentReport,
                                            reason: e.target.value,
                                        })
                                    }
                                    className='col-span-3'
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='status' className='text-right'>
                                    Status
                                </Label>
                                <Select
                                    onValueChange={(value) =>
                                        setCurrentReport({
                                            ...currentReport,
                                            status: value,
                                        })
                                    }
                                    defaultValue={currentReport.status}
                                >
                                    <SelectTrigger className='col-span-3'>
                                        <SelectValue placeholder='Select a status' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='Pending'>
                                            Pending
                                        </SelectItem>
                                        <SelectItem value='Under review'>
                                            Under review
                                        </SelectItem>
                                        <SelectItem value='Resolved'>
                                            Resolved
                                        </SelectItem>
                                        <SelectItem value='Dismissed'>
                                            Dismissed
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
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
