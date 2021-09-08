const courseService = require('../service/course.service')

module.exports = {
    getAllCourse: async (request, response) => {
        const res = await courseService.getAllCourse()
        response.json(res)
    },
    getAllTopics: async (request, response) => {
        const name = request.params.name.trim();
        const res = await courseService.getAllTopics(name)
        response.json(res)
    },
    updateTopic: async (request, response) => {
        const res = await courseService.updateTopic(request.body)
        response.json(res)
    },
    getParticularTopic: async (request, response) => {
        const courseName = request.body.courseName;
        const res = await courseService.getParticularTopic(courseName)
        response.json(res)
    },
    picUpload: (request, response) => {
        response.json(request.file.filename);
    },
    uploadCourse: async (request, response) => {
        const res = await courseService.uploadCourse(request.body, request.body.overview)
        response.json(res)
    },
    deleteTopic: async (request, response) => {
        const res = await courseService.deleteTopic(request.body)
        response.json(res)
    },
    deleteCourse: async (request, response) => {
        const res = await courseService.deleteCourse(request.body)
        response.json(res)
    }
}