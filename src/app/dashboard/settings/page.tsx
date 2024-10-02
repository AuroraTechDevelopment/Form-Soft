'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { toast } from '@/hooks/use-toast'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
const Page = () => {
    const [user, setUser] = useState({
        fullName: 'John Doe',
        username: 'johndoe',
        email: 'john@example.com',
        profilePicture: '/placeholder.svg?height=100&width=100',
    })

    const handleUserUpdate = (e: React.FormEvent) => {
        e.preventDefault()
        // Placeholder for user update logic
        toast({
            title: 'User Updated',
            description: 'User information has been successfully updated.',
        })
    }

    const handleDeleteAccount = () => {
        // Placeholder for account deletion logic
        toast({
            title: 'Account Deleted',
            description: 'Your account has been successfully deleted.',
            variant: 'destructive',
        })
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Manage your account settings</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleUserUpdate} className='space-y-4'>
                    <div className='flex items-center space-x-4'>
                        <Avatar className='h-20 w-20'>
                            <AvatarImage
                                src={user.profilePicture}
                                alt={user.fullName}
                            />
                            <AvatarFallback>
                                {user.fullName.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <Button variant='outline'>Change Picture</Button>
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='fullName'>Full Name</Label>
                        <Input
                            id='fullName'
                            value={user.fullName}
                            onChange={(e) =>
                                setUser({
                                    ...user,
                                    fullName: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='username'>Username</Label>
                        <Input
                            id='username'
                            value={user.username}
                            onChange={(e) =>
                                setUser({
                                    ...user,
                                    username: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='email'>Email</Label>
                        <Input
                            id='email'
                            type='email'
                            value={user.email}
                            onChange={(e) =>
                                setUser({
                                    ...user,
                                    email: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='password'>New Password</Label>
                        <Input id='password' type='password' />
                    </div>
                    <Button type='submit'>Save Changes</Button>
                </form>
            </CardContent>
            <CardFooter>
                <Button variant='destructive' onClick={handleDeleteAccount}>
                    Delete Account
                </Button>
            </CardFooter>
        </Card>
    )
}

export default Page
