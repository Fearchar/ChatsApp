const port = process.env.PORT || 4000
const env = process.env.NODE_ENV || 'development'
const dbURI = process.env.MONGODB_URI || `mongodb://localhost:27017/ChatsApp-db-${env}`
const secret = process.env.SECRET || '^HEARki?nd££l123$23i2jnimenbp'

module.exports = { port, dbURI, secret }
