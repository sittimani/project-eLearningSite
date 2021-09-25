import courseModel from '../models/course-model.js'
import { statusCode } from '../constants/status-code.js'
import { statusText } from '../constants/status-text.js'

export default class Course {

    async allCourse() {
        const data = await courseModel.find({}, { updatedAt: 0, createdAt: 0 })
        if (data)
            return { statusCode: statusCode.ok, message: data }
        return { statusCode: statusCode.ok, message: [] }
    }

    async allTopics(name) {
        const data = await courseModel.find({ courseName: name }, { updatedAt: 0, createdAt: 0 })
        return { statusCode: statusCode.ok, message: data }
    }

    async updateTopic(body) {
        const courseName = body.courseName
        const topicName = body.topicName
        const value = {
            documentLink: body.documentLink,
            tutorialLink: body.tutorialLink,
            teacherID: body.teacherID
        }
        await courseModel.updateOne({ courseName: courseName }, {
            $set: { [topicName]: value }
        })
        return { statusCode: statusCode.ok, message: statusText.updated }
    }

    async createCourse(body, overview) {
        const { courseName, url, description } = body
        const data = await courseModel.findOne({ courseName: courseName })
        if (data !== null) {
            return { statusCode: statusCode.alreadyExists, message: statusText.alreadyExists }
        }
        const object = {
            courseName: courseName,
            overview: {
                shortDescription: overview,
                url: url,
                description: description
            }
        }
        const newCourse = new courseModel(object)
        await newCourse.save()
        return { statusCode: statusCode.ok, message: statusText.courseCreated }
    }

    async deleteTopic(body) {
        const { courseName, topicName } = body
        await courseModel.updateOne({ courseName: courseName }, {
            $unset: {
                [topicName]: {}
            }
        })
        return { statusCode: statusCode.ok, message: statusText.deleted }
    }

    async deleteCourse(body) {
        const { courseName } = body
        await courseModel.deleteOne({ courseName: courseName })
        return { statusCode: statusCode.ok, message: statusText.deleted }
    }
}