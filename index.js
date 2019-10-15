const express = require('express')
const mongoose = require('mongoose')

const { port, dbURI } = require('./config/environment')
const bodyParser = require('body-parser')
// !!! const router = require('./config/routes')
// !!! const errorHandler = require('./lib/errorHandler')

const app = express()
mongoose.connect(dbURI, { useNewUrlParser: true })
app.use(express.static(`${__dirname}/dist`))
app.use(bodyParser.json())
//!!! app.use(router)

app.listen(port, () => console.log('Listening to port 4000'))
