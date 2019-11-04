import React, { useReducer, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import axios from 'axios'
import 'bulma'
import './scss/style.scss'

import io from 'socket.io-client'
import { port } from '../config/environment'
import threadsReducer from './lib/threadsReducer'
import Auth from './components/Auth'

const socket = io.connect(`http://localhost:${port}`)

const App = () => {
  const [ threadsState, threadsDispatch ] = useReducer(
    threadsReducer,
    { threads: [] }
  )

  useEffect(() => {
    function addMessage(threadId, message) {
      threadsDispatch({ type: 'message:new', threadId, message })
    }

    function getThread() {
      axios.get('/api/threads/5dc043a4a1a3497d364852b5')
        .then(res => {
          const thread = res.data
          threadsDispatch({ type: 'thread:new', thread })
          socket.emit('thread:join', '5dc043a4a1a3497d364852b5')
        })
    }

    socket.on('message:new', addMessage)
    getThread()
    return () => socket.removeListener('message:new', addMessage)
  }, [])

  console.log(threadsState)
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
        <Redirect path="/" to={'/login'}/>
      </Switch>
    </HashRouter>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
