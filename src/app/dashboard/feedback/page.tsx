'use client'
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
import { useState } from 'react'
import { toast } from '@/hooks/use-toast'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
const Page = () => {
    const [feedback, setFeedback] = useState({ category: '', comment: '' })

    const handleFeedbackSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Placeholder for feedback submission logic
        toast({
            title: 'Feedback Submitted',
            description: 'Thank you for your feedback!',
        })
        setFeedback({ category: '', comment: '' })
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
