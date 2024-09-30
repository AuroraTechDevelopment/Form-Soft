import { z } from 'zod'

export const settingsSchema = z.object({
    firstName: z.string().min(1, 'First name is required').optional(),

    lastName: z.string().min(1, 'Last name is required'),

    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
        .object({
            oldPassword: z.union([
                z.string().min(8, 'Password must have than 8 characters'),
                z.string().optional(),
            ]),
            // .min(1, 'Password is required')
            newPassword: z.union([
                z.string().min(8, 'Password must have than 8 characters'),
                z.string().optional(),
            ]),
            confirmNewPassword: z.union([
                z.string().min(8, 'Password must have than 8 characters'),
                z.string().optional(),
            ]),
        })
        .partial()
        .refine(
            (data) =>
                data.oldPassword && data.newPassword && data.confirmNewPassword,
            'You must fill all password fields to change your password',
        )
        .refine((data) => data.newPassword === data.confirmNewPassword, {
            message: 'Passwords do not match',
        }),
    image: z
        .custom<File | string>()
        .refine((file) => {
            if (typeof file === 'string') return true
            if (file?.size <= 5000000) return 'Max image size is 5MB'
        })
        .refine((file) => {
            if (typeof file === 'string') return true
            else
                ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(
                    file?.type,
                )
        }, 'Only .jpg, .jpeg, .png and .webp formats are supported.'),
})

export type settingsSchema = z.infer<typeof settingsSchema>
