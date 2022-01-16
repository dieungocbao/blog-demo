import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
// databse connection
import './config/database'
import routes from './routes'

dotenv.config()

// middlewares
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(morgan('dev'))
app.use(cookieParser())

// Routes
app.use('/api', routes.authRouter)

// server listening
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log('Serving is running on port', PORT))
