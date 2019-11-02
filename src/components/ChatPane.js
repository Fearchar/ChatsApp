import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Message from './Message'

const ChatPane = ({ socket }) => {
  const [ thread, setThread ] = useState(null)

  useEffect(() => {
    function addMessage(message) {
      setThread(thread => {
        console.log('called')
        const threadCopy = { ...thread }
        threadCopy.messages.push(message)
        return threadCopy
      })
    }

    function getThread() {
      axios.get('/api/threads/5daf1f1a33a71d3a10b68cc9')
        .then(res => {
          setThread(res.data)
          socket.emit('thread:join', '5daf1f1a33a71d3a10b68cc9')
        })
    }

    getThread()
    socket.on('message:new', addMessage)
    return () => socket.removeListener('message:new', addMessage)

  }, [ socket ])

  console.log('render')
  return (
    <div>
      {thread && thread.messages.map(message =>
        <Message key={message._id} {...message} />
      ).reverse()}
    </div>
  )
}

export default ChatPane
