require('dotenv').config()
const rolePrivillages = require('../models/rolesPrivillages.js')
const roles = require('../models/role')
const user = require('../models/user-model')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

module.exports = {
    getMyRole: async function (roleName) {
        const data = await roles.findOne({ roleName: roleName })
        if (data) {
            const res = await rolePrivillages.findOne({ _id: data.id })
            if (res) {
                return res
            }
        }
        return 0
    },
    createToken: async (role, body) => {
        const res = await user.findOne({ userID: body._id })
        if (res) {
            const users = {
                _id: res.userID,
                name: res.name,
                role: role
            }
            const accessToken = jwt.sign({ users }, process.env.PRIVATE_KEY, { expiresIn: "1d" })
            const responseData = {
                accessToken: accessToken,
                user: {
                    users
                }
            }
            return responseData
        }
        return 0
    },
    verifyToken: (request, response, next) => {
        if (!request.headers.authorization) {
            return response.json({ statusCode: 401, message: "unauthorized request" })
        } else {
            let token = request.headers.authorization.split(' ')[1];
            if (token === 'null') {
                return response.json({ statusCode: 401, message: "unauthorized request" })
            } else {
                jwt.verify(token, process.env.PRIVATE_KEY, (error, payload) => {
                    if (error) {
                        return response.json({ statusCode: 401, message: "unauthorized request" })
                    } else {
                        request.user = payload
                        next()
                    }
                })
            }
        }
    },
    sendMail: async (email, id, subject) => {

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

        const info = await transporter.sendMail(mailOptions)
        if (info) {
            return true
        }
        return false;
    }
}