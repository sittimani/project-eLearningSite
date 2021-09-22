import * as dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import { verificationMail, newPassword } from './emailContent.js'
import rolePrivilage from '../models/rolesPrivilages.js'
import roles from '../models/role.js'
import user from '../models/user-model.js'

dotenv.config()

export default class Verification {

    constructor() { }

    async getMyRole(roleName) {
        try {
            const data = await roles.findOne({ roleName: roleName })
            const res = await rolePrivilage.findOne({ _id: data.id })
            return res
        } catch (error) {
            return 0
        }
    }
    async createToken(role, body) {
        try {
            const res = await user.findOne({ userID: body._id })
            if (res) {
                const users = {
                    _id: res.userID,
                    name: res.name,
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
        } catch (error) {
            return 0
        }
    }

    async sendMail(email, id, subject) {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASSWORD
            }
        });
        let mailOptions = {
            from: process.env.NODEMAILER_EMAIL,
            to: email,
            subject: subject
        };
        if (subject === 'Verification Mail') {
            mailOptions['text'] = verificationMail(id)
        } else if (subject === 'New Password') {
            mailOptions['text'] = newPassword(id)
        }
        const info = await transporter.sendMail(mailOptions)
        if (info)
            return true
        return false;
    }
}
