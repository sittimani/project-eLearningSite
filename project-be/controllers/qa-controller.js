import {
    createQuestion,
    myQuestions,
    allQuestions,
    saveAnswer,
    dataForEdit
} from "../service/qa.service.js"
import { sendResponse } from "../service/response.js"

export async function uploadQuestion(request, response) {
    const res = await createQuestion(request.body)
    sendResponse(response, res)
}
export async function getMyQuestions(request, response) {
    const id = request.params.id
    const res = await myQuestions(id)
    sendResponse(response, res)
}
export async function getAllQuestions(request, response) {
    const res = await allQuestions()
    sendResponse(response, res)
}
export async function submitAnswer(request, response) {
    const value = request.body;
    const res = await saveAnswer(value)
    sendResponse(response, res)
}
export async function getDataForEdit(request, response) {
    const id = request.params.id;
    const res = await dataForEdit(id)
    sendResponse(response, res)
}
