import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/server'
import { LogOut } from 'lucide-react'
// import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { signOut } from './actions/auth'

export default async function Home() {
    // const { data: session } = useSession()

    const supabase = createClient()

    const {
        data: { user },
        error,
    } = await supabase.auth.getUser()
    // const { data: session, error } = await supabase.auth.getSession()
    if (error || !user) {
        console.log('error:', error)
        console.log('user:', user)
        // redirect('/signin')
    }

    return (
        <div>
            {user ? (
                <>
                    {/* <h1>Welcome {user.name}</h1> */}
                    <p>Your email is {user.email}</p>
                    <form>
                        <Button
                            variant='ghost'
                            className='text-red-500'
                            formAction={signOut}
                            // onClick={async () => {
                            //     await signOut()
                            // }}
                        >
                            <LogOut /> <span>Log out</span>
                        </Button>
                    </form>
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
