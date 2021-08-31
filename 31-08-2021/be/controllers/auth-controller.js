const authModel = require('../models/auth-model')
const getter = require('../service/getters')

function professorLogin(data) {
    return new Promise((resolve, reject) => {
        if (data.verified == 'approved') {
            getMyToken(data).then(res => {
                resolve(res)
            }).catch(error => {
                reject({ success: false, statsCode: 500, message: "Internal Server Problem" })
            })
        } else if (data.verified == 'denied') {
            resolve({ success: false, statusCode: 401, message: "Your request was denied by our admin" })
        } else {
            resolve({ success: false, statusCode: 401, message: "Your request is not accepted yet!!!" })
        }
    })
}

function getMyToken(data) {
    return new Promise((resolve, reject) => {
        getter.getMyRole(data.role).then(role => {
            getter.createToken(role, data).then(responseData => {
                resolve({ success: true, statusCode: 200, message: "login successfully", data: responseData })
            }).catch(err => {
                resolve({ success: false, statusCode: 500, message: "Internal Server Problem" })
            })
        }).catch(error => {
            resolve({ success: false, statsCode: 500, message: "server problem" })
        })
    })
}

module.exports = {
    Login: (request, response) => {
        const { email, password } = request.body;
        authModel.findOne({ email: email }, (error, data) => {
            if (error) {
                response.json({ success: false, statsCode: 500, message: "Internal server problem" })
            }
            if (data == null) {
                response.json({ success: false, statusCode: 404, message: "No user found" })
            } else {
                if (data.password != password) {
                    response.json({ success: false, statusCode: 401, message: "Invalid password" })
                } else {
                    if (data.role === 'professor') {
                        professorLogin(data).then(resolve => {
                            response.json(resolve)
                        }, error => {
                            response.json({ success: false, statsCode: 500, message: "Internal Server Problem" })
                        })
                    } else {
                        getMyToken(data).then(res => {
                            response.json(res)
                        }).catch(error => {
                            console.log(error)
                            response.json({ success: false, statsCode: 500, message: "Internal Server Problem" })
                        })
                    }
                }
            }
        })
    },
    updatePassword: (request, response) => {
        const { id, oldPassword, newPassword } = request.body;
        authModel.findOne({ _id: id }, (error, data) => {
            if (error) {
                response.json({ success: false, statusCode:500, message: 'Internal Server Problem' })
            } else if (data == null) {
                response.json({ success: false, statusCode:404, message: "No user Found" })
            } else {
                if (data.password != oldPassword) {
                    response.json({ success: false, statusCode:401, message: "Password Mismatch" })
                } else {
                    authModel.updateOne({ _id: id }, { $set: { password: newPassword } }, (error, data) => {
                        if (error) {
                            response.json({ success: false, statusCode:500, message: "Internal Server Problem" })
                        } else {
                            response.json({ success: true, statusCode:200, message: "Password Updated", data: data })
                        }
                    })
                }
            }
        })
    }
}