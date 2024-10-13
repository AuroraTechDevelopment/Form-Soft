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
    INCOMPLETE = 'INCOMPLETE',
    OPEN = 'OPEN',
    CLOSED = 'CLOSED',
    DEACTIVATED = 'DEACTIVATED',
    ARCHIVED = 'ARCHIVED',
    DELETED = 'DELETED',
}

export enum UserRole {
    ADMIN = 'ADMIN',
    MODERATOR = 'MODERATOR',
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
    forms?: Form[]
    feedbacks?: Feedback[]
}

export enum FormStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    ARCHIVED = 'ARCHIVED',
}

export interface Form {
    id: string
    userID: string
    title: string
    description: string
    questions: unknown
    manySubmission: boolean
    editable: boolean
    status: FormStatus
    viewCount: number
    submissionCount: number
    createdAt: Date
    updatedAt: Date
    deadline: Date
}
