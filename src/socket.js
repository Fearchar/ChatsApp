const io = require('socket.io-client')

const socket = io.connect('http://localhost:4000')

socket.on('thread', (thread) => console.log(thread))

module.exports = { socket }
