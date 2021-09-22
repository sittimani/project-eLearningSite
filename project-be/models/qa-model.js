import  mongoose from 'mongoose'

const Schema = mongoose.Schema
const questionSchema = new Schema({
    studentID: {
        type: String
    },
    question: {
        type: String
    },
    studentName: {
        type: String
    },
    professorID: {
        type: String
    },
    professorName: {
        type: String
    },
    answer: {
        type: String,
    },
    isAnswered: {
        type: Boolean
    }
}, { timestamps: true, versionKey: false })

const model = mongoose.model('qa', questionSchema, 'questions')

export default model 