import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import 'bulma'

import ChatPane from './components/ChatPane'
import socket from './socket'

const App = () => {
  return (
    <div>
      <ChatPane socket={socket}/>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
