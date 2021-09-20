import { registerUser } from "../service/register.service.js"
import { sendResponse } from "../service/response.js"

export async function register(request, response) {
    const res = await registerUser(request.body)
    sendResponse(response, res)
}
