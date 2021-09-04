const courseModel = require('../models/course-model')
module.exports = {
    getAllCourse: (request, response) => {
        courseModel.find({}, (error, data) => {
            if (error) {
                response.json({ success: false, statusCode: 500, message: "Internal Server Problem" })
            } else {
                response.json({ success: true, statusCode: 200, message: 'successfully readed', data: data })
            }
        })
    },
    getAllTopics: (request, response) => {
        const name = request.params.name.trim();
        courseModel.find({ courseName: name }, (error, data) => {
            if (error) {
                response.json({ success: false, statusCode: 500, message: "Internal Server Problem" })
            } else {
                response.json({ success: true, statusCode: 200, message: "Successfully readed", data: data })
            }
        })
    },
    updateTopic: (request, response) => {
        const courseName = request.body.courseName;
        const topicName = request.body.topicName;
        const value = {
            documentLink: request.body.documentLink,
            toturialLink: request.body.toturialLink,
            teacherID: request.body.teacherID
        }
        courseModel.updateOne({ courseName: courseName }, { $set: { [topicName]: value } }, (error, data) => {
            if (error) {
                response.json({ success: false, statusCode: 500, message: "Internal Server Problem" })
            } else {
                response.json({ success: true, statusCode: 200, message: "Successfully course updated", data: data })
            }
        })
    },
    getParticularTopic: (request, response) => {
        const courseName = request.body.courseName;
        courseModel.findOne({ courseName: courseName }, (error, data) => {
            if (error) {
                response.json({ success: false, statusCode: 500, message: "Internal Server Problem" })
            } else {
                response.json({ success: true, statusCode: 200, message: "Successfully readed", data: data })
            }
        })
    },
    picUpload: (request, response) => {
        response.json(request.file.filename);
    },
    uploadCourse: (request, response) => {
        const { courseName, url, description } = request.body
        courseModel.findOne({ courseName: courseName }, (error, data) => {
            if (error) {
                response.json({ success: false, statusCode: 500, message: "Internal Server problem" })
            } else {
                if (data != null) {
                    response.json({ success: false, statusCode: 409, message: "Already course Available" })
                } else {
                    const object = {
                        courseName: courseName,
                        overview: {
                            shortDescription: request.body.overview,
                            url: url,
                            description: description
                        }
                    }
                    const newCourse = new courseModel(object)
                    newCourse.save().then(data => {
                        response.json({ success: true, statusCode: 200, message: "successfully added" })
                    }, error => {
                        response.json({ success: false, statusCode: 500, message: "error in adding data" })
                    })
                }
            }
        })
    },
    deleteTopic: (request, response) => {
        const { courseName, topicName } = request.body
        courseModel.updateOne({ courseName: courseName }, { $unset: { [topicName]: {} } }, (error, data) => {
            if (error) {
                response.json({ success: false, statusCode: 500, message: "Internal Server Problem" })
            } else {
                response.json({ success: true, statusCode: 200, message: "successfully topic deleted" })
            }
        })
    }, 
    deleteCourse: (request, response) => {
        const { courseName } = request.body
        courseModel.deleteOne({courseName: courseName}, (error, data) => {
            if(error) {
                response.json({success: false, statusCode:500, message: "Internal Server problem"})
            }else{
                response.json({ success: true, statusCode: 200, message: "successfully course deleted" })
            }
        })
    }
}