import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'

import routes from './routes'

// middlewares
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(morgan('dev'))
app.use(cookieParser())

// Routes
app.use('/api', routes.authRouter)

// databse connection
import './config/database'

// server listening
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log('Serving is running on port', PORT))
