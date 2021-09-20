const getter = require('../service/verification')
const statusCode = require('../constants/status-code').statusCode
const statusText = require('../constants/status-text').message
const authModel = require('../models/auth-model')

module.exports = class Auth {

    constructor() {}

    async professorLogin(data) {
        const temp = new Auth()
        if (data.verified === 'approved') {
            const res = await temp.getMyToken(data)
            if (res) {
                return { statusCode: statusCode.ok, message: res.message }
            }
        } else if (data.verified === 'denied') {
            return { statusCode: statusCode.unauthorized, message: statusText.denied }
        } else {
            return { statusCode: statusCode.unauthorized, message: statusText.pending }
        }
    }

    async getMyToken(data) {
        const role = await getter.getMyRole(data.role)
        const responseData = await getter.createToken(role, data)
        if (role && responseData) {
            return { statusCode: statusCode.ok, message: responseData }
        }
        return 0
    }

    async login(dataReceived) {
        const authService = new Auth()
        const { email, password } = dataReceived;
        try {
            const data = await authModel.findOne({ email: email })
            if (data) {
                if (data.password !== password) {
                    return { statusCode: statusCode.unauthorized, message: statusText.misMatch }
                } else {
                    const res = await authService.loginUser(data)
                    return res;
                }
            } else {
                return { statusCode: statusCode.notFound, message: statusText.noUserFound }
            }
        } catch (err) {
            return { statusCode: statusCode.serverIssue, message: statusText.dbError }
        }
    }


    async loginUser(data) {
        const authService = new Auth()
        if (data.emailVerified) {
            let res;
            if (data.role === 'professor') {
                res = await authService.professorLogin(data)
            } else {
                res = await authService.getMyToken(data)
            }
            return res
        } else {
            return { statusCode: statusCode.unauthorized, message: statusText.emailNotVerifed }
        }
    }

    async updatePassword(dataReceived) {
        const { id, oldPassword, newPassword } = dataReceived;
        try {
            const data = await authModel.findOne({ _id: id })
            if (data) {
                if (data.password !== oldPassword) {
                    return { statusCode: statusCode.unauthorized, message: statusText.misMatch }
                } else if (oldPassword === newPassword) {
                    return { statusCode: statusCode.badRequest, message: statusText.samePassword }
                } else {
                    const res = await authModel.updateOne({ _id: id }, { $set: { password: newPassword } });
                    return { statusCode: statusCode.ok, message: statusText.passwordChanged }
                }
            } else {
                return { statusCode: statusCode.notFound, message: statusText.notFound }
            }
        } catch (error) {
            return { statusCode: statusCode.serverIssue, message: statusText.dbError }
        }
    }

    async forgotPassword(dataReceived) {
        const { email } = dataReceived;
        const password = Math.floor(Math.random() * 10000000000);
        try {
            const data = await authModel.findOneAndUpdate({ email: email }, { password: password })
            if (data) {
                const res = await getter.sendMail(email, password, "New Password")
                return { statusCode: statusCode.ok, message: statusText.resetPassword }
            } else {
                return { statusCode: statusCode.notFound, message: statusText.notFound }
            }
        } catch (err) {
            return { statusCode: statusCode.serverIssue, message: statusText.dbError }
        }
    }


    async verify(id) {
        try {
            const res = await authModel.findOneAndUpdate({ _id: id }, { emailVerified: true })
            if (res) {
                return "User Verified successfully"
            } else {
                return "Invalid Request"
            }
        } catch (error) {
            return { statusCode: statusCode.unauthorized, message: statusText.dbError }
        }
    }

}