export interface Feedback {
    id: string
    userID?: string
    category: string
    comment: string
    createdAt: Date
    users?: User
}

export type Report = {
    id: string
    formID: string
    userID?: string | null
    category: string
    comment: string
    createAt: Date
    forms: {
        id: string
    }
    users?: {
        id: string
    } | null
}

export enum UserStatus {
    VERIFIED = 'VERIFIED',
    UNVERIFIED = 'UNVERIFIED',
}

export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
}
export interface User {
    id: string // UUID
    name: string
    username: string
    image?: string
    status: UserStatus // Enum for status
    role: UserRole // Enum for role
    preferences?: object
    createdAt: Date
    lastLogin: Date
    feedbacks?: Feedback[]
}
