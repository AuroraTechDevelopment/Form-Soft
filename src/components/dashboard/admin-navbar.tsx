import { ChevronDown, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function AdminNavbar() {
    return (
        <nav className='bg-white shadow-sm'>
            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                <div className='flex h-16 justify-between'>
                    <div className='flex'>
                        <div className='flex flex-shrink-0 items-center'>
                            <span className='ml-2 text-2xl font-bold text-gray-900'>
                                Admin Dashboard
                            </span>
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
                                        <AvatarImage
                                            src='/placeholder.svg?height=32&width=32'
                                            alt='User avatar'
                                        />
                                        <AvatarFallback>AD</AvatarFallback>
                                    </Avatar>
                                    <span className='ml-2 hidden sm:inline-block'>
                                        Admin User
                                    </span>
                                    <ChevronDown className='ml-2 h-4 w-4' />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='end'>
                                <DropdownMenuLabel>
                                    My Account
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <User className='mr-2 h-4 w-4' />
                                    <span>Profile</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </nav>
    )
}
