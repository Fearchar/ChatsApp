import React, { useReducer, useEffect } from 'react'
import io from 'socket.io-client'
import axios from 'axios'
import { toast } from 'react-toastify'

import { Form, Field } from './common/Form'
import Auth from '../lib/Auth'
import ThreadPanel from './thread panel/ThreadPanel'
import { port } from '../../config/environment'
import reducer from '../lib/reducer'

const Main = ({ history }) => {
  const [ state, dispatch ] = useReducer(
    reducer,
    { threads: [], user: null }
  )

  function addMessage(threadId, message) {
    dispatch({ type: 'message:new', threadId, message })
  }

  useEffect(() => {
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
        /* !!!
        This error is being handeled by the 2nd useEffect:
          - Is there a more elegent approach?
          - I need the catch block to stop the uncaught promise rejection, but what should I do with it?
        */
        .catch(() => console.log('Warning: Unable to retrieve user threads'))
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
    getThreads()
    return () => socket.disconnect()
  }, [ history ])

  useEffect(() => {
    if (!Auth.isAuthenticated()) {
      history.push('/login')
      toast.error('You are not logged in or your session has expired.')
    }
  })

  //!!! Remove below at appropriate time

  const { threads } = state

  /*!!!
    Render Notes:

  */

  return (
    <main>
      <div className="columns is-variable is-0">
        <div className="column is-4 card">
          <div className="level card">
            <div className="level-left" />
            <div className="level-right top-bar">
              <figure className="level-item image is-48x48 is-round">
                <img className="is-rounded" src="https://www.fillmurray.com/300/200" alt="Placeholder image" />
              </figure>
              <i className="far fa-edit fa-2x"></i>
              <i className="fas fa-chevron-down fa-2x"></i>
            </div>
          </div>
          <div>
            <Form fields={[ new Field('', 'text', 'Search') ]} />
          </div>
          <div className="card scrolls">
            {threads && threads.map(thread => {
              const lastMessage = thread.messages[thread.messages.length - 1]
              return <div
                className="box"
                key={thread._id}
              >
                <p className="has-text-weight-bold">{thread.name}</p>
                <p>
                  {thread.messages[0] ?
                    `${lastMessage.user.name}: ${lastMessage.content.slice(0, 10)}`
                    :
                    '...'
                  }
                </p>
              </div>
            }).reverse()}
          </div>
        </div>
        <div className="column is-8 card">
          <ThreadPanel thread={state.threads[0]} />
        </div>
      </div>
    </main>
  )
}

export default Main
