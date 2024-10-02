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
        <div className='flex min-h-screen py-6'>
            <SideBar />
            <main className='mx-auto mb-12 w-full pr-6 md:mb-0 md:w-[70%]'>
                {children}
            </main>
        </div>
    )
}
