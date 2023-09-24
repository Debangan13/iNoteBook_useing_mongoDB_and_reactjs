require('dotenv').config()

const express = require('express')
const app = express()
const connectDB = require('./db/connect')
const userRouter = require('./routes/authRoute')
const noteRouter = require('./routes/noteRoute')
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.use('/api/v1/auth',userRouter)
app.use('/api/v1/note',noteRouter)


const port = process.env.PORT 
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port,console.log(`server is listen on port ${port}`))
        
    } catch (error) {
        console.log(error.message);
    }
}
start()