const statusCode = require('../constants/status-code').statusCode
const statusText = require('../constants/status-text').message
const authModel = require('../models/auth-model')
const userController = require('../controllers/user-controller')
const verification = require('./verification')

async function createUser(email, body) {
    const responseData = await userController.createUser(body)
    if (responseData) {
        const temp = await verification.sendMail(email, body.userID, "Verification Mail")
        if (temp) {
            return (responseData)
        }
    }
    await authModel.deleteOne({ _id: body.userID })
    return { statusCode: statusCode.serverIssue, message: "Error in User Creation, Try after sometime!!!" }
}

module.exports = {
    register: async (body) => {
        const { email } = body
        try {
            const res = await authModel.findOne({ email: email })
            if (res !== null) {
                return { statusCode: statusCode.alreadyExists, message: statusText.userExists }
            } else {
                if (body.role === "professor") {
                    body['verified'] = 'pending'
                }
                body['emailVerified'] = false;
                const Auth = new authModel(body)
                const data = await Auth.save()
                if (data) {
                    body['userID'] = data._id
                } else {
                    return { statusCode: statusCode.serverIssue, message: statusText.serverIssue }
                }
                const dataRes = await createUser(email, body)
                return dataRes
            }
        } catch (error) {
            return { statusCode: statusCode.unauthorized, message: statusText.dbError }
        }
    }
}