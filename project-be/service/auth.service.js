import { getMyRole, createToken, sendMail } from "../service/verification.js"
import { statusCode } from "../constants/status-code.js"
import { statusText } from "../constants/status-text.js"
import authModel from "../models/auth-model.js"
import { menu } from "../constants/menu.js"
import { dbError } from "../service/response.js"

export async function professorLogin(data) {
    if (data.verified === 'approved') {
        const res = await getMyToken(data)
        checkHasToken(res)
    } else if (data.verified === 'denied') {
        return { statusCode: statusCode.unauthorized, message: statusText.denied }
    }
    return { statusCode: statusCode.unauthorized, message: statusText.pending }
}

function checkHasToken(res) {
    if (res) {
        return { statusCode: statusCode.ok, message: res.message }
    }
    return { statusCode: statusCode.serverIssue, message: statusText.serverIssue }
}

export async function getMyToken(data) {
    const role = await getMyRole(data.role)
    let responseData = await createToken(role, data)
    if (role && responseData) {
        responseData = getMenu(role, responseData)
        return { statusCode: statusCode.ok, message: responseData }
    }
    return 0
}

function getMenu(role, responseData) {
    if (role.createCourse)
        responseData.menu = menu.adminMenu
    else if (role.createDocument)
        responseData.menu = menu.professorMenu
    else
        responseData.menu = menu.studentMenu
    return responseData
}

export async function login(dataReceived) {

    const { email, password } = dataReceived;
    try {
        const data = await authModel.findOne({ email: email })
        if (data) {
            if (data.password !== password) {
                return { statusCode: statusCode.unauthorized, message: statusText.misMatch }
            } else {
                let res = await loginUser(data)
                return res;
            }
        } else {
            return { statusCode: statusCode.notFound, message: statusText.noUserFound }
        }
    } catch (err) {
        return dbError
    }
}


export async function loginUser(data) {
    if (data.emailVerified) {
        let res;
        if (data.role === 'professor') {
            res = await professorLogin(data)
        } else {
            res = await getMyToken(data)
        }
        return res
    } else {
        return { statusCode: statusCode.unauthorized, message: statusText.emailNotVerifed }
    }
}

export async function updateUserPassword(dataReceived) {
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
        return dbError
    }
}

export async function userForgotPassword(dataReceived) {
    const { email } = dataReceived;
    const password = Math.floor(Math.random() * 10000000000);
    try {
        const data = await authModel.findOneAndUpdate({ email: email }, { password: password })
        if (data) {
            const res = await sendMail(email, password, "New Password")
            return { statusCode: statusCode.ok, message: statusText.resetPassword }
        } else {
            return { statusCode: statusCode.notFound, message: statusText.notFound }
        }
    } catch (err) {
        return dbError
    }
}


export async function verify(id) {
    try {
        const res = await authModel.findOneAndUpdate({ _id: id }, { emailVerified: true })
        if (res) {
            return "User Verified successfully"
        } else {
            return "Invalid Request"
        }
    } catch (error) {
        return dbError
    }
}

