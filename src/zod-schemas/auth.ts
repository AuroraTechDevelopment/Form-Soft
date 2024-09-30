import { z } from 'zod'

const email = z
    .string()
    .min(1, 'Email is required')
    .email('Invalid Email Address')
const password = z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must have at leasy 8 characters')
    .regex(/^(?=.*[a-z])$/, {
        message: 'Password must have at least one uppercase letter',
    })
    .regex(/^(?=.*[A-Z])$/, {
        message: 'Password must have at least one lowercase letter',
    })
    .regex(/^(?=.*\d)$/, {
        message: 'Password must have at least one number',
    })
    .regex(/^(?=.*[!@#$%^&*])$/, {
        message:
            'Password must have at least one special character, ex. !@#$%^&*',
    })

export const signInSchema = z.object({
    email: email,
    password: password,
})

export const signUpSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    username: z.string().min(1, 'Username is required'),
    
    email: email,
    password: password,
})

export type SignInSchema = z.infer<typeof signInSchema>
export type SignUpSchema = z.infer<typeof signUpSchema>
