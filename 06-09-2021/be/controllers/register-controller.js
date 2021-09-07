const authModel = require('../models/auth-model')
const userController = require('../controllers/user-controller')
const getter = require('../service/getters')

module.exports = {
    register: (request, response) => {
        const { email } = request.body
        authModel.findOne({ email: email }, (error, res) => {
            if (error) {
                response.json({ success: false, statusCode: 500, message: "Internal server problem" })
            } else if (res != null) {
                response.json({ success: false, statusCode: 409, message: "User already exists" })
            } else {
                if (request.body.role === "professor") {
                    request.body['verified'] = 'pending'
                }
                request.body['emailVerified'] = false;
                const Auth = new authModel(request.body)
                Auth.save().then(data => {
                    request.body['userID'] = data._id
                    userController.createUser(request.body).then(data => {
                        getter.sendMail(email, request.body.userID, "Verification Mail").then(resolve => {
                            response.json(data)
                        }).catch( reject => {
                            authModel.deleteOne({ _id: request.body.userID })    
                            response.json({ success: false, statusCode: 500, message: "Error in User Creation, Try after sometime!!!"})
                        })
                    }).catch(error => {
                        authModel.deleteOne({ _id: request.body.userID })
                        response.json({ success: false, statusCode: 500, message: "Error in User Creation, Try after sometime!!!" })
                    })
                }).catch(error => {
                    response.json({ success: false, statusCode: 500, message: "Internal Server Problem" })
                })
            }
        })
    }
}