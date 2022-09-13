const expressAsyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Ticket = require('../models/ticketModel')
const User = require('../models/userModels')

// @desc Get user tickets
// @route GET  /api/tickets
// @access Private
const getTickets = expressAsyncHandler(async (req, res) => {
  // get user using the id in the jwt

  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const tickets = await Ticket.find({ user: req.user.id })
  res.status(200).json({ message: 'getTickets' })
})

// @desc Get tickets
// @route GET  /api/tickets/:id
// @access Private
const getTicket = expressAsyncHandler(async (req, res) => {
  // get user using the id in the jwt
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.findById(req.params.id)

  if (!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  res.status(200).json(ticket)
})

// @desc Delete tickets
// @route DELETE  /api/tickets/:id
// @access Private
const deleteTicket = expressAsyncHandler(async (req, res) => {
  // get user using the id in the jwt

  const user = await User.findById(req.user.id)
  const ticket = await Ticket.findById(req.params.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  await Ticket.remove()
  res.status(200).json({ success: true })
})

// @desc update tickets
// @route PUT  /api/tickets/:id
// @access Private
const updateTicket = expressAsyncHandler(async (req, res) => {
  // get user using the id in the jwt

  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.findById(req.params.id)

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.status(200).json(updatedTicket)
})

// @desc Create a new ticket
// @route POST /api/tickets
// @access Private
const createTicket = expressAsyncHandler(async (req, res) => {
  const { product, description } = req.body
  if (!product || !description) {
    res.status(400)
    throw new Error('Please add a product and description')
  }

  // get user using the id in the jwt

  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: 'new',
  })

  res.status(200).json(ticket)
})

module.exports = {
  getTickets,
  getTicket,
  updateTicket,
  deleteTicket,
  createTicket,
}
