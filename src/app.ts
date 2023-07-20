import "dotenv/config"
import connectDB from './config/db'
import express  from "express";
import cors from 'cors'
import messageRoutes from "./routes/messageRoutes";
import chatRoutes from "./routes/chatRoutes";
import userRoutes from "./routes/userRoutes"

const app = express()
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`Server at port ${PORT}`)
})

connectDB().then(() => {
    console.log(`DB connected`)
})

app.use(cors())
app.use(express.json())
app.use('/api', userRoutes)
app.use('/api', messageRoutes)
app.use('/api', chatRoutes)

