import {
    login,
    updateUserPassword,
    userForgotPassword,
    verify
} from "../service/auth.service.js"
import { sendResponse } from "../service/response.js"

export async function userLogin(request, response) {
    const res = await login(request.body)
    sendResponse(response, res)
}
export async function updatePassword(request, response) {
    const res = await updateUserPassword(request.body)
    sendResponse(response, res)
}
export async function verifyUser(request, response) {
    const id = request.params.id;
    const res = await verify(id)
    response.end(res)
}
export async function forgotPassword(request, response) {
    const res = await userForgotPassword(request.body)
    sendResponse(response, res)
}
