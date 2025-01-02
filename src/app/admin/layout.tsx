import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AdminNavbar from '@/components/dashboard/admin-navbar'
import SideBar from '@/components/dashboard/side-bar'

export default async function AdminLayout({
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

    // Check if user is NOT an admin (doesn't have @survai email)
    // If they're not, redirect them away from admin routes
    if (!user.email?.includes('@survai')) {
        redirect('/dashboard/forms')
    }

    return (
        <div className='min-h-screen flex-col'>
            <AdminNavbar />
            <div className='flex min-h-screen py-6'>
                <SideBar type='admin' />
                <main className='mx-auto mb-12 w-full pr-6 md:mb-0 md:w-[70%]'>
                    {children}
                </main>
            </div>
        </div>
    )
}
