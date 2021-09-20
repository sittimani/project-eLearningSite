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
            callback(null, false)
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 2
    }
})

module.exports = {
    upload: upload
}