import AdminNavbar from '@/components/dashboard/admin-navbar'
import SideBar from '@/components/dashboard/side-bar'
// import { getServerAuthSession } from '@/server/auth'
// import { redirect } from 'next/navigation'

export default async function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    // Uncomment this section to enable authentication
    // const session = await getServerAuthSession();
    // if (!session) {
    //     const callbackURL = encodeURIComponent('/dashboard'); // Redirect to sign-in with callback URL
    //     redirect(`/signin?callbackURL=${callbackURL}`);
    // }

    return (
        <div className='min-h-screen flex-col'>
            <AdminNavbar />
            <div className='flex'>
                <SideBar type='admin' />
                <main className='mx-auto mb-12 w-full p-2 px-4 md:mb-0 md:w-[70%]'>
                    {children}
                </main>
            </div>
        </div>
    )
}
