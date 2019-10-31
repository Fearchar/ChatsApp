import io from 'socket.io-client'
import { port } from '../config/environment'

const socket = io.connect(`http://localhost:${port}`)

export default socket
