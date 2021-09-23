import RegisterService from '../service/register.service.js'
import { sendResponse } from '../service/response.js'

const registerService = new RegisterService()

export default class RegisterController {

    async register(request, response) {
        const res = await registerService.registerUser(request.body)
        sendResponse(response, res)
    }
}

