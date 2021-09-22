import User from '../service/user.service.js'
import { sendResponse } from '../service/response.js'

const userService = new User()

export async function createUser(body) {
    const res = await userService.saveUser(body)
    return res;
}
export async function getUserData(request, response) {
    const id = request.params.id;
    const res = await userService.userData(id)
    sendResponse(response, res)
}
export async function updateUser(request, response) {
    const id = request.params.id;
    var body = request.body;
    body.userID = id;
    const res = await userService.updateUserDetails(id, body)
    sendResponse(response, res)
}
export async function getPendingProfessor(request, response) {
    const res = await userService.pendingProfessor();
    sendResponse(response, res)
}

export async function userPermission(request, response) {
    const res = await userService.updatePermission(request.body)
    sendResponse(response, res)
}
