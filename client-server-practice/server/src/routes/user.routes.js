import { Router } from "express"
import { loginUser } from "../controllers/user.controller.js"

const userRouter = Router()

userRouter.route("/api/form").post(loginUser)

export {userRouter}