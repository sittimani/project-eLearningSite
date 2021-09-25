const courseModel = require('../models/courseModel')
const filename = require('../middleware/uploads').filename
module.exports = {
    getAllCourse: (request, response) => {
        courseModel.find({}, (error, data) => {
            if (error) {
                response.json({ success: false, message: "Internal Server Problem" })
            } else {
                response.json({ success: true, message: 'successfully readed', data: data })
            }
        })
    },
    getCourse: (request, response) => {
        const name = request.params.name.trim();
        console.log(name)
        courseModel.find({ courseName: name }, (error, data) => {
            if (error) {
                response.json({ success: false, message: "Internal Server Problem" })
            } else {
                response.json({ success: true, message: "Successfully readed", data: data })
            }
        })
    },
    topic: (request, response) => {
        const courseName = request.body.courseName;
        const topicName = request.body.topicName;
        const value = {
            documentLink: request.body.documentLink,
            toturialLink: request.body.toturialLink,
            teacherID: request.body.teacherID
        }
        courseModel.updateOne({ courseName: courseName }, { $set: { [topicName]: value } }, (error, data) => {
            if (error) {
                response.json({ success: false, message: "Internal Server Problem" })
            } else {
                response.json({ success: true, message: "Successfully course updated", data: data })
            }
        })
    },
    picUpload: (request, response) => {
        console.log(request.body)
        response.json(request.file.filename);

    },
    uploadCourse: (request, response) => {
        const { courseName, url, description } = request.body
        courseModel.findOne({ courseName: courseName }, (error, data) => {
            if (error) {
                response.json({ success: false, message: "Internal Server problem" })
            } else {
                if (data != null) {
                    response.json({ success: false, message: "Already course Available" })
                } else {
                    const object = {
                        courseName: courseName,
                        overview: {
                            shortDesciption: request.body.overview,
                            url: url,
                            description: description
                        }
                    }
                    const newCourse = new courseModel(object)
                    newCourse.save().then(data => {
                        response.json({ success: true, message: "successfully added" })
                    }, error => {
                        response.json({ success: false, message: "error in adding data" })
                    })
                }
            }
        })
        console.log(request.body)
    }
}