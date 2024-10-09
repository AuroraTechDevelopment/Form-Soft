'use client'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import {
    Layout,
    Users,
    FileText,
    Shield,
    Flag,
    MessageSquare,
    Settings,
} from 'lucide-react'

import Link from 'next/link'
import { Separator } from '../ui/separator'
import { useEffect, useState } from 'react'

const SideBar = ({ type }: { type: 'admin' | 'user' }) => {
    // Admin-specific links
    const AdminLinks = [
        {
            title: 'Dashboard',
            href: '/admin/dashboard',
            icon: <Layout className='h-6 w-6' />,
        },
        {
            title: 'Form Management',
            href: '/admin/forms',
            icon: <FileText className='h-6 w-6' />,
        },
        {
            title: 'User Management',
            href: '/admin/users',
            icon: <Users className='h-6 w-6' />,
        },
        {
            title: 'Moderator Management',
            href: '/admin/moderators',
            icon: <Shield className='h-6 w-6' />,
        },
        {
            title: 'View Reports',
            href: '/admin/reports',
            icon: <Flag className='h-6 w-6' />,
        },
        {
            title: 'View Feedback',
            href: '/admin/feedbacks',
            icon: <MessageSquare className='h-6 w-6' />,
        },
        {
            title: 'Settings',
            href: '/admin/settings',
            icon: <Settings className='h-6 w-6' />,
        },
    ]

    // User-specific links
    const UserLinks = [
        {
            title: 'Forms',
            href: '/dashboard/forms',
            icon: <FileText className='h-6 w-6' />,
        },
        {
            title: 'Feedback',
            href: '/dashboard/feedback',
            icon: <MessageSquare className='h-6 w-6' />,
        },
        {
            title: 'Settings',
            href: '/dashboard/settings',
            icon: <Settings className='h-6 w-6' />,
        },
    ]

    const Links = type === 'admin' ? AdminLinks : UserLinks

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
        <div className='flex h-full min-h-screen flex-col pt-4 shadow-lg md:w-[25%] md:pl-6'>
            {/* Desktop Navigation */}
            <NavigationMenu
                orientation='vertical'
                className='hidden w-full items-start justify-start md:block'
            >
                <NavigationMenuList className='w-full flex-col items-start justify-start space-x-0 space-y-2'>
                    {Links.map((link, index) => (
                        <NavigationMenuItem key={index}>
                            <Link href={link.href}>
                                <NavigationMenuLink
                                    className={navigationMenuTriggerStyle()}
                                >
                                    {link.icon}
                                    <div className='ml-2'>{link.title}</div>
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>

            {/* Slidable Mobile Bottom Navigation for Admin */}
            {isMobile && type === 'admin' && (
                <div className='fixed bottom-0 left-0 right-0 z-50 flex overflow-x-auto bg-white p-4 shadow-md md:hidden'>
                    <div className='flex w-max space-x-6'>
                        {Links.map((link, index) => (
                            <Link key={index} href={link.href}>
                                <div className='flex h-full w-full flex-col items-center justify-center space-x-2'>
                                    {link.icon}
                                    <span className='text-center text-xs'>
                                        {link.title}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* Mobile Bottom Navigation for User */}
            {isMobile && type === 'user' && (
                <div className='fixed bottom-0 left-0 right-0 flex justify-around border-t border-gray-200 bg-white p-4 shadow-md md:hidden'>
                    {Links.map((link, index) => (
                        <Link key={index} href={link.href}>
                            <div className='flex flex-col items-center justify-center space-x-2'>
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
