import {
    allCourse,
    allTopics,
    updateTopic,
    particularTopic,
    createCourse,
    deleteCourse,
    deleteTopic
} from "../service/course.service.js"
import { sendResponse } from "../service/response.js"

export async function getAvailableCourse(request, response) {
    const res = await allCourse()
    sendResponse(response, res)
}
export async function getAllTopics(request, response) {
    const name = request.params.name.trim();
    const res = await allTopics(name)
    sendResponse(response, res)
}
export async function updateParticularTopic(request, response) {
    const res = await updateTopic(request.body)
    sendResponse(response, res)
}
export async function getParticularTopic(request, response) {
    const courseName = request.body.courseName;
    const res = await particularTopic(courseName)
    sendResponse(response, res)
}
export async function picUpload(request, response) {
    response.json(request.file.filename);
}
export async function uploadCourse(request, response) {
    const res = await createCourse(request.body, request.body.overview)
    sendResponse(response, res)
}
export async function deleteParticularTopic(request, response) {
    const res = await deleteTopic(request.body)
    sendResponse(response, res)
}
export async function deleteEntireCourse(request, response) {
    const res = await deleteCourse(request.body)
    sendResponse(response, res)
}
