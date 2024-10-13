'use client'

import { useState, useEffect } from 'react'
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

interface User {
    id: string
    name: string
    username: string
}

const ModeratorManagementContent = () => {
    const [moderators, setModerators] = useState<User[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const [currentModerator, setCurrentModerator] = useState<User>({
        id: '',
        name: '',
        username: '',
    })
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        const fetchModerators = async () => {
            const response = await fetch('/api/moderators')
            const data = await response.json()
            setModerators(data)
        }

        fetchModerators()
    }, [])

    const handleCreate = () => {
        setIsEditing(false)
        setCurrentModerator({
            id: '',
            name: '',
            username: '',
        })
        setIsOpen(true)
    }

    const handleEdit = (moderator: User) => {
        setIsEditing(true)
        setCurrentModerator(moderator)
        setIsOpen(true)
    }

    const handleDelete = async (id: string) => {
        await fetch('/api/moderators', {
            method: 'DELETE',
            body: JSON.stringify({ id }),
        })
        setModerators(moderators.filter((moderator) => moderator.id !== id))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const method = isEditing ? 'PUT' : 'POST'
        const response = await fetch('/api/moderators', {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(currentModerator),
        })
        const updatedModerator = await response.json()

        setModerators((prev) =>
            isEditing
                ? prev.map((moderator) =>
                      moderator.id === updatedModerator.id
                          ? updatedModerator
                          : moderator,
                  )
                : [...prev, updatedModerator],
        )

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
                {moderators.length === 0 ? (
                    <p>No moderators available.</p>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Username</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {moderators.map((moderator) => (
                                <TableRow key={moderator.id}>
                                    <TableCell>{moderator.name}</TableCell>
                                    <TableCell>{moderator.username}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant='ghost'
                                            size='sm'
                                            onClick={() =>
                                                handleEdit(moderator)
                                            }
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
                )}
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
                                <Label
                                    htmlFor='username'
                                    className='text-right'
                                >
                                    Username
                                </Label>
                                <Input
                                    id='username'
                                    value={currentModerator.username}
                                    onChange={(e) =>
                                        setCurrentModerator({
                                            ...currentModerator,
                                            username: e.target.value,
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
