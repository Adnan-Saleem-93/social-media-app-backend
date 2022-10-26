import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'

import postRoutes from './routes/posts.js'
import dotenv from 'dotenv'

const app = express()

app.use('/posts', postRoutes)
app.use(bodyParser.json({limit: '30mb'}))
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}))
app.use(cors())

dotenv.config({path: './.env'})

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`DB Connected. Server is running on port: ${process.env.PORT}`)
    )
  )
  .catch((error) => console.log(error.message))
