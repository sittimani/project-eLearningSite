const userModel = require('../models/user-model')
const authModel = require('../models/auth-model')

module.exports = {
    createUser: (body) => {
        return new Promise((resolve, reject) => {
            const user = new userModel(body)
            user.save().then(data => {
                resolve({ success: true, statusCode:200, message: "Successfully user Created" })
            }).catch(error => {
                reject({ success: false, statusCode:500, message: "Internal server problem" })
            })
        })
    },
    getUserData: (request, response) => {
        const id = request.params.id;
        userModel.findOne({ userID: id }, (error, data) => {
            response.json(data)
        })
    },
    updateUser: (request, response) => {
        const id = request.params.id;
        var body = request.body;
        body.userID = id;
        userModel.findOneAndUpdate({userID: id}, body, {new: true}, (error, res) => {
            if(error){
                response.json({success: false, statusCode:500, message: "Error in updating"})
            }else{
                response.json({success: true, statusCode:200, message: "User Updated successfully",data: res})
            }
        })
    },
    getPendingProfessor: (request, response) => {
        authModel.find({verified: 'pending'}, (error, data) => {
            if(error){
                response.json({success: false, statusCode:200, message: "Internal server problem"})
            }else{
                response.json({success: true, statusCode:200, message: "Successfully readed data", data: data})
            }
        })
    },
    userPermission: (request, response) => {
        const {id, verified} = request.body
        authModel.updateOne({_id: id}, {$set: {verified:verified}}, (err,data)=> {
            if(err){
                response.json({success:false, statusCode:500, message: "Internal Server Problem"})
            }else{
                response.json({success: true, statusCode:200, message: "successfully approved"})
            }
        })
    }
}