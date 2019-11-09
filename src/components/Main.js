import React, { useReducer, useEffect } from 'react'
import axios from 'axios'

import ChatPane from './ChatPane'
import Auth from '../lib/Auth'
import threadsReducer from '../lib/threadsReducer'
import socket from '../socket'

const Main = ({ history }) => {
  const [ state, dispatch ] = useReducer(
    threadsReducer,
    { threads: [] }
  )

  useEffect(() => {
    function joinThreads(threads) {
      threads.forEach(thread => socket.emit('thread:join', thread._id))
    }

    function getThreads() {
      console.log(Auth.getCurrentUserId())
      axios.get(`/api/users/${Auth.getCurrentUserId()}/threads`)
        .then(res => {
          const threads = res.data.threads
          dispatch({ type: 'thread:index', threads })
          joinThreads(threads)
        })
        // !!! push to an error page?
        .catch(() => history.push('/login'))
    }

    function addMessage(threadId, message) {
      console.log(threadId, message)
      dispatch({ type: 'message:new', threadId, message })
    }

    getThreads()
    socket.on('message:new', addMessage)
    return () => socket.removeListener('message:new', addMessage)
  }, [ history ])

  console.log(state.threads)
  return (
    <div>
      <ChatPane thread={state.threads[0]}/>
    </div>
  )
}

export default Main
