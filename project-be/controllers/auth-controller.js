import Auth from '../service/auth.service.js'
import { sendResponse } from '../service/response.js'

const authService = new Auth()

export async function userLogin(request, response) {
    const res = await authService.login(request.body)
    sendResponse(response, res)
}
export async function updatePassword(request, response) {
    const res = await authService.updateUserPassword(request.body)
    sendResponse(response, res)
}
export async function verifyUser(request, response) {
    const id = request.params.id;
    const res = await authService.verify(id)
    response.end(res)
}
export async function forgotPassword(request, response) {
    const res = await authService.userForgotPassword(request.body)
    sendResponse(response, res)
}
