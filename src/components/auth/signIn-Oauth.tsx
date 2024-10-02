import React from 'react'
import GoogleAuthButton from './google-auth-button'

const SignInOauth = () => {
    return (
        <div className='flex flex-col items-center gap-4'>
            <p className='text-sm text-muted-foreground'>Sign-in with...</p>
            <div className='flex w-full gap-2'>
                <GoogleAuthButton />
            </div>
        </div>
    )
}

export default SignInOauth
