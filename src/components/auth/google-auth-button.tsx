import googleIcon from '@/public/icons/google-icon.png'
import Image from 'next/image'
import { Button } from '../ui/button'
import { createClient } from '@/lib/supabase/client'

// Google icon source: https://www.iconfinder.com/icons/7123025/logo_google_g_icon
const GoogleAuthButton = () => {
    const supabase = createClient()
    return (
        <Button
            variant={'outline'}
            className='flex w-full items-center justify-center gap-2'
            onClick={async () => {
                await supabase.auth.signInWithOAuth({
                    provider: 'google',
                    options: {
                        redirectTo: `${process.env.NEXT_PUBLIC_OAUTH_URL}/api/auth/callback`,
                    },
                })
            }}
        >
            <Image src={googleIcon} alt='Google icon' width={30} height={30} />
            Continue with Google
        </Button>
    )
}

export default GoogleAuthButton
