'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/context/UserContext'
import { toast } from '@/hooks/use-toast'
import { Pencil, Plus } from 'lucide-react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'

interface Form {
    id: string
    title: string
    description: string
    status: 'DRAFT' | 'OPENED' | 'CLOSED'
    submissionCount: number
    createdAt: string
    deadline: string
}

const Page = () => {
    const { user } = useUser() as {
        user: {
            id: string
            user_metadata: {
                avatar_url: string
                email: string
                full_name: string
            }
        }
    }

    const router = useRouter()
    const [forms, setForms] = useState<Form[]>([])

    useEffect(() => {
        const fetchForms = async () => {
            try {
                const response = await fetch(`/api/forms?userID=${user?.id}`)
                if (!response.ok) {
                    throw new Error('Failed to fetch forms')
                }
                const formsData = await response.json()
                setForms(formsData)
            } catch (error) {
                console.error('Error fetching forms:', error)
                toast({
                    title: 'Error',
                    description: 'Unable to fetch forms.',
                })
            }
        }

        if (user?.id) {
            fetchForms()
        }
    }, [user?.id])

    useEffect(() => {
        const redirectTo = localStorage.getItem('redirectTo')
        if (redirectTo) {
            toast({
                title: 'Continue Filling Form',
                description: 'Click here to continue your form.',
                onClick: () => {
                    window.location.href = redirectTo
                    localStorage.removeItem('redirectTo')
                },
                onOpenChange: (isOpen) => {
                    if (!isOpen) localStorage.removeItem('redirectTo')
                },
            })
        }
    }, [])

    const handleCreateForm = async () => {
        try {
            const response = await fetch('/api/forms', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userID: user?.id }),
            })

            if (!response.ok) {
                throw new Error('Failed to create draft form')
            }

            const form = await response.json()
            router.push(`/admin/forms/form-builder/${form.id}`)
        } catch (error) {
            console.error('Error creating draft form:', error)
            toast({
                title: 'Error',
                description: 'Unable to create a new form.',
            })
        }
    }

    const handleUpdateForm = (id: string) => {
        router.push(`/admin/forms/form-builder/${id}`)
    }

    const handleDeleteForm = async (id: string) => {
        try {
            const response = await fetch(`/api/forms/${id}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                throw new Error('Failed to delete form')
            }

            setForms(forms.filter((form) => form.id !== id))
        } catch (error) {
            console.error('Error deleting form:', error)
            toast({
                title: 'Error',
                description: 'Unable to delete the form.',
            })
        }
    }

    const getStatusBadge = (status: Form['status']) => {
        switch (status) {
            case 'DRAFT':
                return <Badge variant='secondary'>Draft</Badge>
            case 'OPENED':
                return <Badge variant='default'>Published</Badge>
            case 'CLOSED':
                return <Badge variant='destructive'>Closed</Badge>
            default:
                return null
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Forms</CardTitle>
                <CardDescription>Manage your forms</CardDescription>
            </CardHeader>
            <CardContent>
                <Button onClick={handleCreateForm} className='mb-4'>
                    <Plus className='mr-2 h-4 w-4' />
                    <span>Create New Form</span>
                </Button>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Submissions</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead>Deadline</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {forms.map((form) => (
                            <TableRow key={form.id}>
                                <TableCell>{form.title}</TableCell>
                                <TableCell>
                                    {getStatusBadge(form.status)}
                                </TableCell>
                                <TableCell>{form.submissionCount}</TableCell>
                                <TableCell>
                                    {new Date(
                                        form.createdAt,
                                    ).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                    {new Date(
                                        form.deadline,
                                    ).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant='ghost'
                                                className='h-8 w-8 p-0'
                                            >
                                                <span className='sr-only'>
                                                    Open menu
                                                </span>
                                                <Pencil className='h-4 w-4' />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align='end'>
                                            <DropdownMenuLabel>
                                                Actions
                                            </DropdownMenuLabel>
                                            <DropdownMenuItem
                                                onClick={() =>
                                                    handleUpdateForm(form.id)
                                                }
                                            >
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                onClick={() =>
                                                    handleDeleteForm(form.id)
                                                }
                                                className='text-red-600'
                                            >
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default Page
