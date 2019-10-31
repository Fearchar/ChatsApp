import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import 'bulma'

import io from 'socket.io-client'
import { port } from '../config/environment'
import ChatPane from './components/ChatPane'

const socket = io.connect(`http://localhost:${port}`)

const App = () => {
  return (
    <ChatPane socket={socket} />
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
