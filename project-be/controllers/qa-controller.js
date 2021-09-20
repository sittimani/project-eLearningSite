const qaService = require('../service/qa.service')

module.exports = {
    uploadQuestion: async (request, response) => {
        const res = await qaService.uploadQuestion(request.body)
        response.status(res.statusCode).json(res.message)
    },
    getMyQuestions: async (request, response) => {
        const id = request.params.id
        const res = await qaService.getMyQuestions(id)
        response.status(res.statusCode).json(res.message)
    },
    getAllQuestions: async (request, response) => {
        const res = await qaService.getAllQuestions()
        response.status(res.statusCode).json(res.message)
    },
    submitQuestion: async (request, response) => {
        const value = request.body;
        const res = await qaService.submitQuestion(value)
        response.status(res.statusCode).json(res.message)
    },
    getDataForEdit: async (request, response) => {
        const id = request.params.id;
        const res = await qaService.getDataForEdit(id)
        response.status(res.statusCode).json(res.message)
    }
}