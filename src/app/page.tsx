import { Navbar } from '@/components/navbar'
import { MainBody } from '@/components/mainbody'
import { Footer } from '@/components/footer'
import { WavyBackground } from '@/components/ui/wavy-background'
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
        <div className='relative flex h-screen w-full flex-col bg-gray-50'>
            {/* WavyBackground will act as the absolute background */}
            <WavyBackground
                className='z-50'
                backgroundFill='#f9fafb'
                blur={1}
                speed='slow'
            />
            <div className='z-10 flex flex-grow flex-col justify-between'>
                <Navbar />
                <div className='z-10 flex-grow'>
                    <MainBody />
                </div>
                <Footer />
            </div>           
        </div>
    )
}


