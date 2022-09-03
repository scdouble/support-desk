const expressAsyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/userModels')

// @desc Register a new user
// @route /api/users
// @access public
const registerUser = expressAsyncHandler(async (req, res) => {
  console.log(req.body)
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please include all fields')
  }

  // Find if user already exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })

  if (user) {
    res
      .status(201)
      .json({ _id: user._id, name: user.name, email: user.email, token: generateToken(user._id) })
  } else {
    res.status(400)
    throw new error('Invalid use data')
  }
})
// @desc Login a new user
// @route /api/users/login
// @access public
const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  // check user and passwords match
  if (user && (await bcrypt.compare(password, user.password))) {
    res
      .status(200)
      .json({ _id: user._id, name: user.name, email: user.email, token: generateToken(user._id) })
  } else {
    res.status(401)
    throw new Error('Invalid credentials')
  }
})

// Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  registerUser,
  loginUser,
}
