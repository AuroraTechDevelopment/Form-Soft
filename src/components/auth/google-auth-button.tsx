import googleIcon from '@/public/icons/google-icon.png'
import Image from 'next/image'
import { Button } from '../ui/button'
import { signIn } from 'next-auth/react'

// Google icon source: https://www.iconfinder.com/icons/7123025/logo_google_g_icon
const GoogleAuthButton = () => {
    return (
        <Button
            variant={'outline'}
            className='flex w-full items-center justify-center gap-2'
            onClick={() => {
                signIn('google', { callbackUrl: '/' })
            }}
        >
            <Image src={googleIcon} alt='Google icon' width={30} height={30} />
            Continue with Google
        </Button>
    )
}

export default GoogleAuthButton
