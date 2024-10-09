'use client'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import {
    FormInputIcon,
    MessageCircleHeart,
    Settings,
    Users,
} from 'lucide-react' // Add more icons if needed
import Link from 'next/link'
import { Separator } from '../ui/separator'
import { useEffect, useState } from 'react'

const SideBar = ({ type }: { type: 'admin' | 'user' }) => {
    // Admin-specific links
    const AdminLinks = [
        {
            title: 'Form Management',
            href: '/admin/dashboard/forms',
            icon: <Users className='h-6 w-6 md:mr-2 md:h-4 md:w-4' />,
        },
        {
            title: 'User Management',
            href: '/admin/dashboard/users',
            icon: <Users className='h-6 w-6 md:mr-2 md:h-4 md:w-4' />,
        },
        {
            title: 'Moderator Management',
            href: '/admin/dashboard/moderators',
            icon: <Users className='h-6 w-6 md:mr-2 md:h-4 md:w-4' />,
        },
        {
            title: 'View Reports',
            href: '/admin/dashboard/reports',
            icon: <Users className='h-6 w-6 md:mr-2 md:h-4 md:w-4' />,
        },
        {
            title: 'View Feedback',
            href: '/admin/dashboard/feedbacks',
            icon: <Users className='h-6 w-6 md:mr-2 md:h-4 md:w-4' />,
        },
        {
            title: 'Settings',
            href: '/admin/dashboard/settings',
            icon: <Settings className='h-6 w-6 md:mr-2 md:h-4 md:w-4' />,
        },
    ]

    // User-specific links
    const UserLinks = [
        {
            title: 'Forms',
            href: '/dashboard/forms',
            icon: <FormInputIcon className='h-6 w-6 md:mr-2 md:h-4 md:w-4' />,
        },
        {
            title: 'Feedback',
            href: '/dashboard/feedback',
            icon: (
                <MessageCircleHeart className='h-6 w-6 md:mr-2 md:h-4 md:w-4' />
            ),
        },
        {
            title: 'Settings',
            href: '/dashboard/settings',
            icon: <Settings className='h-6 w-6 md:mr-2 md:h-4 md:w-4' />,
        },
    ]

    const Links = type === 'admin' ? AdminLinks : UserLinks

    // State to determine if the screen size is small
    const [isMobile, setIsMobile] = useState(false)

    const handleResize = () => {
        if (window.innerWidth < 768) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }

    useEffect(() => {
        handleResize() // Check initial size
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <div className='flex h-full flex-col pl-6 md:w-[20%]'>
            {/* Desktop Navigation */}
            <div className='sticky top-6 hidden h-min min-w-48 md:block'>
                <Link
                    href={type === 'admin' ? '/admin/dashboard' : '/dashboard'}
                >
                    <h1 className='mb-6 text-2xl font-bold'>
                        {type === 'admin'
                            ? 'Admin Dashboard'
                            : 'User Dashboard'}
                    </h1>
                </Link>
                <NavigationMenu
                    orientation='vertical'
                    className='w-full items-start justify-start'
                >
                    <NavigationMenuList className='w-full flex-col items-start justify-start space-x-0 space-y-2'>
                        {Links.map((link, index) => (
                            <NavigationMenuItem key={index}>
                                <Link href={link.href} legacyBehavior passHref>
                                    <NavigationMenuLink
                                        className={navigationMenuTriggerStyle()}
                                    >
                                        {link.icon}
                                        {link.title}
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
            </div>

            {/* Mobile Bottom Navigation */}
            {isMobile && (
                <div className='fixed bottom-0 left-0 right-0 flex justify-around border-t border-gray-200 bg-white p-2 shadow-md md:hidden'>
                    {Links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            legacyBehavior
                            passHref
                        >
                            <div className='flex flex-col items-center justify-center'>
                                {link.icon}
                                <span className='text-xs'>{link.title}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            <Separator orientation='vertical' />
        </div>
    )
}

export default SideBar
