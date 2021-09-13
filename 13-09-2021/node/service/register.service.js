const config = require('../service/config')
const authModel = require('../models/auth-model')
const userController = require('../controllers/user-controller')
const getter = require('./verification')

async function createUser(email, body) {
    const responseData = await userController.createUser(body)
    if (responseData) {
        const temp = await getter.sendMail(email, body.userID, "Verification Mail")
        if (temp) {
            return (responseData)
        }
    }
    await authModel.deleteOne({ _id: body.userID })
    return { statusCode: config.statusCode.serverIssue, message: "Error in User Creation, Try after sometime!!!" }
}

module.exports = {
    register: async (body) => {
        const { email } = body
        try {
            const res = await authModel.findOne({ email: email })
            if (res !== null) {
                return { statusCode: config.statusCode.alreadyExists, message: config.message.alreadyExists }
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
                    return { statusCode: config.statusCode.serverIssue, message: config.message.serverIssue }
                }
                const dataRes = await createUser(email, body)
                return dataRes
            }
        } catch (error) {
            return config.dbError
        }
    }
}