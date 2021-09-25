import { statusCode } from '../constants/status-code.js'
import { statusText } from '../constants/status-text.js'

export function sendResponse(response, data) {
    response.status(data.statusCode).json(data.message)
}

const dbError = { statusCode: statusCode.serverIssue, message: statusText.dbError }

export const use = errorCatcher => (request, response) => {
    Promise.resolve(errorCatcher(request, response))
        .catch(
            (error) => {
                console.log(error)
                sendResponse(response, dbError)
            }
        )
}