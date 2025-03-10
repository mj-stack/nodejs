import dotenv from 'dotenv'
import connectDB from './db/index.js'
import { app } from './app.js'

dotenv.config({path: "./.env"})


connectDB()
.then(() => {
  app.on('error', (error) => {
    console.log(`Unable to connect to the server ${error}`)
  })
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is listening at ${process.env.PORT}`)
  })
})
.catch(error => console.log("MongoDB connection failed  ", error))