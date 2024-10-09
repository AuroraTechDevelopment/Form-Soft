import { redirect } from 'next/navigation'

export default function Dashboard() {
    // Redirect to the /dashboard/form route
    redirect('/dashboard/forms')

    return null // No need to render anything, just handle the redirect
}
