export interface CourseList {
    id: string,
    name: string,
    shortDescription: string,
    url: string
}

export interface CourseOverView {
    shortDescription: string,
    url?: string,
    description: string
}

export interface CourseForm {
    courseName: string,
    overview: string,
    description: string,
    url: string
}