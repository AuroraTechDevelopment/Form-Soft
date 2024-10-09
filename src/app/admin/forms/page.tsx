'use client'

import { SetStateAction, useState } from 'react'
import { Plus, Pencil, Trash } from 'lucide-react'
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

const FormManagementContent = () => {
    const [forms, setForms] = useState([
        {
            id: 'F001',
            title: 'Customer Feedback',
            createdBy: 'John Doe',
            submissions: 150,
            lastUpdated: '2023-06-15',
        },
        {
            id: 'F002',
            title: 'Employee Survey',
            createdBy: 'Jane Smith',
            submissions: 75,
            lastUpdated: '2023-06-14',
        },
        {
            id: 'F003',
            title: 'Product Registration',
            createdBy: 'Bob Johnson',
            submissions: 300,
            lastUpdated: '2023-06-13',
        },
    ])

    const [isOpen, setIsOpen] = useState(false)
    const [currentForm, setCurrentForm] = useState({
        id: '',
        title: '',
        createdBy: '',
        submissions: 0,
    })
    const [isEditing, setIsEditing] = useState(false)

    const handleCreate = () => {
        setIsEditing(false)
        setCurrentForm({ id: '', title: '', createdBy: '', submissions: 0 })
        setIsOpen(true)
    }

    const handleEdit = (form: SetStateAction<{ id: string; title: string; createdBy: string; submissions: number }>) => {
        setIsEditing(true)
        setCurrentForm(form)
        setIsOpen(true)
    }

    const handleDelete = (id: string) => {
        setForms(forms.filter((form) => form.id !== id))
    }

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        if (isEditing) {
            setForms(
                forms.map((form) =>
                    form.id === currentForm.id
                        ? {
                              ...currentForm,
                              lastUpdated: new Date()
                                  .toISOString()
                                  .split('T')[0],
                          }
                        : form,
                ),
            )
        } else {
            setForms([
                ...forms,
                {
                    ...currentForm,
                    id: `F${forms.length + 1}`.padStart(4, '0'),
                    submissions: 0,
                    lastUpdated: new Date().toISOString().split('T')[0],
                },
            ])
        }
        setIsOpen(false)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Form Management</CardTitle>
                <CardDescription>Overview of all forms</CardDescription>
            </CardHeader>
            <CardContent>
                <Button onClick={handleCreate} className='mb-4'>
                    <Plus className='mr-2 h-4 w-4' /> Create New Form
                </Button>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Form ID</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Created By</TableHead>
                            <TableHead>Submissions</TableHead>
                            <TableHead>Last Updated</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {forms.map((form) => (
                            <TableRow key={form.id}>
                                <TableCell>{form.id}</TableCell>
                                <TableCell>{form.title}</TableCell>
                                <TableCell>{form.createdBy}</TableCell>
                                <TableCell>{form.submissions}</TableCell>
                                <TableCell>{form.lastUpdated}</TableCell>
                                <TableCell>
                                    <Button
                                        variant='ghost'
                                        size='sm'
                                        onClick={() => handleEdit(form)}
                                    >
                                        <Pencil className='h-4 w-4' />
                                    </Button>
                                    <Button
                                        variant='ghost'
                                        size='sm'
                                        onClick={() => handleDelete(form.id)}
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
                        <DialogTitle>
                            {isEditing ? 'Edit Form' : 'Create New Form'}
                        </DialogTitle>
                        <DialogDescription>
                            {isEditing
                                ? 'Edit the form details below'
                                : 'Enter the details for the new form'}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className='grid gap-4 py-4'>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='title' className='text-right'>
                                    Title
                                </Label>
                                <Input
                                    id='title'
                                    value={currentForm.title}
                                    onChange={(e) =>
                                        setCurrentForm({
                                            ...currentForm,
                                            title: e.target.value,
                                        })
                                    }
                                    className='col-span-3'
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label
                                    htmlFor='createdBy'
                                    className='text-right'
                                >
                                    Created By
                                </Label>
                                <Input
                                    id='createdBy'
                                    value={currentForm.createdBy}
                                    onChange={(e) =>
                                        setCurrentForm({
                                            ...currentForm,
                                            createdBy: e.target.value,
                                        })
                                    }
                                    className='col-span-3'
                                />
                            </div>
                            {isEditing && (
                                <div className='grid grid-cols-4 items-center gap-4'>
                                    <Label
                                        htmlFor='submissions'
                                        className='text-right'
                                    >
                                        Submissions
                                    </Label>
                                    <Input
                                        id='submissions'
                                        type='number'
                                        value={currentForm.submissions}
                                        onChange={(e) =>
                                            setCurrentForm({
                                                ...currentForm,
                                                submissions: parseInt(
                                                    e.target.value,
                                                ),
                                            })
                                        }
                                        className='col-span-3'
                                    />
                                </div>
                            )}
                        </div>
                        <DialogFooter>
                            <Button type='submit'>
                                {isEditing ? 'Save Changes' : 'Create Form'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </Card>
    )
}

export default FormManagementContent
