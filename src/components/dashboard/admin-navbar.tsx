'use client'
import { ChevronDown, LogOutIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { signOut } from '../../app/actions/auth'
import { useUser } from '@/context/UserContext'
import Link from 'next/link'
import Image from 'next/image'

export default function AdminNavbar() {
    const { user } = useUser() as {
        user: {
            id: string
            email: string
            user_metadata: {
                email_verified: boolean
            }
            app_metadata: {
                provider: string
                providers: string[]
            }
        }
    }
    console.log('user:', user)

    // Get initials from email for avatar fallback
    const getInitials = (email: string) => {
        return email.split('@')[0].substring(0, 2).toUpperCase()
    }

    return (
        <nav className='bg-white shadow-sm'>
            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                <div className='flex h-16 justify-between'>
                    <div className='flex'>
                        <div className='flex flex-shrink-0 items-center'>
                            <Link
                                href='/admin/dashboard'
                                className='flex items-center justify-center space-x-2 text-xl font-bold'
                            >
                                <Image
                                    src='/images/logo-light.png'
                                    alt='Survai Logo'
                                    width={50}
                                    height={50}
                                />
                                <div>Admin Dashboard</div>
                            </Link>
                        </div>
                    </div>
                    <div className='flex items-center'>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant='ghost'
                                    className='ml-4 flex items-center'
                                >
                                    <Avatar className='h-8 w-8'>
                                        <AvatarFallback>
                                            {getInitials(user?.email)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className='ml-2 hidden sm:inline-block'>
                                        {user?.email?.split('@')[0]}
                                    </span>
                                    <ChevronDown className='ml-2 h-4 w-4' />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='end'>
                                <DropdownMenuLabel>
                                    {user?.email}
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <LogOutIcon className='h-4 w-4 rotate-180' />
                                    <form>
                                        <Button
                                            variant='ghost'
                                            formAction={signOut}
                                        >
                                            Logout
                                        </Button>
                                    </form>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </nav>
    )
}
