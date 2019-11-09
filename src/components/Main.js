import React, { useReducer, useEffect } from 'react'
import io from 'socket.io-client'
import axios from 'axios'

import ChatPane from './ChatPane'
import Auth from '../lib/Auth'
import { port } from '../../config/environment'
import reducer from '../lib/reducer'

const Main = ({ history }) => {
  const [ state, dispatch ] = useReducer(
    reducer,
    { threads: [] }
  )

  useEffect(() => {
    function intiateSocket() {
      const socket = io.connect(`http://localhost:${port}`)
      socket.on('thread:leave', function leaveThread(thread) {
        socket.emit('thread:leave', thread)
      })
      socket.on('message:new', addMessage)
      return socket
    }

    function joinThreads(threads) {
      threads.forEach(thread => socket.emit('thread:join', thread._id))
    }

    function getThreads() {
      axios.get(`/api/users/${Auth.getClientId()}/threads`)
        .then(res => {
          const threads = res.data.threads
          dispatch({ type: 'thread:index', threads })
          joinThreads(threads)
        })
        // !!! push to an error page?
        .catch(() => history.push('/login'))
    }

    function addMessage(threadId, message) {
      dispatch({ type: 'message:new', threadId, message })
    }

    const socket = intiateSocket()
    getThreads()
    return () => socket.disconnect()
  }, [ history ])

  console.log(state.threads)
  return (
    <div>
      <ChatPane thread={state.threads[0]}/>
    </div>
  )
}

export default Main
