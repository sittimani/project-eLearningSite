const authModel = require('../models/auth-model')
const userController = require('../controllers/user-controller')
const getter = require('../service/getters')

module.exports = {
    professorRegister: (request, response) => {
        authModel.findOne({ email: request.body.email }, (error, res) => {
            if (error) {
                response.json({ success: false, statusCode:500, message: "Internal server problem" })
            } else if (res != null) {
                response.json({ success: false, statusCode:409, message: "User already exists" })
            } else {
                request.body['verified'] = 'pending'
                const Auth = new authModel(request.body)
                Auth.save().then(data => {
                    request.body['userID'] = data._id
                    userController.createUser(request.body).then(data => {
                        response.json(data)
                    }).catch(error => {
                        authModel.deleteOne({ _id: request.body.userID })
                        response.json({success: false, statusCode:500, message: "Error in User Creation, Try after sometime!!!"})
                    })
                }).catch(error => {
                    response.json({ success: false, statusCode:500, message: "Internal Server Problem" })
                })
            }
        })
    },
    studentRegister: (request, response) => {
        authModel.findOne({ email: request.body.email }, (error, res) => {
            if (error) {
                response.json({ success: false, statusCode:500, message: "Internal server problem" })
            } else if (res != null) {
                response.json({ success: false, statusCode:409, message: "User already exists" })
            } else {
                const Auth = new authModel(request.body)
                Auth.save().then(async (data) => {
                    request.body['userID'] = data._id
                    userController.createUser(request.body).then(datas => {
                        getter.getMyRole(request.body.role).then(roles => {
                            getter.createToken(roles, data).then( responseData =>{
                                response.json({ success: true, statusCode:200, message: "Successfully Registered as Student", data: responseData })
                            }).catch(err => {
                                response.json({success: false, statusCode:500, message: "Internal Server Problem"})
                            })
                        }).catch(error => {
                            response.json({ success: false, statusCode:500, message: "error in getting role please login" })
                        })
                    }).catch(error => {
                        authModel.deleteOne({ _id: request.body.userID })
                        response.json({success: false, statusCode:500, message: "Error in User Creation, Try after sometime!!!"})
                    })
                }).catch(error => {
                    console.log(error)
                    response.json({ success: false, statusCode:500, message: "Internal Server Problem" })
                })
            }
        })
    }
}