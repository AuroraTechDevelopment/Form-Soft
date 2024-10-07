'use client'

import React from 'react'
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa'
import { IoIosArrowDown } from 'react-icons/io'
import { IoLanguage } from 'react-icons/io5'
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu'

export function Footer() {
    return (
        <footer className='flex h-full flex-grow flex-col bg-white py-4 shadow-md'>
            {/* Upper section */}
            <div className='mx-4 flex h-36 flex-col items-center justify-between md:mx-28 md:flex-row'>
                <div className='flex items-center space-x-4'>
                    <p className='text-3xl font-bold'>Survai</p>
                    <div className='flex flex-col space-y-1'>
                        <p className='text-left'>
                            Address: 123 Main St, Anytown, USA
                        </p>
                        <p className='text-left'>All Rights Are Reserved</p>
                    </div>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger className='my-4 flex items-center space-x-4 rounded-md border bg-white p-2 md:mt-0'>
                        <IoLanguage className='text-xl' />{' '}
                        <IoIosArrowDown className='text-xl' />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem
                            onClick={() => console.log('Selected: English')}
                        >
                            English
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            {/* Lower section */}
            <div className='mx-4 flex h-full flex-col items-center justify-between border-t pt-4 md:mx-12 md:flex-row'>
                <div className='flex flex-col space-y-2 md:flex-row md:space-x-4 md:space-y-0'>
                    <a
                        href='/terms'
                        className='border-l-2 pl-2 text-gray-600 md:border-l-0 md:pl-0'
                    >
                        Terms and Conditions
                    </a>
                    <a
                        href='/privacy'
                        className='border-l-2 pl-2 text-gray-600 md:border-l-0 md:pl-0'
                    >
                        Privacy Policy
                    </a>
                    <a
                        href='/security'
                        className='border-l-2 pl-2 text-gray-600 md:border-l-0 md:pl-0'
                    >
                        Security
                    </a>
                    <a
                        href='/accessibility-statement'
                        className='border-l-2 pl-2 text-gray-600 md:border-l-0 md:pl-0'
                    >
                        Accessibility Statement
                    </a>
                </div>

                <div className='mt-2 flex space-x-4 md:mt-0'>
                    <a
                        href='https://www.facebook.com'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <FaFacebook className='text-gray-600 hover:text-blue-600' />
                    </a>
                    <a
                        href='https://twitter.com'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <FaTwitter className='text-gray-600 hover:text-blue-400' />
                    </a>
                    <a
                        href='https://www.linkedin.com'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <FaLinkedin className='text-gray-600 hover:text-blue-700' />
                    </a>
                    <a
                        href='https://www.instagram.com'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <FaInstagram className='text-gray-600 hover:text-pink-500' />
                    </a>
                </div>
            </div>
        </footer>
    )
}
