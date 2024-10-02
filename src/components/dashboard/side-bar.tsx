// 'use client'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { FormInputIcon, MessageCircleHeart, Users } from 'lucide-react'
import Link from 'next/link'
import { Separator } from '../ui/separator'

const SideBar = () => {
    // const [activeSection, setActiveSection] = useState('forms')

    const Links = [
        {
            title: 'Forms',
            href: '/dashboard/forms',
            icon: <FormInputIcon className='mr-2 h-4 w-4' />,
        },
        {
            title: 'Feedback',
            href: '/dashboard/feedback',
            icon: <MessageCircleHeart className='mr-2 h-4 w-4' />,
        },
        {
            title: 'Settings',
            href: '/dashboard/settings',
            icon: <Users className='mr-2 h-4 w-4' />,
        },
    ]

    return (
        <div className='flex h-full'>
            <div className='sticky top-6 h-min min-w-48'>
                <Link href={'/dashboard'}>
                    <h1 className='mb-6 text-2xl font-bold'>Dashboard</h1>
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
            <Separator orientation='vertical' />
        </div>
    )
}

export default SideBar
