import multer from 'multer'
import * as path from 'path'

const stroage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads/')
    },
    filename: (req, file, callback) => {
        const ext = path.extname(file.originalname)
        const name = Date.now() + ext
        callback(null, name)
    }
})

export const upload = multer({
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
