import mongoose from 'mongoose'

export async function connectToDB() {
    const db = process.env.DB_ADDRESS + process.env.DBNAME
    const options = {
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    return new Promise((resolve, reject) => {
        mongoose.connect(db, options, error => {
            if (error) {
                reject(false)
            } else {
                resolve(true)
            }
        })
    })

}