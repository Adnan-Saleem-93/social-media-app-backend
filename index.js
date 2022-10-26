import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import {CONNECTION_URL, PORT} from './utils/constants.js'
import postRoutes from './routes/posts.js'

const app = express()

app.use('/posts', postRoutes)
app.use(bodyParser.json({limit: '30mb'}))
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}))
app.use(cors())

mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`DB Connected. Server is running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message))
