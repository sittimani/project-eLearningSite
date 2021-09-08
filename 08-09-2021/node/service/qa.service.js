const qaModel = require('../models/qa-model')
const config = require('../service/config')


module.exports = {
    uploadQuestion: async (body) => {
        const newQuestion = new qaModel(body)
        const data = await newQuestion.save()
        if (data) {
            return { statusCode: config.statusCode.ok, message: "Question uploaded successfully" }
        }
        return { statusCode: config.statusCode.serverIssue, message: config.message.serverIssue }
    },

    getMyQuestions: async (id) => {
        const data = await qaModel.find({ studentID: id })
        if (data.length !== 0) {
            return { statusCode: config.statusCode.ok, message: config.message.success, data: data }
        } else {
            return { statusCode: config.statusCode.ok, message: config.message.noQuestion }
        }
        return { statusCode: config.statusCode.serverIssue, message: config.message.serverIssue }
    },

    getAllQuestions: async () => {
        const data = await qaModel.find({ isAnswered: false })
        if (data.length !== 0) {
            return { statusCode: config.statusCode.ok, message: config.message.success, data: data }
        } else {
            return { statusCode: config.statusCode.ok, message: config.message.noQuestion }
        }
        return { statusCode: config.statusCode.serverIssue, message: config.message.serverIssue }
    },

    submitQuestion: async (value) => {
        const val = {
            professorID: value.professorID,
            professorName: value.professorName,
            answer: value.answer,
            isAnswered: value.isAnswered
        }
        const data = await qaModel.updateOne({ _id: value.questionID }, val)
        if (data) {
            return { statusCode: config.statusCode.ok, message: config.message.success }
        }
        return { statusCode: config.statusCode.serverIssue, message: config.message.serverIssue }
    },

    getDataForEdit: async (id) => {
        const data = await qaModel.find({ professorID: id })
        if (data.length !== 0) {
            return { statusCode: config.statusCode.ok, message: config.message.success, data: data }
        } else {
            return { statusCode: config.statusCode.notFound, message: config.message.notFound }
        }
        return { statusCode: config.statusCode.serverIssue, message: config.message.serverIssue }
    }
}