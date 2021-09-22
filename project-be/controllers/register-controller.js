import Register from '../service/register.service.js'
import { sendResponse } from '../service/response.js'

const registerService = new Register()

export async function register(request, response) {
    const res = await registerService.registerUser(request.body)
    sendResponse(response, res)
}
