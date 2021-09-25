import Verification from '../service/verification.js'
import { statusCode } from '../constants/status-code.js'
import { statusText } from '../constants/status-text.js'
import authModel from '../models/auth-model.js'

const verficationService = new Verification()

export default class AuthService {

    async login(dataReceived) {
        const { email, password } = dataReceived
        const authService = new AuthService()
        const data = await authModel.findOne({ email: email })
        if (data) {
            if (data.password !== password)
                return { statusCode: statusCode.unauthorized, message: statusText.misMatch }
            return await authService.loginUser(data)
        }
        return { statusCode: statusCode.notFound, message: statusText.noUserFound }
    }

    async loginUser(data) {
        const authService = new AuthService()
        if (data.emailVerified) {
            const res = data.role === 'professor' ?
                await authService.professorLogin(data) : await authService.getMyToken(data)
            return res
        }
        return { statusCode: statusCode.unauthorized, message: statusText.emailNotVerifed }
    }

    async professorLogin(data) {
        const authService = new AuthService()
        if (data.verified === 'approved') {
            const res = await authService.getMyToken(data)
            return authService.checkHasToken(res)
        } else if (data.verified === 'denied')
            return { statusCode: statusCode.unauthorized, message: statusText.denied }
        return { statusCode: statusCode.unauthorized, message: statusText.pending }
    }

    checkHasToken(res) {
        if (res)
            return { statusCode: statusCode.ok, message: res.message }
        return { statusCode: statusCode.serverIssue, message: statusText.serverIssue }
    }

    async getMyToken(data) {
        const role = await verficationService.getMyRole(data.role)
        const responseData = await verficationService.createToken(role, data)
        if (role && responseData)
            return { statusCode: statusCode.ok, message: responseData }
        return 0
    }


    async updateUserPassword(dataReceived) {
        const { id, oldPassword, newPassword } = dataReceived
        const data = await authModel.findOne({ _id: id })
        if (data) {
            if (data.password !== oldPassword)
                return { statusCode: statusCode.unauthorized, message: statusText.misMatch }
            else if (oldPassword === newPassword)
                return { statusCode: statusCode.badRequest, message: statusText.samePassword }
            await authModel.updateOne({ _id: id }, { $set: { password: newPassword } })
            return { statusCode: statusCode.ok, message: statusText.passwordChanged }
        }
        return { statusCode: statusCode.notFound, message: statusText.notFound }
    }

    async userForgotPassword(dataReceived) {
        const { email } = dataReceived
        const password = Math.floor(Math.random() * 10000000000)
        const data = await authModel.findOneAndUpdate({ email: email }, { password: password })
        if (data) {
            await verficationService.sendMail(email, password, 'New Password')
            return { statusCode: statusCode.ok, message: statusText.resetPassword }
        }
        return { statusCode: statusCode.notFound, message: statusText.noUserFound }
    }

    async verify(id) {
        const res = await authModel.findOneAndUpdate({ _id: id }, { emailVerified: true })
        if (res)
            return 'User Verified successfully'
        return 'Invalid Request'
    }
}
