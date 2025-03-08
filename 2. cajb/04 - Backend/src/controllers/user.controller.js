import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import { User } from '../models/user.model.js'
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import {ApiResponse} from '../utils/ApiResponse.js'

const registerUser = asyncHandler( async (req, res) => {
  // 1. Get user details from frontend
  // 2. Validation - Not empty
  // 3. Check if already exists: username, email  
  // 4. Check for images and avatar
  // 5. Upload them to cloudinary, avatar
  // 6. Create user object - create entry in db
  // 7. Remove password and refresh token field from response
  // 8. Check for user creation 
  // 9. Return response

  const {fullName, email, userName, password} = req.body
  console.log("email: ", email)

  if(
    [fullName, email, userName, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, 'All fiels are required')
  }

  const existedUser = User.findOne({
    $or: [{ userName }, { email }]
  })

  if(existedUser) {
    throw new ApiError(409, "User with username or email already exist")
  }

  const avatarLocalPath = req.files?.avatar[0]?.path
  const coverImageLocalPath = req.files?.coverImage[0]?.path

  if(!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required")
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath)
  const coverImage = await uploadOnCloudinary(coverImageLocalPath)

  if(!avatar) {
    throw new ApiError(400, "Avatar file is required")
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    userName: userName.toLowerCase()
  })

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken" 
  )

  if(!createdUser) {
    throw new ApiError(500, "Something went wrong while registerning the user")
  }

  return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered successfully")
  )

})


export {registerUser}