import * as dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import { connectToDB } from './service/connection.js'
import authRoute from './routes/auth-route.js'
import registerRoute from './routes/register-route.js'
import userRoute from './routes/user-route.js'
import courseRoute from './routes/course-route.js'
import qaRoute from './routes/qa-route.js'


dotenv.config()
const app = express()

const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(cors())

app.use('/uploads', express.static('uploads'))
app.use(authRoute)
app.use(registerRoute)
app.use(userRoute)
app.use(courseRoute)
app.use(qaRoute)

app.listen(port, async () => {
    console.log('Server running in port ' + port)
    connectToDB().then(resolve => {
        console.log('connected to mongoDB')
    }, reject => {
        console.log('Error in connecting to mongoDB')
    })
})