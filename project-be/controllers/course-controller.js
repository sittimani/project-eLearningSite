const courseService = require('../service/course.service')

module.exports = {
    getAvailableCourse: async (request, response) => {
        const res = await courseService.getAllCourse()
        response.status(res.statusCode).json(res.message)
    },
    getAllTopics: async (request, response) => {
        const name = request.params.name.trim();
        const res = await courseService.getAllTopics(name)
        response.status(res.statusCode).json(res.message)
    },
    updateParticularTopic: async (request, response) => {
        const res = await courseService.updateTopic(request.body)
        response.status(res.statusCode).json(res.message)
    },
    getParticularTopic: async (request, response) => {
        const courseName = request.body.courseName;
        const res = await courseService.getParticularTopic(courseName)
        response.status(res.statusCode).json(res.message)
    },
    picUpload: (request, response) => {
        response.json(request.file.filename);
    },
    uploadCourse: async (request, response) => {
        const res = await courseService.uploadCourse(request.body, request.body.overview)
        response.status(res.statusCode).json(res.message)
    },
    deleteParticularTopic: async (request, response) => {
        const res = await courseService.deleteTopic(request.body)
        response.status(res.statusCode).json(res.message)
    },
    deleteEntireCourse: async (request, response) => {
        const res = await courseService.deleteCourse(request.body)
        response.status(res.statusCode).json(res.message)
    }
}