import React, { useReducer, useState, useEffect } from 'react'
import io from 'socket.io-client'
import axios from 'axios'
import { toast } from 'react-toastify'

import Auth from '../lib/Auth'
import ThreadPanel from './thread panel/ThreadPanel'
import UserPanel from './user panel/UserPanel'
import { port } from '../../config/environment'
import reducer from '../lib/reducer'

const Main = ({ history }) => {
  const [ state, dispatch ] = useReducer(
    reducer,
    { threads: [], user: null }
  )
  const [ focusThread, setFocusThread ] = useState(null)

  useEffect(function initiateMain() {
    function joinThreads(threads, socket) {
      threads.forEach(thread => socket.emit('thread:join', thread._id))
    }

    function getThreads(socket) {
      axios.get(`/api/users/${Auth.getClientId()}/threads`)
        .then(res => {
          const threads = res.data.threads

          dispatch({ type: 'thread:index', threads })
          setFocusThread(threads[0])
          joinThreads(threads, socket)
        })
        /* !!!
        This error is being handeled by the 2nd useEffect:
          - Is there a more elegent approach?
          - I need the catch block to stop the uncaught promise rejection, but what should I do with it?
        */
        .catch(() => console.log('Warning: Unable to retrieve user threads'))
    }

    function addMessage(threadId, message) {
      dispatch({ type: 'message:new', threadId, message })
    }

    function intiateSocket() {
      const socket = io.connect(`http://localhost:${port}`)

      socket.on('reconnect', getThreads)
      socket.on('thread:leave', function leaveThread(thread) {
        socket.emit('thread:leave', thread)
      })
      socket.on('message:new', addMessage)

      return socket
    }

    const socket = intiateSocket()
    getThreads(socket)

    return () => socket.disconnect()
  }, [ history ])

  useEffect(function ejectUnauthenticated() {
    if (!Auth.isAuthenticated()) {
      history.push('/login')
      toast.error('You are not logged in or your session has expired.')
    }
  })

  //!!! Remove / move below at appropriate time
  const { threads } = state

  return (
    <main>
      <div className="columns is-variable is-0">
        <div className="column is-4 card">
          <UserPanel
            threads={threads}
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
