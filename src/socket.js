import io from 'socket.io-client'

import { port } from '../config/environment'

const socket = io.connect(`http://localhost:${port}`)
socket.on('thread:leave', function leaveThread(thread) {
  socket.emit('thread:leave', thread)
})

export default socket
