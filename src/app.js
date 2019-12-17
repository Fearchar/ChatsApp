import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import Main from './components/Main'
import Login from './components/auth/Login'
import Register from './components/auth/Register'

import './scss/style.scss'

const App = () => {
  return (
    <HashRouter>
      <ToastContainer position="bottom-right" hideProgressBar={true} />
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
