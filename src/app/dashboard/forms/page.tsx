'use client'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Pencil, Plus, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/context/UserContext'
import { toast } from '@/hooks/use-toast'

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
    const [forms, setForms] = useState<
        { id: string; title: string; createdAt: string }[]
    >([])

    useEffect(() => {
        // Fetch the user's forms on mount
        const fetchForms = async () => {
            try {
                const response = await fetch(`/api/forms?userId=${user?.id}`)
                if (response.ok) {
                    const formsData = await response.json()
                    setForms(formsData)
                } else {
                    console.error('Failed to fetch forms')
                }
            } catch (error) {
                console.error('Error fetching forms:', error)
            }
        }

        if (user?.id) {
            fetchForms()
        }
    }, [user?.id])
    if (localStorage.getItem('redirectTo')) {
        toast({
            title: 'Continue Filling Form',
            description: 'Click here to continue your form.',
            onClick: () => {
                const redirectTo = localStorage.getItem('redirectTo')
                if (redirectTo) {
                    window.location.href = redirectTo
                }
                localStorage.removeItem('redirectTo') // Remove after clicking
            },
            onOpenChange: (isOpen) => {
                if (!isOpen) {
                    // Remove redirectTo from local storage if the toast is dismissed
                    localStorage.removeItem('redirectTo')
                }
            },
        })
    }

    const handleCreateForm = async () => {
        try {
            const response = await fetch('/api/forms', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userID: user?.id }), // Send user ID for form ownership
            })

            if (!response.ok) {
                throw new Error('Failed to create draft form')
            }

            const form = await response.json() // Backend returns the draft form with its ID
            router.push(`/dashboard/forms/form-builder/${form.id}`)
        } catch (error) {
            console.error('Error creating draft form:', error)
        }
    }

    const handleUpdateForm = (id: string) => {
        // Redirect to form builder to edit the form
        router.push(`/dashboard/forms/form-builder/${id}`)
    }

    const handleDeleteForm = async (id: string) => {
        try {
            const response = await fetch(`/api/forms/${id}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                throw new Error('Failed to delete form')
            }

            // Remove the deleted form from the state
            setForms(forms.filter((form) => form.id !== id))
        } catch (error) {
            console.error('Error deleting form:', error)
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
                    <span className='md:inline'>Create New Form</span>
                </Button>
                <div className='space-y-4'>
                    {forms.map((form) => (
                        <div
                            key={form.id}
                            className='flex w-full items-center justify-between rounded-lg bg-gray-50 p-4'
                        >
                            <div>
                                <h3 className='font-semibold'>{form.title}</h3>
                                <p className='text-sm text-gray-500'>
                                    Created on:{' '}
                                    {new Date(
                                        form.createdAt,
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                            <div className='flex flex-col items-center justify-center space-y-2 md:flex-row md:justify-end md:space-y-0'>
                                <Button
                                    variant='outline'
                                    size='sm'
                                    onClick={() => handleUpdateForm(form.id)}
                                    className='md:mr-2'
                                >
                                    <Pencil className='h-4 w-4 md:mr-2' />
                                    <span className='hidden md:inline'>
                                        Edit
                                    </span>
                                </Button>
                                <Button
                                    variant='destructive'
                                    size='sm'
                                    onClick={() => handleDeleteForm(form.id)}
                                >
                                    <Trash className='h-4 w-4 md:mr-2' />
                                    <span className='hidden md:inline'>
                                        Delete
                                    </span>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default Page
