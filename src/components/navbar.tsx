'use client'
import { useState } from 'react'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuLink,
} from '@/components/ui/navigation-menu'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header className='z-40 flex h-16 w-full justify-between bg-white p-4 shadow-md'>
            <div className='flex items-center space-x-4'>
                <span className='text-xl font-bold'>Sentlytics</span>
            </div>

            <div className='md:hidden'>
                <Button
                    variant='ghost'
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? (
                        <X className='h-6 w-6' />
                    ) : (
                        <Menu className='h-6 w-6' />
                    )}
                </Button>
            </div>

            <nav
                className={`absolute left-0 right-0 top-16 w-full flex-col bg-white p-4 md:static md:flex md:flex-row md:items-center md:justify-between md:space-x-4 md:p-0 ${isMenuOpen ? 'block' : 'hidden'} z-50`}
            >
                <NavigationMenu className='flex w-full flex-col md:mx-auto md:flex-row md:items-center'>
                    <NavigationMenuList className='flex w-full flex-col md:flex-row md:space-x-4'>
                        <NavigationMenuItem className='w-full'>
                            <NavigationMenuLink
                                href='#services'
                                className='inline-flex h-16 w-full items-center justify-center border-b-2 border-transparent text-sm font-medium transition-colors hover:border-b-gray-500'
                            >
                                Services
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem className='w-full'>
                            <NavigationMenuLink
                                href='#templates'
                                className='inline-flex h-16 w-full items-center justify-center border-b-2 border-transparent text-sm font-medium transition-colors hover:border-b-gray-500'
                            >
                                Templates
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem className='w-full'>
                            <NavigationMenuLink
                                href='#pricing'
                                className='inline-flex h-16 w-full items-center justify-center border-b-2 border-transparent text-sm font-medium transition-colors hover:border-b-gray-500'
                            >
                                Pricing
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem className='w-full'>
                            <NavigationMenuLink
                                href='#resources'
                                className='inline-flex h-16 w-full items-center justify-center border-b-2 border-transparent text-sm font-medium transition-colors hover:border-b-gray-500'
                            >
                                Resources
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                <div className='mt-4 flex flex-col justify-end space-y-4 md:ml-auto md:mt-0 md:flex-row md:space-x-4 md:space-y-0'>
                    <Button variant='outline' className='w-full md:w-auto'>
                        Log In
                    </Button>
                    <Button className='w-full md:w-auto'>Sign Up</Button>
                </div>
            </nav>
        </header>
    )
}
