const userModel = require('../models/user-model')
const statusCode = require('../constants/status-code').statusCode
const statusText = require('../constants/status-text').message
const authModel = require('../models/auth-model')

module.exports = {
    createUser: async(body) => {
        const user = new userModel(body)
        try {
            const data = await user.save()
            return { statusCode: statusCode.ok, message: statusText.userCreated }
        } catch (error) {
            return { statusCode: statusCode.unauthorized, message: statusText.dbError }
        }
    },

    getUserData: async(id) => {
        try {
            const data = await userModel.findOne({ userID: id })
            return { statusCode: statusCode.ok, message: data }
        } catch (error) {
            return { statusCode: statusCode.unauthorized, message: statusText.dbError }
        }
    },

    updateUser: async(id, body) => {
        try {
            const data = await userModel.findOneAndUpdate({ userID: id }, body, { new: true })
            return { statusCode: statusCode.ok, message: statusText.updated }
        } catch (error) {
            return { statusCode: statusCode.unauthorized, message: statusText.dbError }
        }
    },

    getPendingProfessor: async() => {
        try {
            const data = await authModel.find({ verified: 'pending' })
            return { statusCode: statusCode.ok, message: data }
        } catch (error) {
            return { statusCode: statusCode.unauthorized, message: statusText.dbError }
        }
    },

    userPermission: async(body) => {
        const { id, verified } = body
        try {
            const data = await authModel.updateOne({ _id: id }, { $set: { verified: verified } })
            return { statusCode: statusCode.ok, message: "successfully Permission Updated" }
        } catch (error) {
            return { statusCode: statusCode.unauthorized, message: statusText.dbError }
        }
    }
}