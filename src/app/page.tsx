'use client'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

export default function Home() {
    const { data: session } = useSession()
    return (
        <div>
            {session?.user ? (
                <>
                    <h1>Welcome {session.user.name}</h1>
                    <p>Your email is {session.user.email}</p>
                    <Button
                        variant='ghost'
                        className='text-red-500'
                        onClick={async () => {
                            await signOut()
                        }}
                    >
                        <LogOut /> <span>Log out</span>
                    </Button>
                </>
            ) : (
                <>
                    <p>You are not logged in</p>
                    <LoginSignUp />
                </>
            )}
        </div>
    )
}

const LoginSignUp = () => {
    return (
        <div className='inline-flex space-x-2'>
            <div>
                <Link href='/signin' legacyBehavior passHref>
                    <Button variant='outline'>Log in</Button>
                </Link>
            </div>
            <div>
                <Link href='/signup' legacyBehavior passHref>
                    <Button variant='default'>Sign up</Button>
                </Link>
            </div>
        </div>
    )
}
