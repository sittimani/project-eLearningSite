const courseModel = require('../models/courseModel')
module.exports = {
    getAllCourse: (request, response) => {
        courseModel.find({}, (error, data) => {
            if(error){
                response.json({success: false, message: "Internal Server Problem"})
            }else{
                response.json({success: true, message: 'successfully readed', data: data})
            }
        })
    },
    getCourse: (request, response) => {
        const name = request.params.name.trim();
        console.log(name)
        courseModel.find({courseName:name}, (error,data) => {
            if(error){
                response.json({success: false, message: "Internal Server Problem"})
            }else{
                response.json({success: true, message: "Successfully readed", data: data})
            }
        })
    },
    addTopic: (request, response) => {
        const courseName = request.courseName;
        const topicName = request.topicName;
        const value = {
            documentLink: request.documentLink,
            toturialLink: request.toturialLink,
            teacherID: request.teacherID
        }
        console.log(value)
        //courseModel.updateOne()
    }
}