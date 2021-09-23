import CourseService from '../service/course.service.js'
import { sendResponse } from '../service/response.js'

const courseService = new CourseService()

export default class CourseController {

    async getAvailableCourse(request, response) {
        const res = await courseService.allCourse()
        sendResponse(response, res)
    }
    async getAllTopics(request, response) {
        const name = request.params.name.trim()
        const res = await courseService.allTopics(name)
        sendResponse(response, res)
    }
    async updateParticularTopic(request, response) {
        const res = await courseService.updateTopic(request.body)
        sendResponse(response, res)
    }
    async getParticularTopic(request, response) {
        const courseName = request.params.name.trim()
        const res = await courseService.particularTopic(courseName)
        sendResponse(response, res)
    }
    async picUpload(request, response) {
        response.json(request.file.filename)
    }
    async uploadCourse(request, response) {
        const res = await courseService.createCourse(request.body, request.body.overview)
        sendResponse(response, res)
    }
    async deleteParticularTopic(request, response) {
        const res = await courseService.deleteTopic(request.body)
        sendResponse(response, res)
    }
    async deleteEntireCourse(request, response) {
        const res = await courseService.deleteCourse(request.body)
        sendResponse(response, res)
    }
}
