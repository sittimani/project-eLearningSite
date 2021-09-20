import {
    saveUser,
    userData,
    updateUserDetails,
    pendingProfessor,
    updatePermission
} from "../service/user.service.js"
import { sendResponse } from "../service/response.js"


export async function createUser(body) {
    const res = await saveUser(body)
    return res;
}
export async function getUserData(request, response) {
    const id = request.params.id;
    const res = await userData(id)
    sendResponse(response, res)
}
export async function updateUser(request, response) {
    const id = request.params.id;
    var body = request.body;
    body.userID = id;
    const res = await updateUserDetails(id, body)
    sendResponse(response, res)
}
export async function getPendingProfessor(request, response) {
    const res = await pendingProfessor();
    sendResponse(response, res)
}

export async function userPermission(request, response) {
    const res = await updatePermission(request.body)
    sendResponse(response, res)
}
