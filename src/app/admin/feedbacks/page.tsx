'use client'

import { useEffect, useState } from 'react'
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
import { Pencil, Trash } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Feedback } from '@/types/types'

const FeedbackManagementContent = () => {
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const [currentFeedback, setCurrentFeedback] = useState({
        id: '',
        userID: '',
        comment: '',
        category: '',
    })

    // Fetch feedbacks from the API when the component mounts
    useEffect(() => {
        const fetchFeedbacks = async () => {
            const response = await fetch('/api/feedback')
            const data = await response.json()
            setFeedbacks(data)
        }

        fetchFeedbacks()
    }, [])

    // Handle editing a feedback
    const handleEdit = (feedback: Feedback) => {
        setCurrentFeedback({
            id: feedback.id,
            userID: feedback.userID || '',
            comment: feedback.comment,
            category: feedback.category,
        })
        setIsOpen(true)
    }

    // Handle deleting a feedback
    const handleDelete = async (id: string) => {
        try {
            const response = await fetch('/api/feedback', {
                method: 'DELETE',
                body: JSON.stringify({ id }),
            })
            if (response.ok) {
                setFeedbacks(feedbacks.filter((feedback) => feedback.id !== id))
            } else {
                console.error('Error deleting feedback:', response.statusText)
            }
        } catch (error) {
            console.error('Error deleting feedback:', error)
        }
    }

    // Handle submitting the updated feedback (Dummy Edit)
    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        // Since it's a dummy edit, we'll just close the dialog without updating anything
        setIsOpen(false)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Feedback Management</CardTitle>
                <CardDescription>Overview of all feedback</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Feedback ID</TableHead>
                            <TableHead>User ID</TableHead>
                            <TableHead>Comment</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {feedbacks.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className='text-center'>
                                    No feedbacks available
                                </TableCell>
                            </TableRow>
                        ) : (
                            feedbacks.map((feedback) => (
                                <TableRow key={feedback.id}>
                                    <TableCell>{feedback.id}</TableCell>
                                    <TableCell>{feedback.userID}</TableCell>
                                    <TableCell>{feedback.comment}</TableCell>
                                    <TableCell>{feedback.category}</TableCell>
                                    <TableCell>
                                        {new Date(
                                            feedback.createdAt,
                                        ).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant='ghost'
                                            size='sm'
                                            onClick={() => handleEdit(feedback)}
                                        >
                                            <Pencil className='h-4 w-4' />
                                        </Button>
                                        <Button
                                            variant='ghost'
                                            size='sm'
                                            onClick={() =>
                                                handleDelete(feedback.id)
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
                        <DialogTitle>Edit Feedback</DialogTitle>
                        <DialogDescription>
                            Edit the feedback details below (this is a dummy
                            edit).
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className='grid gap-4 py-4'>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <label htmlFor='userID' className='text-right'>
                                    User ID
                                </label>
                                <Input
                                    id='userID'
                                    value={currentFeedback.userID}
                                    onChange={(e) =>
                                        setCurrentFeedback({
                                            ...currentFeedback,
                                            userID: e.target.value,
                                        })
                                    }
                                    className='col-span-3'
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <label htmlFor='comment' className='text-right'>
                                    Comment
                                </label>
                                <Input
                                    id='comment'
                                    value={currentFeedback.comment}
                                    onChange={(e) =>
                                        setCurrentFeedback({
                                            ...currentFeedback,
                                            comment: e.target.value,
                                        })
                                    }
                                    className='col-span-3'
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <label
                                    htmlFor='category'
                                    className='text-right'
                                >
                                    Category
                                </label>
                                <Input
                                    id='category'
                                    value={currentFeedback.category}
                                    onChange={(e) =>
                                        setCurrentFeedback({
                                            ...currentFeedback,
                                            category: e.target.value,
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

export default FeedbackManagementContent
