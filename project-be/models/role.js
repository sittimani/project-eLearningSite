import mongoose from "mongoose"

const Schema = mongoose.Schema

const roleSchema = new Schema({
    roleName: {
        type: String
    }
}, { timestamps: true, versionKey: false })


const model = mongoose.model('roles', roleSchema, "roles")

export default model 