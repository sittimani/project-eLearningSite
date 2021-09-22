import { CourseOverView } from "src/app/course-management";


export interface TopicDetail {
    documentLink: string,
    tutorialLink: string,
    teacherID: string,
    courseName?: string,
    topicName?: string
}

export interface Topic {
    [key: string]: CourseOverView | any | TopicDetail | string ,
    _id: string,
    overview: CourseOverView,
    courseName: string,
    updatedAt: string,
    createdAt: string
}
