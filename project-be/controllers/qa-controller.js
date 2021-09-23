import QaService from '../service/qa.service.js'
import { sendResponse } from '../service/response.js'

const qaService = new QaService()

export default class QaController {

    async uploadQuestion(request, response) {
        const res = await qaService.createQuestion(request.body)
        sendResponse(response, res)
    }
    async getMyQuestions(request, response) {
        const id = request.params.id
        const res = await qaService.myQuestions(id)
        sendResponse(response, res)
    }
    async getAllQuestions(request, response) {
        const res = await qaService.allQuestions()
        sendResponse(response, res)
    }
    async submitAnswer(request, response) {
        const value = request.body
        const res = await qaService.saveAnswer(value)
        sendResponse(response, res)
    }
    async getDataForEdit(request, response) {
        const id = request.params.id
        const res = await qaService.dataForEdit(id)
        sendResponse(response, res)
    }
}
