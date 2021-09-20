export interface Roles {
    _id?: string,
    readDocument: boolean,
    createDocument: boolean,
    updateDocument: boolean,
    createCourse?: boolean,
    deleteCourse?: boolean
}

export interface ProfessorData {
    name: string,
    email: string,
    _id: string,
    workingAt?: string
}

export interface userAuth {
    _id: string,
    email: string,
    emailVerified: boolean,
    password: string,
    role: string,
    verified: string,
    createdAt: string,
    updatedAt: string
}

export interface UserInformation {
    _id?: string,
    age: number,
    gender: string,
    name: string,
    phone: number,
    password?: string,
    email?: string,
    workingAt?: string,
    userID?: string,
    createdAt?: string,
    updatedAt?: string
}

export interface LoginResponse {

    accessToken: string,
    user: {
        users: userDetails
    }

}

export interface ResetPassword {
    id: string,
    oldPassword: string,
    newPassword: string
}

export interface LoginCreditionals {
    email: string,
    password?: string
}

export interface userDetails {
    _id: string,
    name: string,
    role: Roles
}

export interface UpdatePermission {
    id: string,
    verified: string
}
