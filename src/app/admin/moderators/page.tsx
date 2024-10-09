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

const ModeratorManagementContent = () => {
    const [moderators, setModerators] = useState([
        {
            id: 'M001',
            name: 'Alice Williams',
            email: 'alice@example.com',
            assignedForms: 5,
            lastActivity: '2023-06-15 11:20 AM',
        },
        {
            id: 'M002',
            name: 'Charlie Brown',
            email: 'charlie@example.com',
            assignedForms: 3,
            lastActivity: '2023-06-14 3:30 PM',
        },
        {
            id: 'M003',
            name: 'Diana Ross',
            email: 'diana@example.com',
            assignedForms: 7,
            lastActivity: '2023-06-13 10:45 AM',
        },
    ])

    const [isOpen, setIsOpen] = useState(false)
    const [currentModerator, setCurrentModerator] = useState({
        id: '',
        name: '',
        email: '',
        assignedForms: 0,
    })
    const [isEditing, setIsEditing] = useState(false)

    const handleCreate = () => {
        setIsEditing(false)
        setCurrentModerator({ id: '', name: '', email: '', assignedForms: 0 })
        setIsOpen(true)
    }

    const handleEdit = (moderator: SetStateAction<{ id: string; name: string; email: string; assignedForms: number }>) => {
        setIsEditing(true)
        setCurrentModerator(moderator)
        setIsOpen(true)
    }

    const handleDelete = (id: string) => {
        setModerators(moderators.filter((moderator) => moderator.id !== id))
    }

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        if (isEditing) {
            setModerators(
                moderators.map((moderator) =>
                    moderator.id === currentModerator.id
                        ? {
                              ...currentModerator,
                              lastActivity: new Date().toLocaleString(),
                          }
                        : moderator,
                ),
            )
        } else {
            setModerators([
                ...moderators,
                {
                    ...currentModerator,
                    id: `M${moderators.length + 1}`.padStart(4, '0'),
                    lastActivity: new Date().toLocaleString(),
                },
            ])
        }
        setIsOpen(false)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Moderator Management</CardTitle>
                <CardDescription>Overview of all moderators</CardDescription>
            </CardHeader>
            <CardContent>
                <Button onClick={handleCreate} className='mb-4'>
                    <Plus className='mr-2 h-4 w-4' /> Create New Moderator
                </Button>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Moderator ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Assigned Forms</TableHead>
                            <TableHead>Last Activity</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {moderators.map((moderator) => (
                            <TableRow key={moderator.id}>
                                <TableCell>{moderator.id}</TableCell>
                                <TableCell>{moderator.name}</TableCell>
                                <TableCell>{moderator.email}</TableCell>
                                <TableCell>{moderator.assignedForms}</TableCell>
                                <TableCell>{moderator.lastActivity}</TableCell>
                                <TableCell>
                                    <Button
                                        variant='ghost'
                                        size='sm'
                                        onClick={() => handleEdit(moderator)}
                                    >
                                        <Pencil className='h-4 w-4' />
                                    </Button>
                                    <Button
                                        variant='ghost'
                                        size='sm'
                                        onClick={() =>
                                            handleDelete(moderator.id)
                                        }
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
                            {isEditing
                                ? 'Edit Moderator'
                                : 'Create New Moderator'}
                        </DialogTitle>
                        <DialogDescription>
                            {isEditing
                                ? 'Edit the moderator details below'
                                : 'Enter the details for the new moderator'}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className='grid gap-4 py-4'>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='name' className='text-right'>
                                    Name
                                </Label>
                                <Input
                                    id='name'
                                    value={currentModerator.name}
                                    onChange={(e) =>
                                        setCurrentModerator({
                                            ...currentModerator,
                                            name: e.target.value,
                                        })
                                    }
                                    className='col-span-3'
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='email' className='text-right'>
                                    Email
                                </Label>
                                <Input
                                    id='email'
                                    type='email'
                                    value={currentModerator.email}
                                    onChange={(e) =>
                                        setCurrentModerator({
                                            ...currentModerator,
                                            email: e.target.value,
                                        })
                                    }
                                    className='col-span-3'
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label
                                    htmlFor='assignedForms'
                                    className='text-right'
                                >
                                    Assigned Forms
                                </Label>
                                <Input
                                    id='assignedForms'
                                    type='number'
                                    value={currentModerator.assignedForms}
                                    onChange={(e) =>
                                        setCurrentModerator({
                                            ...currentModerator,
                                            assignedForms: parseInt(
                                                e.target.value,
                                            ),
                                        })
                                    }
                                    className='col-span-3'
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type='submit'>
                                {isEditing
                                    ? 'Save Changes'
                                    : 'Create Moderator'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </Card>
    )
}

export default ModeratorManagementContent
