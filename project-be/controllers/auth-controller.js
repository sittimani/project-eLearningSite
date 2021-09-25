import AuthService from '../service/auth.service.js'
import { sendResponse } from '../service/response.js'

const authService = new AuthService()

export default class AuthController {

    async userLogin(request, response) {
        const res = await authService.login(request.body)
        sendResponse(response, res)
    }
    async updatePassword(request, response) {
        const res = await authService.updateUserPassword(request.body)
        sendResponse(response, res)
    }
    async verifyUser(request, response) {
        const id = request.params.id
        const res = await authService.verify(id)
        response.end(res)
    }
    async forgotPassword(request, response) {
        const res = await authService.userForgotPassword(request.body)
        sendResponse(response, res)
    }

}
