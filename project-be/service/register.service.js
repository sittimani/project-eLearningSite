import authModel from '../models/auth-model.js'
import UserController from '../controllers/user-controller.js'
import Verification from './verification.js'
import { statusCode } from '../constants/status-code.js'
import { statusText } from '../constants/status-text.js'

const userController = new UserController()
const verification = new Verification()

export default class Register {

    async createUser(email, body) {
        const responseData = await userController.createUser(body)
        if (responseData) {
            await verification.sendMail(email, body.userID, 'Verification Mail')
            return (responseData)
        }
        await authModel.deleteOne({ _id: body.userID })
        return { statusCode: statusCode.serverIssue, message: statusText.serverIssue }
    }

    async registerUser(body) {
        const register = new Register()
        const { email } = body
        const res = await authModel.findOne({ email: email })
        if (res !== null)
            return { statusCode: statusCode.alreadyExists, message: statusText.userExists }
        if (body.role === 'professor')
            body['verified'] = 'pending'
        body['emailVerified'] = false
        const Auth = new authModel(body)
        const data = await Auth.save()
        body['userID'] = data._id
        return await register.createUser(email, body)
    }
}
