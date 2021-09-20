import mongoose from "mongoose"

const Schema = mongoose.Schema

const roleSchema = new Schema({
    _id: {
        type: String
    },
    readDocument: {
        type: Boolean
    },
    createDocument: {
        type: Boolean
    },
    updateDocument: {
        type: Boolean
    },
    deleteDocument: {
        type: Boolean
    },
    createCourse: {
        type: Boolean
    }
}, { timestamps: true, versionKey: false })


const model = mongoose.model('rolePrivilage', roleSchema, "rolePrivilages")

export default model 