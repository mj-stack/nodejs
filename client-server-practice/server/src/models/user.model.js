import mongoose from "mongoose"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }, 
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {timestamps: true})

userSchema.pre("save", async function (next) {
  if(!this.isModified("password")) return next()

  try {
    this.password = bcrypt.hash("password", 10)
  } catch (error) {
    next(error)
  }
})

export const User = mongoose.model('User', userSchema)