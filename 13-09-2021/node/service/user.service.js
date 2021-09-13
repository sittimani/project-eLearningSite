const userModel = require('../models/user-model')
const config = require('../service/config')
const authModel = require('../models/auth-model')

module.exports = {
    createUser: async (body) => {
        const user = new userModel(body)
        try {
            const data = await user.save()
            if (data) {
                return { statusCode: config.statusCode.ok, message: config.message.success }
            } else {
                return { statusCode: config.statusCode.serverIssue, message: config.message.serverIssue }
            }
        } catch (error) {
            return config.dbError
        }
    },

    getUserData: async (id) => {
        try {
            const data = await userModel.findOne({ userID: id })
            return { statusCode: config.statusCode.ok, message: data }
        } catch (error) {
            return config.dbError
        }
    },

    updateUser: async (id, body) => {
        try {
            const data = await userModel.findOneAndUpdate({ userID: id }, body, { new: true })
            if (data) {
                return { statusCode: config.statusCode.ok, message: config.message.updated }
            }
            return { statusCode: config.statusCode.serverIssue, message: config.message.serverIssue }
        } catch (error) {
            return config.dbError
        }
    },

    getPendingProfessor: async () => {
        try {
            const data = await authModel.find({ verified: 'pending' })
            if (data) {
                return { statusCode: config.statusCode.ok, message: data }
            }
            return { statusCode: config.statusCode.ok, message: config.message.serverIssue }
        } catch (error) {
            return config.dbError
        }
    },

    userPermission: async (body) => {
        const { id, verified } = body
        try {
            const data = await authModel.updateOne({ _id: id }, { $set: { verified: verified } })
            if (data) {
                return { statusCode: config.statusCode.ok, message: "successfully Permission Updated" }
            }
            return { success: false, statusCode: config.statusCode.serverIssue, message: config.message.serverIssue }
        } catch (error) {
            return config.dbError
        }
    }
}