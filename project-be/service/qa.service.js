import qaModel from '../models/qa-model.js'
import { statusCode } from '../constants/status-code.js'
import { statusText } from '../constants/status-text.js'

export default class QAService {

    async createQuestion(body) {
        const newQuestion = new qaModel(body)
        await newQuestion.save()
        return { statusCode: statusCode.ok, message: statusText.questionCreated }
    }

    async myQuestions(id) {

        const data = await qaModel.find({ studentID: id }, { updatedAt: 0, createdAt: 0 })
        if (data.length !== 0)
            return { statusCode: statusCode.ok, message: data }
        return { statusCode: statusCode.ok, message: [] }
    }

    async allQuestions() {

        const data = await qaModel.find({ isAnswered: false }, { updatedAt: 0, createdAt: 0 })
        if (data.length !== 0)
            return { statusCode: statusCode.ok, message: data }
        return { statusCode: statusCode.ok, message: [] }
    }

    async saveAnswer(value) {
        const val = {
            professorID: value.professorID,
            professorName: value.professorName,
            answer: value.answer,
            isAnswered: value.isAnswered
        }
        await qaModel.updateOne({ _id: value.questionID }, val)
        return { statusCode: statusCode.ok, message: statusText.answerSubmitted }
    }

    async dataForEdit(id) {
        const data = await qaModel.find({ professorID: id }, { updatedAt: 0, createdAt: 0 })
        if (data.length !== 0)
            return { statusCode: statusCode.ok, message: data }
        return { statusCode: statusCode.ok, message: [] }
    }
}
