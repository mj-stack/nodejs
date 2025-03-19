import mongoose from 'mongoose'
import { DB_NAME } from '../constants.js'

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    console.log("MongoDB connected")
  } catch (error) {
    console.log('Error while connecting to DB ', error)
  }
}

export {connectDB}