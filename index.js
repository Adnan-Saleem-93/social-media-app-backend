import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'

import postRoutes from './routes/posts.js'
import dotenv from 'dotenv'

const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.json({limit: '30mb'}))
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}))
app.use(cors())

// #region Routes
app.use('/posts', postRoutes)
// #endregion

dotenv.config({path: './.env'})

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() =>
    app.listen(port, () => console.log(`DB Connected. Server is running on port: ${port}`))
  )
  .catch((error) => console.log(error.message))
