const mongoose = require('mongoose')

const Schema = mongoose.Schema
const questionSchema = new Schema({
    studentID:{
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

module.exports = mongoose.model('qa', questionSchema, "questions")