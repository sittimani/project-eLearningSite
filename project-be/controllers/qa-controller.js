import Qa from '../service/qa.service.js'
import { sendResponse } from '../service/response.js'

const qaService = new Qa()

export async function uploadQuestion(request, response) {
    const res = await qaService.createQuestion(request.body)
    sendResponse(response, res)
}
export async function getMyQuestions(request, response) {
    const id = request.params.id
    const res = await qaService.myQuestions(id)
    sendResponse(response, res)
}
export async function getAllQuestions(request, response) {
    const res = await qaService.allQuestions()
    sendResponse(response, res)
}
export async function submitAnswer(request, response) {
    const value = request.body;
    const res = await qaService.saveAnswer(value)
    sendResponse(response, res)
}
export async function getDataForEdit(request, response) {
    const id = request.params.id;
    const res = await qaService.dataForEdit(id)
    sendResponse(response, res)
}
