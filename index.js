const express = require('express')
const mongoose = require('mongoose')
mongoose.plugin(require('mongoose-unique-validator'), {
  message: 'The chosen {PATH} has been used before. Please provide another'
})
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const http = require('http').createServer(app)
const io = require('socket.io')(http, { pingTimeout: 35000 })

const { port, dbURI } = require('./config/environment')
const resStatusEmit = require('./lib/resStatusEmit')
const router = require('./config/routes')
const errorHandler = require('./lib/errorHandler')

mongoose.connect(dbURI, { useNewUrlParser: true,  useUnifiedTopology: true })
app.use(express.static(`${__dirname}/dist`))
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(resStatusEmit(io))
app.use('/api', router)
app.use(errorHandler)

io.on('connection', (socket) => {
  console.log('io:', `socket-${socket.id} has connected.`)
  socket.on('disconnect', () => {
    console.log('io:', `socket-${socket.id} has disconnected.`)
  })
  socket.on('thread:join', (room) => {
    socket.join(room)
    console.log('io:', `socket-${socket.id} has joined room-${room}.`)
  })
  socket.on('thread:leave', (room) => {
    socket.leave(room)
    console.log('io:', `socket-${socket.id} has left room-${room}.`)
  })
})

http.listen(port, () => console.log(`Listening to port ${port}`))
