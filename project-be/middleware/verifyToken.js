import jwt from "jsonwebtoken"
import { statusText } from "../constants/status-text.js"
import * as dotenv from "dotenv"

dotenv.config()

export function verifyToken(request, response, next) {
    if (!request.headers.authorization) {
        return response.status(401).json(statusText.invalidToken)
    } else {
        let token = request.headers.authorization.split(' ')[1];
        if (token === 'null') {
            return response.status(401).json(statusText.invalidToken)
        } else {
            jwt.verify(token, process.env.PRIVATE_KEY, (error, payload) => {
                if (error) {
                    return response.status(401).json(statusText.invalidToken)
                } else {
                    request.user = payload
                    next()
                }
            })
        }
    }
}
export function isProfessor(request, response, next) {
    const role = request.user.users.role
    role.createDocument && role.updateDocument ? next() : response.status(401).json(statusText.invalidToken)
}
export function isAdmin(request, response, next) {
    const role = request.user.users.role
    role.createDocument && role.deleteCourse ? next() : response.status(401).json(statusText.invalidToken)
}
