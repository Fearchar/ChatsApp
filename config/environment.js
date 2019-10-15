const port = process.env.PORT || 4000
const env = process.env.NODE_ENV || 'development'
const dbURI = process.env.MONGODB_URI || `mongodb://localhost:27017/ChatsApp-db-${env}`

module.exports = { port, dbURI }
