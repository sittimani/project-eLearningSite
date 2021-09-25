import userModel from '../models/user-model.js'
import { statusCode } from '../constants/status-code.js'
import { statusText } from '../constants/status-text.js'
import authModel from '../models/auth-model.js'

export default class User {

    async saveUser(body) {
        const user = new userModel(body)
        await user.save()
        return { statusCode: statusCode.ok, message: statusText.userCreated }
    }

    async userData(id) {
        const data = await userModel.findOne({ userID: id })
        return { statusCode: statusCode.ok, message: data }
    }

    async updateUserDetails(id, body) {
        await userModel.findOneAndUpdate({ userID: id }, body, { new: true })
        return { statusCode: statusCode.ok, message: statusText.updated }
    }

    async pendingProfessor() {
        const data = await authModel.find({ verified: 'pending' })
        return { statusCode: statusCode.ok, message: data }
    }

    async updatePermission(body) {
        const { id, verified } = body
        await authModel.updateOne({ _id: id }, { $set: { verified: verified } })
        return { statusCode: statusCode.ok, message: statusText.permissionUpdated }
    }
}
