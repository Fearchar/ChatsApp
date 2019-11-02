import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Switch, Route } from 'react-router-dom'
import 'bulma'
import './scss/style.scss'

// import io from 'socket.io-client'
// import { port } from '../config/environment'
import Auth from './components/Auth'

// const socket = io.connect(`http://localhost:${port}`)

const App = () => {
  return (
    <HashRouter>
      <Switch>
        <Route
          path="/login"
          component={({ history }) => <Auth page="login" history={history}/>}
        />
        <Route
          path="/register"
          component={({ history }) => <Auth page="register" history={history}/>}
        />
      </Switch>
    </HashRouter>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
