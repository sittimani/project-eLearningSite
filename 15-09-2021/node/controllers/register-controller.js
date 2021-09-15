const registerService = require('../service/register.service')

module.exports = {
    register: async (request, response) => {
        const res = await registerService.register(request.body)
        response.status(res.statusCode).send({data: res.message})
    }
}