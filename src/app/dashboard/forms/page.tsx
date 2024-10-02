'use client'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { toast } from '@/hooks/use-toast'
import { Pencil, Plus, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const Page = () => {
    const [forms, setForms] = useState([
        { id: 1, title: 'Customer Survey', createdAt: '2023-05-01' },
        { id: 2, title: 'Employee Feedback', createdAt: '2023-05-15' },
    ])

    const handleCreateForm = () => {
        // Placeholder for form creation logic
        const newForm = {
            id: forms.length + 1,
            title: 'New Form',
            createdAt: new Date().toISOString().split('T')[0],
        }
        setForms([...forms, newForm])
        toast({
            title: 'Form Created',
            description: 'A new form has been created.',
        })
    }

    const handleUpdateForm = (id: number) => {
        // Placeholder for form update logic
        toast({
            title: 'Form Updated',
            description: `Form ${id} has been updated.`,
        })
    }

    const handleDeleteForm = (id: number) => {
        // Placeholder for form deletion logic
        setForms(forms.filter((form) => form.id !== id))
        toast({
            title: 'Form Deleted',
            description: `Form ${id} has been deleted.`,
            variant: 'destructive',
        })
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>Forms</CardTitle>
                <CardDescription>Manage your forms</CardDescription>
            </CardHeader>
            <CardContent>
                <Button onClick={handleCreateForm} className='mb-4'>
                    <Plus className='mr-2 h-4 w-4' /> Create New Form
                </Button>
                <div className='space-y-4'>
                    {forms.map((form) => (
                        <div
                            key={form.id}
                            className='flex items-center justify-between rounded-lg bg-gray-50 p-4'
                        >
                            <div>
                                <h3 className='font-semibold'>{form.title}</h3>
                                <p className='text-sm text-gray-500'>
                                    Created on: {form.createdAt}
                                </p>
                            </div>
                            <div>
                                <Button
                                    variant='outline'
                                    size='sm'
                                    onClick={() => handleUpdateForm(form.id)}
                                    className='mr-2'
                                >
                                    <Pencil className='mr-2 h-4 w-4' /> Edit
                                </Button>
                                <Button
                                    variant='destructive'
                                    size='sm'
                                    onClick={() => handleDeleteForm(form.id)}
                                >
                                    <Trash className='mr-2 h-4 w-4' /> Delete
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
