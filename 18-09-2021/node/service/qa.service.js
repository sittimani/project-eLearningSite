const qaModel = require('../models/qa-model')
const statusCode = require('../constants/status-code').statusCode
const statusText = require('../constants/status-text').message


module.exports = {
    uploadQuestion: async(body) => {
        try {
            const newQuestion = new qaModel(body)
            const data = await newQuestion.save()
            return { statusCode: statusCode.ok, message: "Question uploaded successfully" }
        } catch (error) {
            return { statusCode: statusCode.unauthorized, message: statusText.dbError }
        }
    },

    getMyQuestions: async(id) => {
        try {
            const data = await qaModel.find({ studentID: id })
            if (data.length !== 0) {
                return { statusCode: statusCode.ok, message: data }
            } else {
                return { statusCode: statusCode.ok, message: [] }
            }
        } catch (error) {
            return { statusCode: statusCode.unauthorized, message: statusText.dbError }
        }
    },

    getAllQuestions: async() => {
        try {
            const data = await qaModel.find({ isAnswered: false })
            if (data.length !== 0) {
                return { statusCode: statusCode.ok, message: data }
            } else {
                return { statusCode: statusCode.ok, message: [] }
            }
        } catch (error) {
            return { statusCode: statusCode.unauthorized, message: statusText.dbError }
        }
    },

    submitQuestion: async(value) => {
        const val = {
            professorID: value.professorID,
            professorName: value.professorName,
            answer: value.answer,
            isAnswered: value.isAnswered
        }
        try {
            const data = await qaModel.updateOne({ _id: value.questionID }, val)
            return { statusCode: statusCode.ok, message: statusText.success }
        } catch (error) {
            return { statusCode: statusCode.unauthorized, message: statusText.dbError }
        }
    },
    getDataForEdit: async(id) => {
        try {
            const data = await qaModel.find({ professorID: id })
            if (data.length !== 0) {
                return { statusCode: statusCode.ok, message: data }
            } else {
                return { statusCode: statusCode.ok, message: [] }
            }
        } catch (error) {
            return { statusCode: statusCode.unauthorized, message: statusText.dbError }
        }
    }
}