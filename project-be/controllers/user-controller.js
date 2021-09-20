const userService = require('../service/user.service')

module.exports = {
    createUser: async (body) => {
        const res = await userService.createUser(body)
        return res;
    },
    getUserData: async (request, response) => {
        const id = request.params.id;
        const res = await userService.getUserData(id)
        response.status(res.statusCode).json(res.message)
    },
    updateUser: async (request, response) => {
        const id = request.params.id;
        var body = request.body;
        body.userID = id;
        const res = await userService.updateUser(id, body)
        response.status(res.statusCode).json(res.message)
    },
    getPendingProfessor: async (request, response) => {
        const res = await userService.getPendingProfessor();
        response.status(res.statusCode).json(res.message)
    },
    userPermission: async (request, response) => {
        const res = await userService.userPermission(request.body)
        response.status(res.statusCode).json(res.message)
    }
}