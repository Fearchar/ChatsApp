import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Switch, Route } from 'react-router-dom'
import 'bulma'
import './scss/style.scss'

// import io from 'socket.io-client'
// import { port } from '../config/environment'
import Login from './components/Login'
import ChatPane from './components/ChatPane'

// const socket = io.connect(`http://localhost:${port}`)

const App = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register"  />
      </Switch>
    </HashRouter>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
