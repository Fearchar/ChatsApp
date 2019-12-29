import React, { useReducer, useCallback, useEffect } from 'react'
import io from 'socket.io-client'
import axios from 'axios'
import { toast } from 'react-toastify'

import Auth from '../lib/Auth'
import ThreadPanel from './thread panel/ThreadPanel'
import UserPanel from './user panel/UserPanel'
import { port } from '../../config/environment'
import userReducer from '../lib/userReducer'

const Main = ({ history }) => {
  const [ user, amendUser ] = useReducer(userReducer, { threads: [] })

  const ejectUser = useCallback(() => {
    history.push('/login')
    toast.error('You are not logged in or your session has expired.')
  }, [ history ])

  useEffect(function initiateMain() {

    function joinThreads(threads, socket) {
      threads.forEach(thread => socket.emit('thread:join', thread._id))
    }

    function getUser(socket) {
      axios.get('/api/userThreads', Auth.header)
        .then(res => {
          const user = res.data
          amendUser({ type: 'user:index', user })
          joinThreads(user.threads, socket)
        })
        /* !!!
        This error is being handeled by the 2nd useEffect:
          - Is this the right approach?
          - I need the catch block to stop the uncaught promise rejection, but what should I do with it?
        */
        .catch(() => ejectUser())
    }
    //!!! Not in use yet
    // function leaveThread(thread) {
    //   socket.emit('thread:leave', thread)
    // }

    function addThread(thread, socket) {
      joinThreads([ thread ], socket)
      amendUser({ type: 'thread:new', thread })
    }

    function addMessage(threadId, message) {
      amendUser({ type: 'message:new', threadId, message })
    }

    function intiateSocket() {
      const socket = io.connect(`http://localhost:${port}`)

      socket.on('connect',() => getUser(socket))
      //!!! Not in use yet
      // socket.on('thread:leave', leaveThread)
      socket.on('thread:new', thread => addThread(thread, socket))
      socket.on('message:new', addMessage)

      return socket
    }

    const socket = intiateSocket()

    return () => socket.disconnect()
  }, [ ejectUser ])

  useEffect(function ejectUnauthenticated() {
    if (!Auth.isAuthenticated()) {
      ejectUser()
    }
  })

  return (
    <main>
      <div className="columns is-variable is-0">
        <div className="column is-4 card">
          {/* !!!
            Could history prop here be managed with useContext as its final destination is UserTopBar?
          */}
          <UserPanel
            {...user}
            history={history}
            amendUser={amendUser}
          />
        </div>
        <div className="column is-8 card">
          <ThreadPanel thread={user.focusThread} />
        </div>
      </div>
    </main>
  )
}

export default Main
