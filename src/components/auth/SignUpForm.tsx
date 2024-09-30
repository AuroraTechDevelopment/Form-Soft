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
import axio from '@/lib/axios'
import { signUpSchema, SignUpSchema } from '@/zod-schemas/auth'
import { Loader2 } from 'lucide-react'
import { redirect } from 'next/navigation'

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
        const response = await axio.post('/api/auth/signup', data)
        if (response.status === 200) {
            toast({
                title: 'Success!',
                description: response.data + ' Redirecting to login page.',
            })
            // setTimeout(() => {
            //     window.location.href = '/login'
            // }, 1000)
            redirect('/login')
        } else {
            toast({
                title: 'Error',
                description: response.data,
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
                    render={({ field, fieldState, formState }) => (
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
