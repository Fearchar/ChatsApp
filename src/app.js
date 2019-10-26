import React from 'react'
import ReactDOM from 'react-dom'
import 'bulma'

import ChatPane from './components/ChatPane'

const App = () => {
  return (
    <ChatPane />
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
