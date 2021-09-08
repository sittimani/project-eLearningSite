const courseModel = require('../models/course-model')
const config = require('../service/config')

module.exports = {
    getAllCourse: async () => {
        const data = await courseModel.find({})
        if (data) {
            return { statusCode: config.statusCode.ok, message: config.message.success, data: data }
        }
        return { statusCode: config.statusCode.serverIssue, message: config.message.serverIssue }
    },

    getAllTopics: async (name) => {
        const data = await courseModel.find({ courseName: name })
        if (data) {
            return { statusCode: config.statusCode.ok, message: config.message.success, data: data }
        }
        return { statusCode: config.statusCode.serverIssue, message: config.message.serverIssue }
    },

    updateTopic: async (body) => {
        const courseName = body.courseName;
        const topicName = body.topicName;
        const value = {
            documentLink: body.documentLink,
            toturialLink: body.toturialLink,
            teacherID: body.teacherID
        }
        const data = await courseModel.updateOne({ courseName: courseName }, { $set: { [topicName]: value } })
        if (data) {
            return { statusCode: config.statusCode.ok, message: config.message.updated, data: data }
        }
        return { statusCode: config.statusCode.serverIssue, message: config.message.serverIssue }
    },

    getParticularTopic: async (courseName) => {
        const data = await courseModel.findOne({ courseName: courseName })
        if (data) {
            return { statusCode: config.statusCode.ok, message: config.message.success, data: data }
        }
        return { statusCode: config.statusCode.serverIssue, message: config.message.serverIssue }
    },

    uploadCourse: async (body, overview) => {
        const { courseName, url, description } = body
        const data = await courseModel.findOne({ courseName: courseName })
        if (data !== null) {
            return { statusCode: config.statusCode.alreadyExists, message: config.message.alreadyExists }
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
            if (res) {
                return { statusCode: config.statusCode.ok, message: config.message.success }
            }
        }
        return { statusCode: config.statusCode.serverIssue, message: config.message.serverIssue }
    },

    deleteTopic: async (body) => {
        const { courseName, topicName } = body
        const data = await courseModel.updateOne({ courseName: courseName }, { $unset: { [topicName]: {} } })
        if (data) {
            return { statusCode: config.statusCode.ok, message: config.message.success }
        }
        return { statusCode: config.statusCode.serverIssue, message: config.message.serverIssue }
    },

    deleteCourse: async (body) => {
        const { courseName } = body
        const data = await courseModel.deleteOne({ courseName: courseName })
        if (data) {
            return { statusCode: config.statusCode.ok, message: config.message.success }
        }
        return { statusCode: config.statusCode.serverIssue, message: config.message.serverIssue }
    }
}