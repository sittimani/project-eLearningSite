const authModel = require('../models/auth-model')
const getter = require('../service/getters')
const config = require('../service/config')
const authS = require('../service/auth.service')
const authService = new authS()

module.exports = {
    Login: async (request, response) => {
        const res = await authService.login(request.body)
        response.json(res)
    },
    updatePassword: async (request, response) => {
        const res = await authService.updatePassword(request.body)
        response.json(res)
    },
    verifyUser: async (request, response) => {
        const id = request.params.id;
        const res = await authService.verify(id)
        response.end(res)
    },
    forgotPassword: async (request, response) => {
        const res = await authService.forgotPassword(request.body)
        response.json(res)
    }
}