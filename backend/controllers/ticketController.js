const expressAsyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Ticket = require('../models/ticketModel')

// @desc Get user tickets
// @route GET  /api/tickets
// @access Private
const getTickets = expressAsyncHandler(async (req, res) => {
res.status(200).json({message:'getTickets'})

})

// @desc Create a new ticket
// @route POST /api/tickets
// @access Private
const createTicket = expressAsyncHandler(async (req, res) => {
  res.status(200).json({message:'getTickets'})

})



module.exports = {
  getTickets,  createTicket
}
