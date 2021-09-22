import qaModel from '../models/qa-model.js'
import { statusCode } from '../constants/status-code.js'
import { statusText } from '../constants/status-text.js'
import { dbError } from './response.js'

export default class QAService {
    constructor() { }

    async createQuestion(body) {
        try {
            const newQuestion = new qaModel(body)
            const data = await newQuestion.save()
            return { statusCode: statusCode.ok, message: 'Question uploaded successfully' }
        } catch (error) {
            return dbError
        }
    }

    async myQuestions(id) {
        try {
            const data = await qaModel.find({ studentID: id })
            if (data.length !== 0) {
                return { statusCode: statusCode.ok, message: data }
            } else {
                return { statusCode: statusCode.ok, message: [] }
            }
        } catch (error) {
            return dbError
        }
    }

    async allQuestions() {
        try {
            const data = await qaModel.find({ isAnswered: false })
            if (data.length !== 0) {
                return { statusCode: statusCode.ok, message: data }
            } else {
                return { statusCode: statusCode.ok, message: [] }
            }
        } catch (error) {
            return dbError
        }
    }

    async saveAnswer(value) {
        const val = {
            professorID: value.professorID,
            professorName: value.professorName,
            answer: value.answer,
            isAnswered: value.isAnswered
        }
        try {
            await qaModel.updateOne({ _id: value.questionID }, val)
            return { statusCode: statusCode.ok, message: statusText.success }
        } catch (error) {
            return dbError
        }
    }

    async dataForEdit(id) {
        try {
            const data = await qaModel.find({ professorID: id })
            if (data.length !== 0) {
                return { statusCode: statusCode.ok, message: data }
            } else {
                return { statusCode: statusCode.ok, message: [] }
            }
        } catch (error) {
            return dbError
        }
    }
}
