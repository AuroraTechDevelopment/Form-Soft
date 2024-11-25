'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ChevronUp, ChevronDown, Plus, Save, Trash, Earth } from 'lucide-react'

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

function FormBuilderClient({ params }: { params: { id: string } }) {
    const router = useRouter()
    const [formTitle, setFormTitle] = useState('')
    const [formDescription, setFormDescription] = useState('')
    const [questions, setQuestions] = useState<Question[]>([])
    // const [isPublic, setIsPublic] = useState(false)
    const [manySubmission, setManySubmission] = useState(false)
    const [editable, setEditable] = useState(false)

    // const [maxSubmissions, setMaxSubmissions] = useState<number | undefined>()
    // const [tags, setTags] = useState<string[]>([])
    // const [category, setCategory] = useState<string>('')
    // const [thankyouMessage, setThankyouMessage] = useState('')
    // const [redirectUrl, setRedirectUrl] = useState('')
    // const [allowAnonymous, setAllowAnonymous] = useState(false)
    // const [notifyOnSubmit, setNotifyOnSubmit] = useState(false)
    // const [language, setLanguage] = useState('en')
    const [status, setStatus] = useState<
        'DRAFT' | 'ARCHIVED' | 'OPENED' | 'CLOSED'
    >('DRAFT')
    const [publicLink, setPublicLink] = useState('')
    const [deadline, setDeadline] = useState(
        new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    )

    // Fetch form data when component mounts or form ID changes
    useEffect(() => {
        const fetchFormData = async () => {
            try {
                const response = await fetch(`/api/forms/${params.id}`)
                if (!response.ok) {
                    throw new Error('Failed to fetch form')
                }
                const form = await response.json()

                if (form) {
                    // Populate form fields with the fetched data
                    setFormTitle(form.title)
                    setFormDescription(form.description || '')
                    setQuestions(form.questions || [])
                    // setIsPublic(form.isPublic || false)
                    setManySubmission(form.manySubmission || false)
                    setEditable(form.editable || false)
                    setStatus(form.status)
                    // Set public link
                    setPublicLink(`${window.location.origin}/form/${params.id}`)
                    // setMaxSubmissions(form.maxSubmissions || undefined)
                    // setTags(form.tags || [])
                    // setCategory(form.category || '')
                    // setThankyouMessage(form.thankyouMessage || '')
                    // setRedirectUrl(form.redirectUrl || '')
                    // setAllowAnonymous(form.allowAnonymous || false)
                    // setNotifyOnSubmit(form.notifyOnSubmit || false)
                    // setLanguage(form.language || 'en')
                    setDeadline(new Date(form.deadline) || new Date())
                }
            } catch (error) {
                console.error('Error fetching form data:', error)
            }
        }

        fetchFormData()
    }, [params.id])

    const handleAddQuestion = () => {
        const newQuestion: Question = {
            id: `question-${Date.now()}`,
            type: 'fullText',
            text: '',
        }
        setQuestions([...questions, newQuestion])
    }

    const handleQuestionChange = (
        index: number,
        field: keyof Question,
        value: string,
    ) => {
        const updatedQuestions = [...questions]
        if (field === 'type') {
            updatedQuestions[index] = {
                ...updatedQuestions[index],
                type: value as QuestionType,
            }
            if (['mcqSingle', 'mcqMultiple', 'checkboxes'].includes(value)) {
                updatedQuestions[index].options = ['']
            } else {
                delete updatedQuestions[index].options
            }
        } else {
            updatedQuestions[index] = {
                ...updatedQuestions[index],
                [field]: value,
            }
        }
        setQuestions(updatedQuestions)
    }

    const handleAddOption = (questionIndex: number) => {
        const updatedQuestions = [...questions]
        updatedQuestions[questionIndex].options = [
            ...(updatedQuestions[questionIndex].options || []),
            '',
        ]
        setQuestions(updatedQuestions)
    }

    const handleOptionChange = (
        questionIndex: number,
        optionIndex: number,
        value: string,
    ) => {
        const updatedQuestions = [...questions]
        updatedQuestions[questionIndex].options![optionIndex] = value
        setQuestions(updatedQuestions)
    }

    const handleRemoveQuestion = (index: number) => {
        const updatedQuestions = questions.filter((_, i) => i !== index)
        setQuestions(updatedQuestions)
    }

    const handleMoveQuestion = (index: number, direction: 'up' | 'down') => {
        const newIndex = direction === 'up' ? index - 1 : index + 1
        if (newIndex < 0 || newIndex >= questions.length) return
        const updatedQuestions = [...questions]
        const [movedQuestion] = updatedQuestions.splice(index, 1)
        updatedQuestions.splice(newIndex, 0, movedQuestion)
        setQuestions(updatedQuestions)
    }

    // const handleAddTag = (tag: string) => {
    //     setTags([...tags, tag])
    // }

    // const handleRemoveTag = (tagToRemove: string) => {
    //     setTags(tags.filter((tag) => tag !== tagToRemove))
    // }

    // const handleSaveForm = () => {
    //     const formData = {
    //         title: formTitle,
    //         description: formDescription,
    //         questions,
    //         isPublic,
    //         manySubmission,
    //         editable,
    //         maxSubmissions,
    //         tags,
    //         category,
    //         thankyouMessage,
    //         redirectUrl,
    //         allowAnonymous,
    //         notifyOnSubmit,
    //         language,
    //         // deadline: new Date(deadline).toISOString(),
    //     }
    //     console.log('Form Saved', formData)
    //     router.push('/')
    // }

    // In your FormBuilder component
    // const handleSaveForm = async () => {
    //     try {
    //         const response = await fetch('/api/forms', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 userID: user?.id,
    //                 title: formTitle,
    //                 description: formDescription,
    //                 questions,
    //                 manySubmission,
    //                 editable,
    //                 deadline,
    //             }),
    //         })

    //         if (!response.ok) {
    //             const errorData = await response.json()
    //             throw new Error(errorData?.message || 'Failed to create form')
    //         }

    //         const form = await response.json()
    //         console.log('Form created:', form)
    //         router.push('/') // Redirect to the desired page after success
    //     } catch (error) {
    //         console.error('Error creating form:', error)
    //         // toast({
    //         //     title: 'Error',
    //         //     description:
    //         //         error instanceof Error
    //         //             ? error.message
    //         //             : 'Unknown error occurred',
    //         //     variant: 'destructive',
    //         // })
    //     }
    // }
    const handleSaveForm = async () => {
        try {
            const response = await fetch(`/api/forms/${params.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: formTitle,
                    description: formDescription,
                    questions,
                    status: status, // Use status instead of paused
                    manySubmission,
                    editable,
                    deadline,
                }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData?.message || 'Failed to save form')
            }

            const updatedForm = await response.json()
            console.log('Form updated:', updatedForm)
            router.push('/dashboard/forms')
        } catch (error) {
            console.error('Error saving form:', error)
        }
    }

    // Add a new handler for toggling form status
    const handleStatusToggle = async (checked: boolean) => {
        const newStatus = checked ? 'OPENED' : 'CLOSED'
        try {
            const response = await fetch(`/api/forms/${params.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            })

            if (!response.ok) throw new Error('Failed to update form status')

            const updatedForm = await response.json()
            setStatus(updatedForm.status)
        } catch (error) {
            console.error('Error updating form status:', error)
        }
    }
    const handlePublish = async () => {
        try {
            const response = await fetch(`/api/forms/${params.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'OPENED' }),
            })

            if (!response.ok) throw new Error('Failed to publish form')

            const updatedForm = await response.json()
            setStatus(updatedForm.status)

            // Set public link
            setPublicLink(`${window.location.origin}/form/${params.id}`)
        } catch (error) {
            console.error('Error publishing form:', error)
        }
    }
    const renderQuestionFields = (question: Question, index: number) => {
        switch (question.type) {
            case 'fullText':
                return (
                    <Input disabled placeholder='User will input full text' />
                )
            case 'mcqSingle':
            case 'mcqMultiple':
            case 'checkboxes':
                return (
                    <div className='space-y-2'>
                        {question.options?.map((option, optionIndex) => (
                            <Input
                                key={optionIndex}
                                value={option}
                                onChange={(e) =>
                                    handleOptionChange(
                                        index,
                                        optionIndex,
                                        e.target.value,
                                    )
                                }
                                placeholder={`Option ${optionIndex + 1}`}
                            />
                        ))}
                        <Button
                            onClick={() => handleAddOption(index)}
                            variant='outline'
                            size='sm'
                        >
                            Add Option
                        </Button>
                    </div>
                )
            case 'numeric':
                return (
                    <Input
                        type='number'
                        disabled
                        placeholder='User will input a number'
                    />
                )
            case 'boolean':
                return (
                    <RadioGroup disabled>
                        <div className='flex items-center space-x-2'>
                            <RadioGroupItem
                                value='yes'
                                id={`yes-${question.id}`}
                            />
                            <Label htmlFor={`yes-${question.id}`}>Yes</Label>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <RadioGroupItem
                                value='no'
                                id={`no-${question.id}`}
                            />
                            <Label htmlFor={`no-${question.id}`}>No</Label>
                        </div>
                    </RadioGroup>
                )
            case 'dateTime':
                return <Input type='datetime-local' disabled />
            default:
                return null
        }
    }

    return (
        <div className='container mx-auto'>
            <Card className='mx-auto w-full max-w-4xl'>
                <CardHeader>
                    <CardTitle>Create New Form</CardTitle>
                </CardHeader>
                <CardContent className='space-y-6'>
                    <div className='space-y-2'>
                        <Label htmlFor='formTitle'>Form Title</Label>
                        <Input
                            id='formTitle'
                            value={formTitle}
                            onChange={(e) => setFormTitle(e.target.value)}
                            placeholder='Enter form title'
                        />
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='formDescription'>
                            Form Description
                        </Label>
                        <Textarea
                            id='formDescription'
                            value={formDescription}
                            onChange={(e) => setFormDescription(e.target.value)}
                            placeholder='Enter form description'
                        />
                    </div>
                    <div className='space-x-4 space-y-4'>
                        <Label>Questions</Label>
                        {questions.map((question, index) => (
                            <Card key={question.id} className='space-y-4 p-4'>
                                <div className='flex items-center space-x-2'>
                                    <div className='flex flex-col space-y-1'>
                                        <Button
                                            variant='outline'
                                            size='icon'
                                            onClick={() =>
                                                handleMoveQuestion(index, 'up')
                                            }
                                            disabled={index === 0}
                                            aria-label='Move question up'
                                        >
                                            <ChevronUp className='h-4 w-4' />
                                        </Button>
                                        <Button
                                            variant='outline'
                                            size='icon'
                                            onClick={() =>
                                                handleMoveQuestion(
                                                    index,
                                                    'down',
                                                )
                                            }
                                            disabled={
                                                index === questions.length - 1
                                            }
                                            aria-label='Move question down'
                                        >
                                            <ChevronDown className='h-4 w-4' />
                                        </Button>
                                    </div>
                                    <Select
                                        value={question.type}
                                        onValueChange={(value) =>
                                            handleQuestionChange(
                                                index,
                                                'type',
                                                value,
                                            )
                                        }
                                    >
                                        <SelectTrigger className='w-[180px]'>
                                            <SelectValue placeholder='Select question type' />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value='fullText'>
                                                Full Text
                                            </SelectItem>
                                            <SelectItem value='mcqSingle'>
                                                MCQ (Single Answer)
                                            </SelectItem>
                                            <SelectItem value='mcqMultiple'>
                                                MCQ (Multiple Answers)
                                            </SelectItem>
                                            <SelectItem value='numeric'>
                                                Numeric Input
                                            </SelectItem>
                                            <SelectItem value='boolean'>
                                                Yes/No (Boolean)
                                            </SelectItem>
                                            <SelectItem value='dateTime'>
                                                Date/Time Input
                                            </SelectItem>
                                            <SelectItem value='checkboxes'>
                                                Checkboxes
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Button
                                        variant='destructive'
                                        size='icon'
                                        onClick={() =>
                                            handleRemoveQuestion(index)
                                        }
                                        aria-label='Remove question'
                                    >
                                        <Trash className='h-4 w-4' />
                                    </Button>
                                </div>
                                <Input
                                    value={question.text}
                                    onChange={(e) =>
                                        handleQuestionChange(
                                            index,
                                            'text',
                                            e.target.value,
                                        )
                                    }
                                    placeholder='Enter question text'
                                />
                                {renderQuestionFields(question, index)}
                            </Card>
                        ))}
                        <Button onClick={handleAddQuestion} variant='outline'>
                            <Plus className='mr-2 h-4 w-4' />
                            Add Question
                        </Button>
                    </div>
                    <div className='space-y-2'>
                        {/* <div className='flex items-center space-x-2'>
                            <Switch
                                id='isPublic'
                                checked={isPublic}
                                onCheckedChange={setIsPublic}
                            />
                            <Label htmlFor='isPublic'>Make form public</Label>
                        </div> */}
                        <div className='flex items-center space-x-2'>
                            <Switch
                                id='formStatus'
                                checked={status === 'OPENED'}
                                onCheckedChange={handleStatusToggle}
                                disabled={status === 'DRAFT'} // Disable toggle if form is still a draft
                            />
                            <Label htmlFor='formStatus'>
                                {status === 'OPENED'
                                    ? 'Form is Active'
                                    : 'Form is Closed'}
                            </Label>
                        </div>

                        <div className='flex items-center space-x-2'>
                            <Switch
                                id='manySubmission'
                                checked={manySubmission}
                                onCheckedChange={setManySubmission}
                            />
                            <Label htmlFor='manySubmission'>
                                Allow multiple submissions
                            </Label>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <Switch
                                id='editable'
                                checked={editable}
                                onCheckedChange={setEditable}
                            />
                            <Label htmlFor='editable'>
                                Allow editing after submission
                            </Label>
                        </div>
                    </div>
                    {/* <div className='space-y-2'>
                        <Label htmlFor='maxSubmissions'>
                            Max Submissions (optional)
                        </Label>
                        <Input
                            id='maxSubmissions'
                            type='number'
                            value={maxSubmissions || ''}
                            onChange={(e) =>
                                setMaxSubmissions(
                                    e.target.value
                                        ? parseInt(e.target.value)
                                        : undefined,
                                )
                            }
                            placeholder='Enter max submissions'
                        />
                    </div> */}
                    {/* <div className='space-y-2'>
                        <Label htmlFor='tags'>Tags</Label>
                        <div className='flex flex-wrap gap-2'>
                            {tags.map((tag, index) => (
                                <div
                                    key={index}
                                    className='flex items-center rounded-full bg-secondary px-2 py-1 text-sm text-secondary-foreground'
                                >
                                    {tag}
                                    <button
                                        onClick={() => handleRemoveTag(tag)}
                                        className='ml-2 text-secondary-foreground hover:text-primary-foreground'
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                        <Input
                            id='tags'
                            placeholder='Add a tag and press Enter'
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault()
                                    const input = e.target as HTMLInputElement
                                    if (input.value.trim()) {
                                        handleAddTag(input.value.trim())
                                        input.value = ''
                                    }
                                }
                            }}
                        />
                    </div> */}
                    {/* <div className='space-y-2'>
                        <Label htmlFor='category'>Category</Label>
                        <Input
                            id='category'
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            placeholder='Enter form category'
                        />
                    </div> */}
                    {/* <div className='space-y-2'>
                        <Label htmlFor='thankyouMessage'>
                            Thank You Message
                        </Label>
                        <Textarea
                            id='thankyouMessage'
                            value={thankyouMessage}
                            onChange={(e) => setThankyouMessage(e.target.value)}
                            placeholder='Enter thank you message'
                        />
                    </div> */}
                    {/* <div className='space-y-2'>
                        <Label htmlFor='redirectUrl'>
                            Redirect URL (optional)
                        </Label>
                        <Input
                            id='redirectUrl'
                            value={redirectUrl}
                            onChange={(e) => setRedirectUrl(e.target.value)}
                            placeholder='Enter redirect URL'
                        />
                    </div> */}
                    {/* <div className='space-y-2'>
                        <div className='flex items-center space-x-2'>
                            <Switch
                                id='allowAnonymous'
                                checked={allowAnonymous}
                                onCheckedChange={setAllowAnonymous}
                            />
                            <Label htmlFor='allowAnonymous'>
                                Allow anonymous submissions
                            </Label>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <Switch
                                id='notifyOnSubmit'
                                checked={notifyOnSubmit}
                                onCheckedChange={setNotifyOnSubmit}
                            />
                            <Label htmlFor='notifyOnSubmit'>
                                Notify on submission
                            </Label>
                        </div>
                    </div> 
                    */}
                    {/* <div className='space-y-2'>
                        <Label htmlFor='language'>Language</Label>
                        <Select value={language} onValueChange={setLanguage}>
                            <SelectTrigger id='language'>
                                <SelectValue placeholder='Select language' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='en'>English</SelectItem>
                                <SelectItem value='es'>Spanish</SelectItem>
                                <SelectItem value='fr'>French</SelectItem>
                            </SelectContent>
                        </Select>
                    </div> */}
                    <div className='space-y-2'>
                        <Label htmlFor='deadline'>Deadline</Label>
                        <Input
                            id='deadline'
                            type='datetime-local'
                            value={deadline.toISOString().slice(0, 16)}
                            onChange={(e) =>
                                setDeadline(new Date(e.target.value))
                            }
                        />
                    </div>
                    <Button onClick={handleSaveForm} className='w-full'>
                        <Save className='mr-2 h-4 w-4' />
                        Save Form
                    </Button>
                    {status === 'DRAFT' && (
                        <Button
                            variant='link'
                            onClick={handlePublish}
                            className='w-full'
                        >
                            <Earth className='mr-2 h-4 w-4' />
                            Publish Form
                        </Button>
                    )}

                    {status === 'OPENED' && publicLink && (
                        <div>
                            <p>Form is published! Access it at:</p>
                            <a
                                href={publicLink}
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                {publicLink}
                            </a>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
// Export a wrapper component that ensures client-side only rendering
export default function FormBuilder(props: { params: { id: string } }) {
    return <FormBuilderClient {...props} />
}

// prevent submitting form with no questions
