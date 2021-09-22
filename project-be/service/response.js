import { statusCode } from '../constants/status-code.js'
import { statusText } from '../constants/status-text.js'

export function sendResponse(response, data) {
    response.status(data.statusCode).json(data.message)
}

export const dbError = { statusCode: statusCode.unauthorized, message: statusText.dbError }
