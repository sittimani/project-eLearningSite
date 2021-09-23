import jwt from 'jsonwebtoken'
import { statusText } from '../constants/status-text.js'
import * as dotenv from 'dotenv'
import { statusCode } from '../constants/status-code.js'
import { sendResponse } from '../service/response.js'

dotenv.config()
const data = { statusCode: statusCode.unauthorized, message: statusText.invalidToken }

export default class Token {

    verifyToken(request, response, next) {
        if (!request.headers.authorization) {
            return sendResponse(response, data)
        }
        const token = new Token()
        token.verifyUserToken(request, response, next)
    }

    verifyUserToken(request, response, next) {
        const token = request.headers.authorization.split(' ')[1]
        if (token === 'null') {
            return sendResponse(response, data)
        } else {
            jwt.verify(token, process.env.PRIVATE_KEY, (error, payload) => {
                if (error)
                    return sendResponse(response, data)
                request.user = payload
                next()
            })
        }
    }

    isProfessor(request, response, next) {
        const role = request.user.users.role
        role.createDocument && role.updateDocument ? next() : sendResponse(response, data)
    }
    isAdmin(request, response, next) {
        const role = request.user.users.role
        role.createDocument && role.deleteCourse ? next() : sendResponse(response, data)
    }
}
