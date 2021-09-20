import mongoose from "mongoose"

export async function connectToDB() {
    const db = process.env.DB_ADDRESS + process.env.DBNAME
    const options = {
        socketTimeoutMS: 30000,
        keepAlive: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    return new Promise((resolve, reject) => {
        mongoose.connect(db, options, error => {
            if (error) {
                console.log(error)
                reject(false)
            } else {
                resolve(true)
            }
        })
    })

}