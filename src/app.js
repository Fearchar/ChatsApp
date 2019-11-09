import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import 'bulma'
import './scss/style.scss'

import Main from './components/Main'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'


const App = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/main" component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Redirect path="/" to={'/login'} />
      </Switch>
    </HashRouter>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
