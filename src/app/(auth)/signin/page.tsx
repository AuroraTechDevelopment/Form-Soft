import SignInForm from '@/components/auth/signIn-form'
import SignInOauth from '@/components/auth/signIn-Oauth'
import SerparatorText from '@/components/serparator-text'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

const SignIn = () => {
    return (
        <div className='flex h-screen-no-nav items-center justify-center'>
            <Card className='flex flex-col items-center justify-center gap-2 shadow-md'>
                <CardHeader className='space-y-4'>
                    <CardTitle className='text-lg font-bold'>Sign-in</CardTitle>
                    <CardDescription>
                        Sign-in to Sentilytics to start coding with your friends
                        in real-time.
                    </CardDescription>
                </CardHeader>
                <CardContent className='w-full space-y-4'>
                    <SignInForm />
                    <SerparatorText text='OR' />
                    <SignInOauth />
                </CardContent>
            </Card>
        </div>
    )
}

export default SignIn
