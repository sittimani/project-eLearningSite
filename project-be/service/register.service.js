import authModel from "../models/auth-model.js"
import * as userController from "../controllers/user-controller.js"
import * as verification from "./verification.js"
import { statusCode } from "../constants/status-code.js"
import { statusText } from "../constants/status-text.js"


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

export async function registerUser(body) {
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
            body['userID'] = data._id
            const dataRes = await createUser(email, body)
            return dataRes
        }
    } catch (error) {
        return dbError
    }
}
