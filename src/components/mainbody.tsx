'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { FcGoogle } from 'react-icons/fc'
import { FaMicrosoft } from 'react-icons/fa'

export function MainBody() {
    const buttonVariants = {
        hover: {
            scale: 1.05,
            transition: { duration: 0.3 },
        },
        tap: {
            scale: 0.95,
            transition: { duration: 0.1 },
        },
    }

    return (
        <div className='my-20 flex flex-grow flex-col items-center justify-center p-5 md:my-0 md:h-screen'>
            <motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className='mb-8 text-center text-4xl font-bold md:text-6xl'
            >
                The <FastestText /> Way To Get Your Feedback
            </motion.h1>
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className='flex w-full max-w-md flex-col space-y-4'
            >
                <motion.div
                    variants={buttonVariants}
                    whileHover='hover'
                    whileTap='tap'
                >
                    <Button className='w-full'>Sign up with Email</Button>
                </motion.div>
                <div className='flex items-center'>
                    <hr className='flex-grow border-t border-gray-300' />
                    <span className='mx-2 text-xs text-gray-500'>
                        or sign up with
                    </span>
                    <hr className='flex-grow border-t border-gray-300' />
                </div>
                <div className='flex w-full flex-col items-center justify-center space-y-2 md:flex-row md:space-x-2 md:space-y-0'>
                    <motion.div
                        variants={buttonVariants}
                        whileHover='hover'
                        whileTap='tap'
                        className='w-full'
                    >
                        <Button
                            variant='outline'
                            className='flex w-full items-center'
                        >
                            <FcGoogle className='mr-2 h-6 w-6' /> Sign up
                        </Button>
                    </motion.div>
                    <motion.div
                        variants={buttonVariants}
                        whileHover='hover'
                        whileTap='tap'
                        className='w-full'
                    >
                        <Button
                            variant='outline'
                            className='flex w-full items-center'
                        >
                            <FaMicrosoft className='mr-2 h-6 w-6 text-cyan-500' />{' '}
                            Sign up
                        </Button>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    )
}

function FastestText() {
    return (
        <div className='group relative inline-flex'>
            <motion.span
                className='transform transition duration-500 group-hover:translate-x-full group-hover:text-transparent group-hover:opacity-0'
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: 100 }}
            >
                Fastest
            </motion.span>
            <motion.span
                className='absolute inset-0 flex items-center justify-center text-black opacity-0 transition duration-500 group-hover:opacity-100'
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
            >
                <motion.div
                    animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                >
                    🚀
                </motion.div>
            </motion.span>
        </div>
    )
}
