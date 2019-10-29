import React from 'react'
import ReactDOM from 'react-dom'
import 'bulma'

import ChatPane from './components/ChatPane'
import socket from './socket'

const App = () => {

  return (
    <ChatPane />
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
