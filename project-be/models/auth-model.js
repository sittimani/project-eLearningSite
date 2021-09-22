import mongoose from 'mongoose'

const Schema = mongoose.Schema
const authSchema = new Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String
    },
    emailVerified: {
        type: Boolean
    },
    verified: {
        type: String
    }
}, { timestamps: true, versionKey: false })

const model = mongoose.model('authSchema', authSchema, 'logins')

export default model 