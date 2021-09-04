require('dotenv').config()
const rolePrivillages = require('../models/rolesPrivillages.js')
const roles = require('../models/role')
const user = require('../models/user-model')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

module.exports = {
    getMyRole: async function (roleName) {
        return new Promise((resolve, reject) => {
            roles.findOne({ roleName: roleName }).then(data => {
                rolePrivillages.findOne({ _id: data.id }).then(responseData => {
                    resolve(responseData)
                }).catch(error => {
                    reject(0)
                })
            }).catch(error => {
                reject(0)
            })
        });
    },
    createToken: function (role, body) {
        return new Promise((resolve, reject) => {
            user.findOne({ userID: body._id }, (err, res) => {
                if (err) {
                    reject("Internal server problem")
                }
                const users = {
                    _id: res.userID,
                    name: res.name,
                    role: role
                }
                const accessToken = jwt.sign({ users }, process.env.SECREAT_KEY, { expiresIn: "1d" })
                const responseData = {
                    accessToken: accessToken,
                }
                resolve(responseData)
            })
        })
    },
    verifyToken: (request, response) => {
        if (!request.headers.authorization) {
            return response.status(401).send("unauthorized request")
        } else {
            let token = request.headers.authorization.split(' ')[1];
            if (token === 'null') {
                return response.status(401).send("unauthorized request")
            } else {
                jwt.verify(token, process.env.SECREAT_KEY, (error, payload) => {
                    if (error) {
                        return response.status(401).send("unauthorized request : " + error)
                    } else {
                        return response.json(payload)
                    }
                })
            }
        }
    },
    sendMail: (email, id, subject) => {
        return new Promise((resolve, reject) => {
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'iLearnatmin@gmail.com',
                    pass: 'mani@4515'
                }
            });
            var mailOptions = {
                from: 'iLearnatmin@gmail.com',
                to: email,
                subject: subject
            };
            if (subject === 'Verification Mail') {
                mailOptions['text'] = `
Hi,

Greetings.

Thanks for register with iLearn. You need to verify you account before logging in. Please click the following link to verify.

http://localhost:8080/verifyUser/${id}`

            } else if (subject === 'New Password') {
                mailOptions['text'] = `
Hi,

Greetings.

Your iLearn Password was successfully reseted. You can use the following password to login to your account.

password: ${id}`
            }

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    reject(0)
                } else {
                    console.log("send")
                    resolve(1)
                }
            });
        })
    }
}