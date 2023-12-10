import dotenv from 'dotenv'
dotenv.config()
import express, { request, response } from "express"
import {PORT} from "./config.js"
import mongoose from "mongoose"
import {Game} from "./models/gameModel.js"
import gamesRoute from "./routes/gamesRoute.js"
import cors from 'cors'

const app = express()

// Middleware for parsing request body

app.use(express.json())

app.use(cors())

app.get('/', (request, response) => {
  console.log(request)
  return response.status(200).send('Welcome to your gaming hub')
})

app.use('/games', gamesRoute)

mongoose.connect(process.env.REACT_APP_MONGODB_URI)
  .then(() => {
    console.log('App connected to database')
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`)
    })
  })
  .catch((error) => {
    console.log(error)
  })