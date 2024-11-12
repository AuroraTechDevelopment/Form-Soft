'use client'

import { useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { toast } from '@/hooks/use-toast'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

const Page = () => {
    const [feedback, setFeedback] = useState({ category: '', comment: '' })

    const handleFeedbackSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            // Make a POST request to the App Router API
            const response = await fetch('/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    category: feedback.category,
                    comment: feedback.comment,
                    userID: '8770753b-6310-483c-ba99-90a9e1278225', // Temporarily hardcode the user ID
                }),
            })

            if (response.ok) {
                const result = await response.json()
                // Feedback submitted successfully
                toast({
                    title: 'Feedback Submitted',
                    description: result.message,
                })

                // Clear the form
                setFeedback({ category: '', comment: '' })
            } else {
                const errorData = await response.json()
                toast({
                    title: 'Submission Error',
                    description: errorData.error || 'An error occurred',
                })
            }
        } catch (error) {
            console.error('Submission Error:', error)
            toast({
                title: 'Submission Error',
                description: 'An error occurred while submitting feedback',
            })
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Submit Feedback</CardTitle>
                <CardDescription>We value your opinion</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleFeedbackSubmit} className='space-y-4'>
                    <div className='space-y-2'>
                        <Label htmlFor='category'>Category</Label>
                        <Select
                            value={feedback.category}
                            onValueChange={(value) =>
                                setFeedback({
                                    ...feedback,
                                    category: value,
                                })
                            }
                        >
                            <SelectTrigger id='category'>
                                <SelectValue placeholder='Select a category' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='general'>General</SelectItem>
                                <SelectItem value='bug'>Bug Report</SelectItem>
                                <SelectItem value='feature'>
                                    Feature Request
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='comment'>Your Feedback</Label>
                        <Textarea
                            id='comment'
                            placeholder='Tell us what you think...'
                            value={feedback.comment}
                            onChange={(e) =>
                                setFeedback({
                                    ...feedback,
                                    comment: e.target.value,
                                })
                            }
                            className='min-h-[100px]'
                        />
                    </div>
                    <Button type='submit'>Submit Feedback</Button>
                </form>
            </CardContent>
        </Card>
    )
}

export default Page
