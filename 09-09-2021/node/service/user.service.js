const userModel = require('../models/user-model')
const config = require('../service/config')
const authModel = require('../models/auth-model')

module.exports = {
    createUser: async (body) => {
        const user = new userModel(body)
        const data = await user.save()
        if (data) {
            return { statusCode: config.statusCode.ok, message: config.message.success }
        } else {
            return { statusCode: config.statusCode.serverIssue, message: config.message.serverIssue }
        }
    },

    getUserData: async (id) => {
        const data = await userModel.findOne({ userID: id })
        console.log(data)
        return { statusCode: config.statusCode.ok, message: data }
    },

    updateUser: async (id, body) => {
        const data = await userModel.findOneAndUpdate({ userID: id }, body, { new: true })
        if (data) {
            return { statusCode: config.statusCode.ok, message: config.message.updated }
        }
        return { statusCode: config.statusCode.serverIssue, message: config.message.serverIssue }
    },

    getPendingProfessor: async () => {
        const data = await authModel.find({ verified: 'pending' })
        if (data) {
            return { statusCode: config.statusCode.ok, message: data }
        }
        return { statusCode: config.statusCode.ok, message: config.message.serverIssue }
    },

    userPermission: async (body) => {
        const { id, verified } = body
        const data = await authModel.updateOne({ _id: id }, { $set: { verified: verified } })
        if (data) {
            return { statusCode: config.statusCode.ok, message: "successfully Permission Updated" }
        }
        return { success: false, statusCode: config.statusCode.serverIssue, message: config.message.serverIssue }
    }
}