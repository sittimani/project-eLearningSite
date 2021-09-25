import UserService from '../service/user.service.js'
import { sendResponse } from '../service/response.js'

const userService = new UserService()

export default class UserController {

    async createUser(body) {
        const res = await userService.saveUser(body)
        return res
    }
    async getUserData(request, response) {
        const id = request.params.id
        const res = await userService.userData(id)
        sendResponse(response, res)
    }
    async updateUser(request, response) {
        const id = request.params.id
        var body = request.body
        body.userID = id
        const res = await userService.updateUserDetails(id, body)
        sendResponse(response, res)
    }
    async getPendingProfessor(request, response) {
        const res = await userService.pendingProfessor()
        sendResponse(response, res)
    }

    async userPermission(request, response) {
        const res = await userService.updatePermission(request.body)
        sendResponse(response, res)
    }
}
