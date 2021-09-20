import { CourseOverView } from "./course-type";

export interface TopicDetail {
    documentLink: string,
    tutorialLink: string,
    teacherID: string,
    courseName?: string,
    topicName?: string
}

export interface Topic {
    [key: string]: CourseOverView | TopicDetail | string | any,
    _id: string,
    overview: CourseOverView,
    courseName: string,
    updatedAt: string,
    createdAt: string
}
