const qaService = require('../service/qa.service')

module.exports = {
    uploadQuestion: async (request, response) => {
        const res = await qaService.uploadQuestion(request.body)
        response.json(res)
    },
    getMyQuestions: async (request, response) => {
        const id = request.params.id
        const res = await qaService.getMyQuestions(id)
        response.json(res)
    },
    getAllQuestions: async (request, response) => {
        const res = await qaService.getAllQuestions()
        response.json(res)
    },
    submitQuestion: async (request, response) => {
        const value = request.body;
        const res = await qaService.submitQuestion(value)
        response.json(res)
    },
    getDataForEdit: async (request, response) => {
        const id = request.params.id;
        const res = await qaService.getDataForEdit(id)
        response.json(res)
    }
}