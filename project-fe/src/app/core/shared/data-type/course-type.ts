// Format which display all available course in course-list component
export interface CourseList {
    id: string,
    name: string,
    shortDescription: string,
    url: string
}

// Format For course overview
export interface CourseOverView {
    shortDescription: string,
    url?: string,
    description: string
}

// Format for courseForm used when upload a new course
export interface CourseForm {
    courseName: string,
    overview: string,
    description: string,
    url: string
}