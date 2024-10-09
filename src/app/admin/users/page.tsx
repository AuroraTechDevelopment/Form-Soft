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

const UserManagementContent = () => {
    const [users, setUsers] = useState([
        {
            id: 'U001',
            name: 'John Doe',
            email: 'john@example.com',
            role: 'Admin',
            lastLogin: '2023-06-15 10:30 AM',
        },
        {
            id: 'U002',
            name: 'Jane Smith',
            email: 'jane@example.com',
            role: 'User',
            lastLogin: '2023-06-14 2:45 PM',
        },
        {
            id: 'U003',
            name: 'Bob Johnson',
            email: 'bob@example.com',
            role: 'Moderator',
            lastLogin: '2023-06-13 9:15 AM',
        },
    ])

    const [isOpen, setIsOpen] = useState(false)
    const [currentUser, setCurrentUser] = useState({
        id: '',
        name: '',
        email: '',
        role: '',
    })
    const [isEditing, setIsEditing] = useState(false)

    const handleCreate = () => {
        setIsEditing(false)
        setCurrentUser({ id: '', name: '', email: '', role: '' })
        setIsOpen(true)
    }

    const handleEdit = (user: SetStateAction<{ id: string; name: string; email: string; role: string }>) => {
        setIsEditing(true)
        setCurrentUser(user)
        setIsOpen(true)
    }

    const handleDelete = (id: string) => {
        setUsers(users.filter((user) => user.id !== id))
    }

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        if (isEditing) {
            setUsers(
                users.map((user) =>
                    user.id === currentUser.id
                        ? { ...currentUser, lastLogin: user.lastLogin }
                        : user,
                ),
            )
        } else {
            setUsers([
                ...users,
                {
                    ...currentUser,
                    id: `U${users.length + 1}`.padStart(4, '0'),
                    lastLogin: 'N/A',
                },
            ])
        }
        setIsOpen(false)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Overview of all users</CardDescription>
            </CardHeader>
            <CardContent>
                <Button onClick={handleCreate} className='mb-4'>
                    <Plus className='mr-2 h-4 w-4' /> Create New User
                </Button>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Last Login</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>{user.lastLogin}</TableCell>
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
                                        onClick={() => handleDelete(user.id)}
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
                                <Label htmlFor='name' className='text-right'>
                                    Name
                                </Label>
                                <Input
                                    id='name'
                                    value={currentUser.name}
                                    onChange={(e) =>
                                        setCurrentUser({
                                            ...currentUser,
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
                                <Label htmlFor='role' className='text-right'>
                                    Role
                                </Label>
                                <select
                                    id='role'
                                    value={currentUser.role}
                                    onChange={(e) =>
                                        setCurrentUser({
                                            ...currentUser,
                                            role: e.target.value,
                                        })
                                    }
                                    className='col-span-3 rounded-md border p-2'
                                >
                                    <option value='Admin'>Admin</option>
                                    <option value='User'>User</option>
                                    <option value='Moderator'>Moderator</option>
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
