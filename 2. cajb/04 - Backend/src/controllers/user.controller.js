import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import { User } from '../models/user.model.js'
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import {ApiResponse} from '../utils/ApiResponse.js'

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId)
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken
    await user.save({validateBeforeSave: false})

    return {accessToken, refreshToken}

  } catch (error) {
    throw new ApiError(500, "Something went wrong while genrating refresh and access tokens")
  }
}

const registerUser = asyncHandler( async (req, res) => {
  // 1. get user details from frontend
  // 2. validation - Not empty
  // 3. check if already exists: username, email  
  // 4. check for images and avatar
  // 5. upload them to cloudinary, avatar
  // 6. create user object - create entry in db
  // 7. remove password and refresh token field from response
  // 8. check for user creation 
  // 9. return response

  const {fullName, email, userName, password} = req.body

  if(
    [fullName, email, userName, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, 'All fiels are required')
  }

  const existedUser = await User.findOne({
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

const loginUser = asyncHandler(async (req, res) => {
  // 1. req.body -> data
  // 2. username or email
  // 3. find the user
  // 4. password check
  // 5. access and refresh token
  // 6. send cookies

  const {email, userName, password} = req.body

  if (!userName || !email) {
    throw new ApiError(400, "Username or email is required")
  }

  const user = await User.findOne({
    $or: [{userName}, {email}]
  })

  if (!user) {
    throw new ApiError(404, "User does not exist")
  }

  const isPasswordValid = await user.isPasswordCorrect(password)

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials")
  }

  const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

  const options = {
    httpOnly: true,
    secure: true
  }

  return res
  .status(201)
  .cookie("accessToken", accessToken, options)
  .cookie("refreshToken", refreshToken, options)
  .json(new ApiResponse(
    200, 
    { user: loggedInUser, accessToken, refreshToken }, 
    "User logged in successfully"
  ))
})

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id, 
    {
      $set: {
        refreshToken: undefined
      }
    }, 
    {
      new: true
    }
  )

  const options = {
    httpOnly: true,
    secure: true
  }

  return res
  .status(200)
  .clearCookie("accessToken", options)
  .clearCookie("refreshToken", options)
  .json(new ApiResponse(200, {}, "User logged out"))
})

export {registerUser, loginUser, logoutUser}