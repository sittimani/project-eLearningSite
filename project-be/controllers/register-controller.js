const studentAuthModel = require('../models/studentAuth')
const professorAuthModel = require('../models/professorAuth')
const userController = require('../controllers/user-controller')
const getter = require('../service/getters')

module.exports = {
    professorRegister: (request, response) => {
        professorAuthModel.findOne({ email: request.body.email }, (error, res) => {
            if (error) {
                response.statusCode = 501
                response.json({ success: false, message: "Internal server problem" })
            } else if (res) {
                response.json({ success: false, message: "User already exists" })
            } else {
                request.body['status'] = 'pending'
                const Auth = new professorAuthModel(request.body)
                Auth.save().then(data => {
                    request.body['userID'] = data._id
                    userController.createProfessorUser(request.body).then(data => {
                        response.json(data)
                    }).catch(error => {
                        professorAuthModel.deleteOne({ _id: request.body.userID })
                        response.json(responseData)
                    })
                }).catch(error => {
                    response.json({ success: false, message: "Internal Server Problem end" })
                })
            }
        })
    },
    studentRegister: (request, response) => {
        studentAuthModel.findOne({ email: request.body.email }, (error, res) => {
            if (error) {
                console.log(error)
                response.statusCode = 501
                response.json({ success: false, message: "Internal server problem" })
            } else if (res) {
                response.json({ success: false, message: "User already exists" })
            } else {
                const Auth = new studentAuthModel(request.body)
                Auth.save().then(async (data) => {
                    request.body['userID'] = data._id
                    userController.createStudentUser(request.body).then(data => {
                        getter.getMyRole(request.body.role).then(roles => {
                            const responseData = getter.createToken(roles, request.body)
                            response.json({ success: true, message: "Successfully Registered as Student", data: responseData })
                        }).catch(error => {
                            console.log(error)
                            response.json({ success: true, message: "error in getting role please login" })
                        })
                    }).catch(error => {
                        professorAuthModel.deleteOne({ _id: request.body.userID })
                        response.json(responseData)
                    })
                }).catch(error => {
                    console.log(error)
                    response.json({ success: false, message: "Internal Server Problem" })
                })
            }
        })
    }
}