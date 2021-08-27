require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connection = require("./service/connection")
const authRoute = require("./routes/authRoute")
const registerRoute = require("./routes/registerRoute")
const userRoute = require('./routes/userRoute')
const courseRoute = require('./routes/courseRoute')

const app = express()

app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))
app.use(cors())

app.use('/uploads', express.static('uploads'))
app.use(authRoute)
app.use(registerRoute)
app.use(userRoute)
app.use(courseRoute)


app.listen(8080, async() => {
    console.log("Server running in port 8080")
    connection.connectToDB().then(resolve => {
        console.log(resolve)
    }, reject => {
        console.log(reject)
    })
})