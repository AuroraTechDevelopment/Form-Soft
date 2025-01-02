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

import { User, UserRole, UserStatus } from '@/types/types'

const UserManagementContent = () => {
    const [users, setUsers] = useState<User[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const [currentUser, setCurrentUser] = useState<User>({
        id: '',
        username: '',
        email: '',
        role: UserRole.USER,
        status: UserStatus.VERIFIED,
        createdAt: new Date(),
        lastLogin: new Date(),
    })
    const [isEditing, setIsEditing] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        try {
            const response = await fetch('/api/users')
            if (!response.ok) {
                throw new Error('Failed to fetch users')
            }
            const data = await response.json()
            setUsers(data)
        } catch (error) {
            setError('Error fetching users. Please try again.')
            console.error(error)
        }
    }

    const handleCreate = () => {
        setIsEditing(false)
        setCurrentUser({
            id: '',
            username: '',
            email: '',
            role: UserRole.USER,
            status: UserStatus.VERIFIED,
            createdAt: new Date(),
            lastLogin: new Date(),
        })
        setIsOpen(true)
    }

    const handleEdit = (user: User) => {
        setIsEditing(true)
        setCurrentUser(user)
        setIsOpen(true)
    }

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch('/api/users', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            })
            if (!response.ok) {
                throw new Error('Failed to delete user')
            }
            await fetchUsers()
        } catch (error) {
            setError('Error deleting user. Please try again.')
            console.error(error)
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const method = isEditing ? 'PUT' : 'POST'
            const response = await fetch('/api/users', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(currentUser),
            })
            if (!response.ok) {
                throw new Error(
                    `Failed to ${isEditing ? 'update' : 'create'} user`,
                )
            }
            await fetchUsers()
            setIsOpen(false)
        } catch (error) {
            setError(
                `Error ${isEditing ? 'updating' : 'creating'} user. Please try again.`,
            )
            console.error(error)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Overview of all users</CardDescription>
            </CardHeader>
            <CardContent>
                {error && <p className='mb-4 text-red-500'>{error}</p>}
                <Button onClick={handleCreate} className='mb-4'>
                    <Plus className='mr-2 h-4 w-4' /> Create New User
                </Button>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Username</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className='text-center'>
                                    No users found
                                </TableCell>
                            </TableRow>
                        ) : (
                            users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant='ghost'
                                            size='sm'
                                            onClick={() => handleEdit(user)}
                                        >
                                            <Pencil className='h-4 w-4' />
                                        </Button>
                                        <Button
                                            variant='ghost'
                                            size='sm'
                                            onClick={() =>
                                                handleDelete(user.id)
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
                        <DialogTitle>
                            {isEditing ? 'Edit User' : 'Create New User'}
                        </DialogTitle>
                        <DialogDescription>
                            {isEditing
                                ? 'Edit the user details below'
                                : 'Enter the details for the new user'}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className='grid gap-4 py-4'>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='email' className='text-right'>
                                    Email
                                </Label>
                                <Input
                                    id='email'
                                    value={currentUser.email}
                                    onChange={(e) =>
                                        setCurrentUser({
                                            ...currentUser,
                                            email: e.target.value,
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
                                    value={currentUser.username}
                                    onChange={(e) =>
                                        setCurrentUser({
                                            ...currentUser,
                                            username: e.target.value,
                                        })
                                    }
                                    className='col-span-3'
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='role' className='text-right'>
                                    Role
                                </Label>
                                <select
                                    id='role'
                                    value={currentUser.role}
                                    onChange={(e) =>
                                        setCurrentUser({
                                            ...currentUser,
                                            role: e.target.value as UserRole,
                                        })
                                    }
                                    className='col-span-3 rounded-md border p-2'
                                >
                                    <option value='ADMIN'>Admin</option>
                                    <option value='USER'>User</option>
                                    <option value='MODERATOR'>Moderator</option>
                                </select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type='submit'>
                                {isEditing ? 'Save Changes' : 'Create User'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </Card>
    )
}

export default UserManagementContent
