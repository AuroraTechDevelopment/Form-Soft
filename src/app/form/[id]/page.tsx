'use client'

import { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from '@/hooks/use-toast'
import { useUser } from '@/context/UserContext'
import SignIn from '@/app/(auth)/signin/page'

type QuestionType =
    | 'fullText'
    | 'mcqSingle'
    | 'mcqMultiple'
    | 'numeric'
    | 'boolean'
    | 'dateTime'
    | 'checkboxes'

interface Question {
    id: string
    type: QuestionType
    text: string
    options?: string[]
}

interface Form {
    id: string
    title: string
    description: string
    questions: Question[]
    status: string
}

function PublicFormClient({ params }: { params: { id: string } }) {
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
    const [form, setForm] = useState<Form | null>(null)
    const [answers, setAnswers] = useState<any[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [hasSubmitted, setHasSubmitted] = useState(false)

    useEffect(() => {
        const fetchForm = async () => {
            // console.log(params.id)
            try {
                const response = await fetch(`/api/forms/${params.id}`)
                if (!response.ok) throw new Error('Failed to fetch form')
                const fetchedForm = await response.json()

                if (fetchedForm.status !== 'OPENED') {
                    toast({
                        title: 'Form Closed',
                        description:
                            'This Form is no longer accepting responses',
                        variant: 'destructive',
                    })
                    return
                }

                setForm(fetchedForm)
                // Initialize answers array with appropriate length
                setAnswers(new Array(fetchedForm.questions.length).fill(null))
            } catch (error) {
                console.error(error)
                toast({
                    title: 'Error',
                    description: 'Failed to load form. Please try again later.',
                    variant: 'destructive',
                })
            }
        }

        fetchForm()
    }, [params.id])

    const handleAnswerChange = (index: number, value: any) => {
        const updatedAnswers = [...answers]
        updatedAnswers[index] = value
        setAnswers(updatedAnswers)
    }

    const handleMultiAnswerChange = (
        index: number,
        option: string,
        checked: boolean,
    ) => {
        const updatedAnswers = [...answers]
        if (!updatedAnswers[index]) updatedAnswers[index] = []
        if (checked) {
            updatedAnswers[index] = [...updatedAnswers[index], option]
        } else {
            updatedAnswers[index] = updatedAnswers[index].filter(
                (opt: string) => opt !== option,
            )
        }
        setAnswers(updatedAnswers)
    }

    const handleSubmit = async () => {
        if (!form) return

        // Validate that all questions are answered
        const unansweredQuestions = answers.findIndex(
            (answer) =>
                answer === null ||
                (Array.isArray(answer) && answer.length === 0) ||
                answer === '',
        )

        if (unansweredQuestions !== -1) {
            toast({
                title: 'Incomplete Form',
                description: `Please answer question ${unansweredQuestions + 1}`,
                variant: 'destructive',
            })
            return
        }

        setIsSubmitting(true)

        try {
            const response = await fetch(`/api/forms/${params.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userID: user.id, // Anonymous submission with null
                    formId: form.id,
                    answers: answers.map((answer, index) => ({
                        questionId: form.questions[index].id,
                        answer,
                    })),
                }),
            })

            if (!response.ok) throw new Error('Failed to submit form')

            toast({
                title: 'Success',
                description: 'Form submitted successfully!',
            })
            setHasSubmitted(true)
        } catch (error) {
            console.error(error)
            toast({
                title: 'Error',
                description: 'Failed to submit form. Please try again.',
                variant: 'destructive',
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const renderPublicQuestionFields = (question: Question, index: number) => {
        switch (question.type) {
            case 'fullText':
                return (
                    <Input
                        placeholder='Enter your response'
                        value={answers[index] || ''}
                        onChange={(e) =>
                            handleAnswerChange(index, e.target.value)
                        }
                    />
                )
            case 'mcqSingle':
                return (
                    <RadioGroup
                        value={answers[index] || ''}
                        onValueChange={(value) =>
                            handleAnswerChange(index, value)
                        }
                    >
                        {question.options?.map((option, optionIndex) => (
                            <div
                                key={optionIndex}
                                className='flex items-center space-x-2'
                            >
                                <RadioGroupItem
                                    value={option}
                                    id={`mcqSingle-${index}-${optionIndex}`}
                                />
                                <Label
                                    htmlFor={`mcqSingle-${index}-${optionIndex}`}
                                >
                                    {option}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                )
            case 'mcqMultiple':
            case 'checkboxes':
                return (
                    <div className='space-y-2'>
                        {question.options?.map((option, optionIndex) => (
                            <div
                                key={optionIndex}
                                className='flex items-center space-x-2'
                            >
                                <Checkbox
                                    checked={
                                        answers[index]?.includes(option) ||
                                        false
                                    }
                                    onCheckedChange={(checked) =>
                                        handleMultiAnswerChange(
                                            index,
                                            option,
                                            checked as boolean,
                                        )
                                    }
                                    id={`mcqMultiple-${index}-${optionIndex}`}
                                />
                                <Label
                                    htmlFor={`mcqMultiple-${index}-${optionIndex}`}
                                >
                                    {option}
                                </Label>
                            </div>
                        ))}
                    </div>
                )
            case 'numeric':
                return (
                    <Input
                        type='number'
                        placeholder='Enter a number'
                        value={answers[index] || ''}
                        onChange={(e) =>
                            handleAnswerChange(
                                index,
                                e.target.value
                                    ? parseFloat(e.target.value)
                                    : '',
                            )
                        }
                    />
                )
            case 'boolean':
                return (
                    <RadioGroup
                        value={answers[index] || ''}
                        onValueChange={(value) =>
                            handleAnswerChange(index, value)
                        }
                    >
                        <div className='flex items-center space-x-2'>
                            <RadioGroupItem
                                value='true'
                                id={`yes-${question.id}`}
                            />
                            <Label htmlFor={`yes-${question.id}`}>Yes</Label>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <RadioGroupItem
                                value='false'
                                id={`no-${question.id}`}
                            />
                            <Label htmlFor={`no-${question.id}`}>No</Label>
                        </div>
                    </RadioGroup>
                )
            case 'dateTime':
                return (
                    <Input
                        type='datetime-local'
                        value={answers[index] || ''}
                        onChange={(e) =>
                            handleAnswerChange(index, e.target.value)
                        }
                    />
                )
            default:
                return null
        }
    }
    // If user is not logged in, show login prompt
    if (!user) {
        localStorage.setItem('redirectTo', `${window.location.origin}/form/${params.id}`)
        return (
            <div className='container mx-auto py-6'>
                <SignIn />
            </div>
        )
    }

    if (!form) return <p>Loading form...</p>
    if (hasSubmitted) {
        localStorage.removeItem('redirectTo')
        return (
            <div className='container mx-auto py-6'>
                <Card className='mx-auto w-full max-w-4xl text-center'>
                    <CardHeader>
                        <CardTitle className='mb-2 text-2xl'>
                            Thank You!
                        </CardTitle>
                        <CardDescription className='text-lg'>
                            Your response has been successfully recorded.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                        <p className='text-muted-foreground'>
                            We appreciate your time and feedback.
                        </p>
                        <Button
                            onClick={() => {
                                setHasSubmitted(false)
                                setAnswers(
                                    new Array(form.questions.length).fill(null),
                                )
                            }}
                            variant='outline'
                        >
                            Submit Another Response
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className='container mx-auto py-6'>
            <Card className='mx-auto w-full max-w-4xl'>
                <CardHeader>
                    <CardTitle>{form.title}</CardTitle>
                    <CardDescription>{form.description}</CardDescription>
                </CardHeader>
                <CardContent className='space-y-6'>
                    {form.questions.map((question, index) => (
                        <Card key={question.id} className='space-y-4 p-4'>
                            <Label>{question.text}</Label>
                            {renderPublicQuestionFields(question, index)}
                        </Card>
                    ))}
                    <Button
                        onClick={handleSubmit}
                        className='w-full'
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Form'}
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
// Export a wrapper component that ensures client-side only rendering
export default function PublicForm(props: { params: { id: string } }) {
    return <PublicFormClient {...props} />
}
