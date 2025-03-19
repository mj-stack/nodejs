import dotenv from 'dotenv'
import { app } from './app.js'
import { connectDB } from './db/md.db.js'

dotenv.config({path: "./.env"})

const PORT = process.env.PORT || 4000
connectDB()
.then(() => {
  app.listen(PORT, () => {
    console.log('Server listening at ', PORT);
  })
})
.catch(err => console.log('Error starting server ', err))