import userModel from "../models/user-model.js"
import { statusCode } from "../constants/status-code.js"
import { statusText } from "../constants/status-text.js"
import authModel from "../models/auth-model.js"

export async function saveUser(body) {
    const user = new userModel(body)
    try {
        await user.save()
        return { statusCode: statusCode.ok, message: statusText.userCreated }
    } catch (error) {
        return dbError
    }
}
export async function userData(id) {
    try {
        const data = await userModel.findOne({ userID: id })
        return { statusCode: statusCode.ok, message: data }
    } catch (error) {
        return dbError
    }
}

export async function updateUserDetails(id, body) {
    try {
        await userModel.findOneAndUpdate({ userID: id }, body, { new: true })
        return { statusCode: statusCode.ok, message: statusText.updated }
    } catch (error) {
        return dbError
    }
}

export async function pendingProfessor() {
    try {
        const data = await authModel.find({ verified: 'pending' })
        return { statusCode: statusCode.ok, message: data }
    } catch (error) {
        return dbError
    }
}

export async function updatePermission(body) {
    const { id, verified } = body
    try {
        await authModel.updateOne({ _id: id }, { $set: { verified: verified } })
        return { statusCode: statusCode.ok, message: "successfully Permission Updated" }
    } catch (error) {
        return dbError
    }
}
