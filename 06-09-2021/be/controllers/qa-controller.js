const qaModel = require('../models/qa-model')

module.exports = {
    uploadQuestion: (request, response) => {
        const newQuestion = new qaModel(request.body)
        newQuestion.save().then(data => {
            response.json({ success: true, statusCode: 200, message: "Question uploaded successfully" })
        }).catch(error => {
            response.json({ success: false, statusCode: 500, message: "Internal Server problem" })
        })
    },
    getMyQuestions: (request, response) => {
        const id = request.params.id
        qaModel.find({ studentID: id }, (error, data) => {
            if (error) {
                response.json({ success: false, statusCode: 500, message: "Internal Server problem" })
            } else {
                if (data.length != 0) {
                    response.json({ success: true, statusCode: 200, message: "Question Readed Successfully", data: data })
                } else {
                    response.json({ success: false, statusCode: 200, message: "No Questions Found for you!!!" })
                }
            }
        })
    },
    getAllQuestions: (request, response) => {
        qaModel.find({ isAnswered: false }, (error, data) => {
            if (error) {
                response.json({ success: false, statusCode: 500, message: "Internal Server problem" })
            } else {
                if (data.length != 0) {
                    response.json({ success: true, statusCode: 200, message: "Question Readed Successfully", data: data })
                } else {
                    response.json({ success: false, statusCode: 200, message: "No Questions Found !!!" })
                }
            }
        })
    },
    submitQuestion: (request, response) => {
        const value = request.body;
        const val = {
            professorID: value.professorID,
            professorName: value.professorName,
            answer: value.answer,
            isAnswered: value.isAnswered
        }
        qaModel.updateOne({ _id: value.questionID }, val, (error, data) => {
            if (error) {
                response.json({ success: false, statusCode: 500, message: "Internal Server problem" })
            } else {
                response.json({ success: true, statusCode: 200, message: "Successfully answer submitted" })
            }
        })
    },
    getDataForEdit: (request, response) => {
        const id = request.params.id;
        qaModel.find({ professorID: id }, (error, data) => {
            if (error) {
                response.json({ success: false, statusCode: 500, message: "Internal Server problem" })
            } else {
                if (data.length != 0) {
                    response.json({ success: true, statusCode: 200, message: "Successfully Data retrieved", data: data })
                } else {
                    response.json({ success: false, statusCode: 404, message: "No record found"})
                }
            }
        })
    }
}