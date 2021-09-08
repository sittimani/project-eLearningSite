const registerService = require('../service/register.service')

module.exports = {
    register: async (request, response) => {
        const res = await registerService.register(request.body)
        response.json(res)
    }
}