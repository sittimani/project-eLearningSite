const courseModel = require('../models/course-model')
const config = require('../service/config')

module.exports = {
    getAllCourse: async () => {
        try {
            const data = await courseModel.find({})
            if (data) {
                return { statusCode: config.statusCode.ok, message: data }
            }
            return { statusCode: config.statusCode.serverIssue, message: config.message.serverIssue }
        } catch (error) {
            return config.dbError
        }
    },

    getAllTopics: async (name) => {
        try {
            const data = await courseModel.find({ courseName: name })
            if (data) {
                return { statusCode: config.statusCode.ok, message: data }
            }
            return { statusCode: config.statusCode.serverIssue, message: config.message.serverIssue }
        } catch (error) {
            return config.dbError
        }
    },

    updateTopic: async (body) => {
        const courseName = body.courseName;
        const topicName = body.topicName;
        const value = {
            documentLink: body.documentLink,
            toturialLink: body.toturialLink,
            teacherID: body.teacherID
        }
        try {
            const data = await courseModel.updateOne({ courseName: courseName }, { $set: { [topicName]: value } })
            if (data) {
                return { statusCode: config.statusCode.ok, message: config.message.updated }
            }
            return { statusCode: config.statusCode.serverIssue, message: config.message.serverIssue }
        } catch (error) {
            return config.dbError
        }
    },

    getParticularTopic: async (courseName) => {
        try {
            const data = await courseModel.findOne({ courseName: courseName })
            if (data) {
                return { statusCode: config.statusCode.ok, message: data }
            }
            return { statusCode: config.statusCode.serverIssue, message: config.message.serverIssue }
        } catch (error) {
            return config.dbError
        }
    },

    uploadCourse: async (body, overview) => {
        const { courseName, url, description } = body
        try {
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
                    return { statusCode: config.statusCode.ok, message: config.message.courseCreated }
                }
            }
            return { statusCode: config.statusCode.serverIssue, message: config.message.serverIssue }
        } catch (error) {
            return config.dbError
        }
    },

    deleteTopic: async (body) => {
        const { courseName, topicName } = body
        try {
            const data = await courseModel.updateOne({ courseName: courseName }, { $unset: { [topicName]: {} } })
            if (data) {
                return { statusCode: config.statusCode.ok, message: config.message.deleted }
            }
            return { statusCode: config.statusCode.serverIssue, message: config.message.serverIssue }
        } catch (error) {
            return config.dbError
        }
    },

    deleteCourse: async (body) => {
        const { courseName } = body
        try {
            const data = await courseModel.deleteOne({ courseName: courseName })
            if (data) {
                return { statusCode: config.statusCode.ok, message: config.message.deleted }
            }
            return { statusCode: config.statusCode.serverIssue, message: config.message.serverIssue }
        } catch (error) {
            return config.dbError
        }
    }
}