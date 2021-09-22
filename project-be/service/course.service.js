import courseModel from '../models/course-model.js'
import { statusCode } from '../constants/status-code.js'
import { statusText } from '../constants/status-text.js'
import { dbError } from './response.js'

export default class Course {
    constructor() { }

    async allCourse() {
        try {
            const data = await courseModel.find({})
            if (data)
                return { statusCode: statusCode.ok, message: data }
            return { statusCode: statusCode.ok, message: [] }
        } catch (error) {
            return dbError
        }
    }

    async allTopics(name) {
        try {
            const data = await courseModel.find({ courseName: name })
            return { statusCode: statusCode.ok, message: data }
        } catch (error) {
            return dbError
        }
    }

    async updateTopic(body) {
        const courseName = body.courseName;
        const topicName = body.topicName;
        const value = {
            documentLink: body.documentLink,
            tutorialLink: body.tutorialLink,
            teacherID: body.teacherID
        }
        try {
            await courseModel.updateOne({ courseName: courseName }, {
                $set: { [topicName]: value }
            })
            return { statusCode: statusCode.ok, message: statusText.updated }
        } catch (error) {
            return dbError
        }
    }

    async particularTopic(courseName) {
        try {
            const data = await courseModel.findOne({ courseName: courseName })
            return { statusCode: statusCode.ok, message: data }
        } catch (error) {
            return dbError
        }
    }

    async createCourse(body, overview) {
        const { courseName, url, description } = body
        try {
            const data = await courseModel.findOne({ courseName: courseName })
            if (data !== null) {
                return { statusCode: statusCode.alreadyExists, message: statusText.alreadyExists }
            } else {
                const object = {
                    courseName: courseName,
                    overview: {
                        shortDescription: overview,
                        url: url,
                        description: description
                    }
                }
                const newCourse = new courseModel(object)
                const res = await newCourse.save()
                return { statusCode: statusCode.ok, message: statusText.courseCreated }
            }
        } catch (error) {
            return dbError
        }
    }

    async deleteTopic(body) {
        const { courseName, topicName } = body
        try {
            await courseModel.updateOne({ courseName: courseName }, {
                $unset: {
                    [topicName]: {}
                }
            })
            return { statusCode: statusCode.ok, message: statusText.deleted }
        } catch (error) {
            return dbError
        }
    }

    async deleteCourse(body) {
        const { courseName } = body
        try {
            const data = await courseModel.deleteOne({ courseName: courseName })
            return { statusCode: statusCode.ok, message: statusText.deleted }
        } catch (error) {
            return dbError
        }
    }
}