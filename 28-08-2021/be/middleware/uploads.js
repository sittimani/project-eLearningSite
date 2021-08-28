const multer = require('multer')
const path= require('path')
var name;
const stroage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads/')
    },
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname)
        name = Date.now()+ext
        callback(null, name)
    }
})

const upload = multer({
    storage: stroage,
    fileFilter: (req, file, callback) => {
        if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg') {
            callback(null, true)
        } else {
            console.log("Only jpg and png file allowed")
            callback(null, false)
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 2
    }
})

module.exports = {
    upload: upload,
    filename: name
}