const getter = require('../service/getters')
const professorLoginModel = require('../models/professorAuth')
const studentLoginModel = require('../models/studentAuth')

module.exports = {
    professorLogin: (request, response) => {
        const email = request.body.email;
        const password = request.body.password;
        const role = request.body.role;
        professorLoginModel.findOne({ email: email }, (error, data) => {
            if (error) {
                response.json(501)
                response.json({ success: false, message: "Internal server problem" })
            }
            if (data == null) {
                // response.json() // code for not fount
                response.json({ success: false, message: "No user found" })
            } else {
                if (data.password != password) {
                    // response.json() // for not valid creditionals
                    response.json({ success: false, message: "Invalid password" })
                } else if (data.role != role) {
                    // response.statusCode = 401
                    response.json({ success: false, message: "Unauthorized login" })
                } else {
                    // professor login
                    if (data.verified == 'approved') {
                        getter.getMyRole(request.body.role).then(role => {
                            getter.createToken(role, data).then(responseData => {
                                response.json({ success: true, message: "login successfully", data: responseData })
                            }).catch(err => {
                                response.json({ success: false, message: err })
                            })
                        }).catch(error => {
                            //response.statusCode = 501
                            response.json({ success: false, message: "server problem" })
                        })
                    } else if (data.verified == 'denied') {
                        response.json({ success: false, message: "Your request was denied by our admin" })
                    } else {
                        // response.statusCode = 401
                        response.json({ success: false, message: "Your request is not accepted yet!!!" })
                    }
                }
            }
        })
    },

    studentLogin: (request, response) => {
        const email = request.body.email;
        const password = request.body.password;
        const role = request.body.role;
        studentLoginModel.findOne({ email: email }, (error, data) => {
            if (error) {
                response.json(501)
                response.json({ success: false, message: "Internal server problem" })
            }
            if (data == null) {
                // response.json() // code for not fount
                response.json({ success: false, message: "No user found" })
            } else {
                if (data.password != password) {
                    // response.json() // for not valid creditionals
                    response.json({ success: false, message: "Invalid password" })
                } else if (data.role !== role) {
                    //response.statusCode = 401
                    response.json({ success: false, message: "Unauthorized login" })
                } else {
                    // student login
                    getter.getMyRole(request.body.role).then(role => {
                        getter.createToken(role, data).then(responseData => {
                            response.json({ success: true, message: "login successfully", data: responseData })
                        }).catch(err => {
                            response.json({ success: false, message: err })
                        })
                    }).catch(error => {
                        // response.statusCode = 501
                        response.json({ success: false, message: "server problem" })
                    })
                }
            }
        })
    },
    adminLogin: (request, response) => {
        const { email, password, role } = request.body;
        studentLoginModel.findOne({ email: email }, (error, data) => {
            if (error) {
                response.json(501)
                response.json({ success: false, message: "Internal server problem" })
            }
            if (data == null) {
                // response.json() // code for not fount
                response.json({ success: false, message: "No user found" })
            } else {
                if (data.password != password) {
                    // response.json() // for not valid creditionals
                    response.json({ success: false, message: "Invalid password" })
                } else if (data.role !== role) {
                    // response.statusCode = 401
                    response.json({ success: false, message: "Unauthorized login" })
                } else {
                    // student login
                    getter.getMyRole(request.body.role).then(role => {
                        getter.createToken(role, data).then(responseData => {
                            response.json({ success: true, message: "login successfully", data: responseData })
                        }).catch(err => {
                            response.json({ success: false, message: err })
                        })
                    }).catch(error => {
                        //  response.statusCode = 501
                        response.json({ success: false, message: "server problem" })
                    })
                }
            }
        })
    },
    updatePassword: (request, response) => {
        const { id, oldPassword, newPassword } = request.body;
        professorLoginModel.findOne({ _id: id }, (error, data) => {
            if (error) {
                response.json({ success: false, message: 'Internal Server Problem' })
            } else if (data == null) {
                response.json({ success: false, message: "No user Found" })
            } else {
                if (data.password != oldPassword) {
                    response.json({ success: false, message: "Password Mismatch" })
                } else {
                    professorLoginModel.updateOne({ _id: id }, { $set: { password: newPassword } }, (error, data) => {
                        if (error) {
                            response.json({ success: false, message: "Internal Server Problem" })
                        } else {
                            response.json({ success: true, message: "Password Updated", data: data })
                        }
                    })
                }
            }
        })
    }
}