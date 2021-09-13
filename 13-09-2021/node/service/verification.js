require('dotenv').config()
const rolePrivillages = require('../models/rolesPrivillages.js')
const roles = require('../models/role')
const user = require('../models/user-model')
const jwt = require('jsonwebtoken')
const config = require('./config')
const nodemailer = require('nodemailer')
const emailContent = require('./emailContent')

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
            return response.status(401).send({data: config.message.invalidToken})
        } else {
            let token = request.headers.authorization.split(' ')[1];
            if (token === 'null') {
                return response.status(401).send({data: config.message.invalidToken})
            } else {
                jwt.verify(token, process.env.PRIVATE_KEY, (error, payload) => {
                    if (error) {
                        return response.status(401).send({data: config.message.invalidToken})
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
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });
        var mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: subject
        };
        if (subject === 'Verification Mail') {
            mailOptions['text'] = emailContent.verificationMail(id)
        } else if (subject === 'New Password') {
            mailOptions['text'] = emailContent.newPassword(id)
        }

        const info = await transporter.sendMail(mailOptions)
        if (info) {
            return true
        }
        return false;
    }
}