import * as dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import { verificationMail, newPassword } from './emailContent.js'
import rolePrivilage from '../models/rolesPrivilages.js'
import roles from '../models/role.js'
import user from '../models/user-model.js'

dotenv.config()

export default class Verification {

    async getMyRole(roleName) {
        const data = await roles.findOne({ roleName: roleName })
        return await rolePrivilage.findOne({ _id: data.id })
    }
    async createToken(role, body) {
        const response = await user.findOne({ userID: body._id })
        if (response) {
            const users = {
                _id: response.userID,
                name: response.name,
                role: role
            }
            const accessToken = jwt.sign({ users }, process.env.PRIVATE_KEY, { expiresIn: '1d' })
            const responseData = {
                accessToken: accessToken,
                user: {
                    users
                }
            }
            return responseData
        }
        return 0
    }

    async sendMail(email, id, subject) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASSWORD
            }
        })
        let mailOptions = {
            from: process.env.NODEMAILER_EMAIL,
            to: email,
            subject: subject
        }
        mailOptions['text'] = subject === 'Verification Mail' ? verificationMail(id) : newPassword(id)
        const info = await transporter.sendMail(mailOptions)
        if (info)
            return true
        return false
    }
}
