import {
    type NextAuthOptions,
    type DefaultSession,
    getServerSession,
    User,
} from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/server/prisma'
import CredentialsProvider from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import { compare } from 'bcrypt'
import { signInSchema } from '@/zod-schemas/auth'

declare module 'next-auth' {
    interface Session extends DefaultSession {
        user: {
            id: string
            email: string
            name: string
            role: string
        } & DefaultSession['user']
    }
    interface User {
        id: string
        email: string
        name: string
        role: string
    }
    interface JWT {
        user: {
            id: string
            email: string
            name: string
            role: string
        } & DefaultSession['user']
    }
}

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        Google({
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code',
                },
            },
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {
                    type: 'email',
                },
                password: { type: 'password' },
            },
            async authorize(credentials) {
                try {
                    // console.log('credentials', credentials)
                    const validCredentials = signInSchema.safeParse(credentials)

                    if (!validCredentials.success) {
                        throw new Error(
                            'Invalid credentials ' + validCredentials.error,
                        )
                    }

                    const { email, password } = validCredentials.data

                    const user = await prisma.user.findUnique({
                        where: { email: email.toLowerCase() },
                    })

                    if (!user) {
                        throw new Error('Invalid Email')
                    }

                    const isValid = await compare(password, user.password)
                    if (!isValid) {
                        throw new Error('Invalid password')
                    }

                    return {
                        id: user.id,
                        email: user.email,
                        name: user.fullName,
                        role: user.role,
                    }
                } catch (error) {
                    console.log('error', error)
                    return null
                }
            },
        }),
    ],
    pages: {
        signIn: '/signin',
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,
    },
    callbacks: {
        async signIn({ account, profile }) {
            if (account?.provider === 'google') {
                // Check if the email exists in the database (users model)

                // If the email does not exist, create a new user

                return (
                    profile?.email_verified &&
                    profile?.email?.endsWith('@gmail.com')
                )
            }
            return true // Do different verification for other providers that don't have `email_verified`
        },
        async jwt({ token, user }) {
            if (user) {
                token.user = user
            }
            return token
        },
        async session({ session, token }) {
            const user = token.user as User

            return {
                ...session,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    image: user.image,
                },
            }
        },
    },
    secret: process.env.NEXTAUTH_SECRET!,
    debug: process.env.NODE_ENV === 'development',
}

export const getServerAuthSession = () => getServerSession(authOptions)
