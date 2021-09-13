const authModel = require('../models/auth-model')
const authS = require('../service/auth.service')
const authService = new authS()

module.exports = {
    login: async (request, response) => {
        const res = await authService.login(request.body)
        response.status(res.statusCode).send({ data: res.message })
        
    },
    updatePassword: async (request, response) => {
        const res = await authService.updatePassword(request.body)
        response.status(res.statusCode).send({ data: res.message })
    },
    verifyUser: async (request, response) => {
        const id = request.params.id;
        const res = await authService.verify(id)
        response.end(res)
    },
    forgotPassword: async (request, response) => {
        const res = await authService.forgotPassword(request.body)
        response.status(res.statusCode).send({ data: res.message })
        
    }
}