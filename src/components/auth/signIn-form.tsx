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
import { signInSchema, SignInSchema } from '@/zod-schemas/auth'
import { Loader2 } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'

const SignInForm = () => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const callbackURL = searchParams.get('callbackURL') || '/'
    console.log(callbackURL)

    const form = useForm<SignInSchema>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    async function onSubmit(data: SignInSchema) {
        // validate the form
        const validCredentials = signInSchema.safeParse(data)

        if (!validCredentials.success) {
            toast({
                title: 'Error',
                description: 'Login Failed\n' + validCredentials.error,
                variant: 'destructive',
            })
            return
        }

        const res = await signIn('credentials', {
            ...validCredentials.data,
            redirect: false,
        })
        if (res?.ok) {
            toast({
                title: 'Success',
                description: 'You have been logged in Successfully',
            })
            router.push(callbackURL)
        } else {
            console.log(res)
            toast({
                title: 'Error',
                description: 'Login Failed\n' + res?.error,
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

export default SignInForm