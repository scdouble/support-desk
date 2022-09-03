const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const { errorHandle } = require('./middleware/errorMiddleware')

connectDB()

const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.send('Hello')
})

app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandle)

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
