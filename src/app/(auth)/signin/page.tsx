'use client'
import SignInForm from '@/components/auth/SignInForm'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const SignIn = () => {
    const { status } = useSession()
    const router = useRouter()
    if (status === 'authenticated') {
        router.push('/')
        return
    }
    return (
        <div className='h-screen-no-nav flex items-center justify-center'>
            <Card className='flex flex-col items-center justify-center gap-2 shadow-md'>
                <CardHeader className='space-y-4'>
                    <CardTitle className='text-lg font-bold'>Sign-in</CardTitle>
                    <CardDescription>
                        Sign-in to Sentilytics to start coding with your friends
                        in real-time.
                    </CardDescription>
                </CardHeader>
                <CardContent className='w-full'>
                    <SignInForm />
                </CardContent>
            </Card>
        </div>
    )
}

export default SignIn
