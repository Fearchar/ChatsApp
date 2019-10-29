const express = require('express')
const mongoose = require('mongoose')
mongoose.plugin(require('mongoose-unique-validator'), {
  message: 'The chosen {PATH} is not unique. Please provide another'
})
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const http = require('http').createServer(app)
app.io = require('socket.io')(http)
const { port, dbURI } = require('./config/environment')
const router = require('./config/routes')
const errorHandler = require('./lib/errorHandler')


mongoose.connect(dbURI, { useNewUrlParser: true })
app.use(express.static(`${__dirname}/dist`))
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(router)
app.use(errorHandler)

app.io.on('connection', () => {
  console.log('io:', 'A user is connected!')
})

http.listen(port, () => console.log(`Listening to port ${port}`))
