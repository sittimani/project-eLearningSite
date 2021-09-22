import mongoose from 'mongoose'

const Schema = mongoose.Schema
const professorSchema = new Schema({
    name: {
        type: String
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    },
    phone: {
        type: Number
    },
    userID: {
        type: String
    },
    workingAt: {
        type: String
    }
}, { timestamps: true, versionKey: false })


const model = mongoose.model('userInfo', professorSchema, 'users')

export default model