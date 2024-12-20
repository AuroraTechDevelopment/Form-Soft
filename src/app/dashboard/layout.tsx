import SideBar from '@/components/dashboard/side-bar'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import UserNavbar from '@/components/dashboard/user-navbar'

export default async function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = createClient()
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser()

    if (error || !user) {
        redirect('/')
    }

    return (
        // <UserProvider user={user}>
        <div className='min-h-screen flex-col'>
            <UserNavbar />
            <div className='flex min-h-screen py-6'>
                <SideBar type='user' />
                <main className='mx-auto mb-12 w-full pr-6 md:mb-0 md:w-[70%]'>
                    {children}
                </main>
            </div>
        </div>
    // </UserProvider>
    )
}
