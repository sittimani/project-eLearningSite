const courseModel = require('../models/course-model')
const statusCode = require('../constants/status-code').statusCode
const statusText = require('../constants/status-text').message

module.exports = {
    getAllCourse: async() => {
        try {
            const data = await courseModel.find({})
            if (data) {
                return { statusCode: statusCode.ok, message: data }
            } else {
                return { statusCode: statusCode.ok, message: [] }
            }
        } catch (error) {
            return { statusCode: statusCode.serverIssue, message: statusText.dbError }
        }
    },

    getAllTopics: async(name) => {
        try {
            const data = await courseModel.find({ courseName: name })
            return { statusCode: statusCode.ok, message: data }
        } catch (error) {
            return { statusCode: statusCode.serverIssue, message: statusText.dbError }
        }
    },

    updateTopic: async(body) => {
        const courseName = body.courseName;
        const topicName = body.topicName;
        const value = {
            documentLink: body.documentLink,
            tutorialLink: body.tutorialLink,
            teacherID: body.teacherID
        }
        try {
            const data = await courseModel.updateOne({ courseName: courseName }, {
                $set: {
                    [topicName]: value
                }
            })
            return { statusCode: statusCode.ok, message: statusText.updated }
        } catch (error) {
            return { statusCode: statusCode.serverIssue, message: statusText.dbError }
        }
    },

    getParticularTopic: async(courseName) => {
        try {
            const data = await courseModel.findOne({ courseName: courseName })
            return { statusCode: statusCode.ok, message: data }
        } catch (error) {
            return { statusCode: statusCode.serverIssue, message: statusText.dbError }
        }
    },

    uploadCourse: async(body, overview) => {
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
            return { statusCode: statusCode.serverIssue, message: statusText.dbError }
        }
    },

    deleteTopic: async(body) => {
        const { courseName, topicName } = body
        try {
            const data = await courseModel.updateOne({ courseName: courseName }, {
                $unset: {
                    [topicName]: {}
                }
            })
            return { statusCode: statusCode.ok, message: statusText.deleted }
        } catch (error) {
            return { statusCode: statusCode.serverIssue, message: statusText.dbError }
        }
    },

    deleteCourse: async(body) => {
        const { courseName } = body
        try {
            const data = await courseModel.deleteOne({ courseName: courseName })
            return { statusCode: statusCode.ok, message: statusText.deleted }
        } catch (error) {
            return { statusCode: statusCode.serverIssue, message: statusText.dbError }
        }
    }
}