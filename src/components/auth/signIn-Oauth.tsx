'use client'

import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import googleIcon from '@/public/icons/google-icon.png'
import { toast } from '@/hooks/use-toast'
import { loginOAuth } from '@/app/actions/auth'

const SignInOauth = () => {
    return (
        <div className='flex flex-col items-center gap-4'>
            <p className='text-sm text-muted-foreground'>Sign-in with...</p>
            <div className='flex w-full gap-2'>
                <Button
                    variant={'outline'}
                    className='flex w-full items-center justify-center gap-2'
                    onClick={async () => {
                        const res = await loginOAuth('google')
                        if (res && !res?.success)
                            toast({
                                title: 'Error',
                                description:
                                    'Login Failed\n' +
                                    'You are already Logged in',
                                variant: 'destructive',
                            })
                    }}
                >
                    <Image
                        src={googleIcon}
                        alt='Google icon'
                        width={30}
                        height={30}
                    />
                    Continue with Google
                </Button>
            </div>
        </div>
    )
}

export default SignInOauth
