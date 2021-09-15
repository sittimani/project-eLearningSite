export interface CourseList {
    id: string,
    name: string,
    shortDescription: string,
    url: string
}

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
    workingAt: string
}

export interface CourseOverView {
    shortDescription?: string,
    url?: string,
    description: string
}