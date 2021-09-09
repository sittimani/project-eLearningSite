const getter = require('../service/getters')
const config = require('../service/config')
const authModel = require('../models/auth-model')

module.exports = class Auth {

    constructor() {
    }

    async professorLogin(data) {
        const temp = new Auth()
        if (data.verified === 'approved') {
            const res = await temp.getMyToken(data)
            if (res) {
                return res
            }
        } else if (data.verified === 'denied') {
            return { statusCode: config.statusCode.unauthorized, message: config.message.denied }
        } else {
            return { statusCode: config.statusCode.unauthorized, message: config.message.pending }
        }
    }

    async getMyToken(data) {
        const role = await getter.getMyRole(data.role)
        const responseData = await getter.createToken(role, data)
        if (role && responseData) {
            return responseData
        }
        return 0
    }

    async login(dataReceived) {
        const authService = new Auth()
        const { email, password } = dataReceived;
        const data = await authModel.findOne({ email: email })
        if (data) {
            if (data.password !== password) {
                return { statusCode: config.statusCode.unauthorized, message: config.message.misMatch }
            } else {
                if (data.emailVerified) {
                    var res;
                    if (data.role === 'professor') {
                        res = await authService.professorLogin(data)
                    } else {
                        res = await authService.getMyToken(data)
                    }
                    return { statusCode: config.statusCode.ok, message: res }
                } else {
                    return { statusCode: config.statusCode.unauthorized, message: config.message.emailNotVerifed }
                }
            }
        } else {
            return { statusCode: config.statusCode.notFound, message: config.message.noUserFound }
        }
    }

    async updatePassword(dataReceived) {
        const { id, oldPassword, newPassword } = dataReceived;
        const data = await authModel.findOne({ _id: id })
        if (data) {
            if (data.password !== oldPassword) {
                return { statusCode: config.statusCode.unauthorized, message: config.message.misMatch }
            } else if (oldPassword === newPassword) {
                return { statusCode: config.statusCode.badRequest, message: config.message.samePassword }
            } else {
                const res = await authModel.updateOne({ _id: id }, { $set: { password: newPassword } });
                return { statusCode: config.statusCode.ok, message: config.message.passwordChanged }
            }
        } else {
            return { statusCode: config.statusCode.notFound, message: config.message.notFound }
        }
    }

    async forgotPassword(dataReceived) {
        const { email } = dataReceived;
        const password = Math.floor(Math.random() * 10000000000);
        const data = await authModel.findOneAndUpdate({ email: email }, { password: password })
        if (data) {
            const res = await getter.sendMail(email, password, "New Password")
            if (res) {
                return { statusCode: config.statusCode.ok, message: config.message.resetPassword }
            } else {
                return { statusCode: config.statusCode.serverIssue, message: config.message.serverIssue }
            }
        } else {
            return { statusCode: config.statusCode.notFound, message: config.message.notFound }
        }
    }

    async verify(id) {
        const res = await authModel.findOneAndUpdate({ _id: id }, { emailVerified: true })
        if (res) {
            return "User Verified successfully"
        } else {
            return "Invalid Request"
        }
    }
}

