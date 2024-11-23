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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogOverlay,
    DialogTitle,
} from '@/components/ui/dialog'
import { useUser } from '@/context/UserContext'
import { signOut } from '@/app/actions/auth'

const Page = () => {
    const { user } = useUser() as {
        user: {
            id: string
            user_metadata: {
                avatar_url: string
                email: string
                full_name: string
            }
        }
    }
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)

    const handleUserUpdate = (e: React.FormEvent) => {
        e.preventDefault()
        // Placeholder for user update logic
        toast({
            title: 'User Updated',
            description: 'User information has been successfully updated.',
        })
    }

    const handleDeleteAccount = async () => {
        try {
            // Call the API to delete the account
            const response = await fetch('/api/delete-account', {
                method: 'DELETE',
                body: JSON.stringify({ userId: user.id }),
            })
            signOut()
            if (response.ok) {
                toast({
                    title: 'Account Deleted',
                    description: 'Your account has been successfully deleted.',
                    variant: 'destructive',
                })
                // Optionally redirect or update the UI
            } else {
                throw new Error('Failed to delete account')
            }
        } catch (error) {
            toast({
                title: 'Error',
                description:
                    error instanceof Error
                        ? error.message
                        : 'An unknown error occurred',
                variant: 'destructive',
            })
        } finally {
            setShowDeleteDialog(false)
        }
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
                                src={user?.user_metadata.avatar_url}
                                alt={user.user_metadata.email}
                            />
                            <AvatarFallback>
                                <div className='text-xs'>
                                    {user?.user_metadata.email.split('@')[0]}
                                </div>
                            </AvatarFallback>
                        </Avatar>
                        <Button variant='outline'>Change Picture</Button>
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='username'>Username</Label>
                        <Input
                            id='username'
                            value={user?.user_metadata.full_name}
                            // onChange={(e) =>
                            //     setUser({
                            //         ...user,
                            //         username: e.target.value,
                            //     })
                            // }
                        />
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='email'>Email</Label>
                        <Input
                            id='email'
                            type='email'
                            value={user?.user_metadata.email}
                            // onChange={(e) =>
                            //     setUser({
                            //         ...user,
                            //         email: e.target.value,
                            //     })
                            // }
                        />
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='password'>New Password</Label>
                        <Input id='password' type='password' />
                    </div>
                    <Button type='submit'>Save Changes</Button>
                </form>
            </CardContent>

            {/* Delete Account Section */}
            <CardFooter className='m-3 flex flex-col items-start rounded-lg bg-red-100 p-3'>
                <div className='flex flex-col items-start space-y-2'>
                    <h2 className='text-lg font-bold text-red-600'>
                        Danger Zone
                    </h2>
                    <p className='text-sm text-gray-600'>
                        Deleting your account is irreversible. This action will
                        permanently remove your data and cannot be undone.
                    </p>
                    <Button
                        variant='destructive'
                        onClick={() => setShowDeleteDialog(true)}
                    >
                        Delete Account
                    </Button>
                </div>
            </CardFooter>

            {/* Delete Confirmation Dialog */}
            {showDeleteDialog && (
                <Dialog
                    open={showDeleteDialog}
                    onOpenChange={setShowDeleteDialog}
                >
                    <DialogOverlay />
                    <DialogContent className='w-[90%] rounded-lg md:w-full'>
                        <DialogTitle>Confirm Account Deletion</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete your account? This
                            action cannot be undone.
                        </DialogDescription>
                        <div className='flex justify-end space-x-2'>
                            <Button
                                variant='outline'
                                onClick={() => setShowDeleteDialog(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant='destructive'
                                onClick={handleDeleteAccount}
                            >
                                Confirm
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </Card>
    )
}

export default Page
