import React, { useReducer, useState, useEffect } from 'react'
import io from 'socket.io-client'
import axios from 'axios'
import { toast } from 'react-toastify'

import Auth from '../lib/Auth'
import ThreadPanel from './thread panel/ThreadPanel'
import UserPanel from './user panel/UserPanel'
import { port } from '../../config/environment'
import userReducer from '../lib/userReducer'

const Main = ({ history }) => {
  const [ user, dispatch ] = useReducer(userReducer, { threads: [] })
  const [ focusThread, setFocusThread ] = useState(null)

  useEffect(function initiateMain() {

    function joinThreads(threads, socket) {
      threads.forEach(thread => socket.emit('thread:join', thread._id))
    }

    function getUser(socket) {
      axios.get(`/api/users/${Auth.getClientId()}/threads`)
        .then(res => {
          const user = res.data
          dispatch({ type: 'user:index', user })
          setFocusThread(user.threads[0])
          joinThreads(user.threads, socket)
        })
        /* !!!
        This error is being handeled by the 2nd useEffect:
          - Is this the right approach?
          - I need the catch block to stop the uncaught promise rejection, but what should I do with it?
        */
        .catch(err => console.log(err))
    }

    function leaveThread(thread) {
      socket.emit('thread:leave', thread)
    }

    function addMessage(threadId, message) {
      dispatch({ type: 'message:new', threadId, message })
    }

    function intiateSocket() {
      const socket = io.connect(`http://localhost:${port}`)

      socket.on('connect',() => getUser(socket))
      socket.on('thread:leave', leaveThread)
      socket.on('message:new', addMessage)

      return socket
    }

    const socket = intiateSocket()

    return () => socket.disconnect()
  }, [ history ])

  useEffect(function ejectUnauthenticated() {
    if (!Auth.isAuthenticated()) {
      history.push('/login')
      toast.error('You are not logged in or your session has expired.')
    }
  })

  return (
    <main>
      <div className="columns is-variable is-0">
        <div className="column is-4 card">
          <UserPanel
            {...user}
            focusThread={focusThread}
            setFocusThread={setFocusThread}
          />
        </div>
        <div className="column is-8 card">
          <ThreadPanel thread={focusThread} />
        </div>
      </div>
    </main>
  )
}

export default Main
