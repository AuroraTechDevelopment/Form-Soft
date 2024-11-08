'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast'
import { signUpSchema, SignUpSchema } from '@/zod-schemas/auth'
import { Loader2 } from 'lucide-react'
import { signup } from '@/app/actions/auth'

const SignUpForm = () => {
    const form = useForm<SignUpSchema>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'all',
    })

    async function onSubmit(data: SignUpSchema) {
        // validate the form
        const validCredentials = signUpSchema.safeParse(data)
        console.log(validCredentials)
        if (!validCredentials.success) {
            toast({
                title: 'Error',
                description: 'Registration Failed: ' + validCredentials.error,
                variant: 'destructive',
            })
            return
        }

        try {
            const res = await signup(validCredentials.data)
            if (!res.success) {
                toast({
                    title: 'Error',
                    description:
                        'Registration Failed: ' +
                        (res.error?.message || 'An unknown error occurred'),
                    variant: 'destructive',
                })
            } else {
                toast({
                    title: 'Success',
                    description:
                        'Registration Successful \n We have sent you a verification email',
                })
                form.reset()
            }
        } catch (error) {
            toast({
                title: 'Error',
                description:
                    'Registration Failed: ' +
                    (error instanceof Error
                        ? error.message
                        : 'An unknown error occurred'),
                variant: 'destructive',
            })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='email'
                                    autoFocus
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>Enter your email.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    type='password'
                                    placeholder='Password'
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Enter your password.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {form.formState.isSubmitting ? (
                    <Button
                        type='submit'
                        disabled={!form.formState.isSubmitting}
                    >
                        <Loader2 size={24} className='animate-spin' />
                    </Button>
                ) : (
                    <Button type='submit' disabled={!form.formState.isValid}>
                        Submit
                    </Button>
                )}
            </form>
        </Form>
    )
}

export default SignUpForm
